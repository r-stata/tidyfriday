#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_photo_json.py — 由照片文件夹自动生成照片墙索引 photo.json

用法:
    python3 generate_photo_json.py                     # 默认扫描 ./static/photo -> ./photo.json
    python3 generate_photo_json.py static/photo -o photo.json
    python3 generate_photo_json.py --thumbs            # 额外生成缩略图，墙页加载更快
    python3 generate_photo_json.py --lqip              # 内嵌 24px 模糊占位图（体积会变大）
    python3 generate_photo_json.py --incremental       # 复用旧 photo.json 中未变动照片的元数据
    python3 generate_photo_json.py --serve 8000        # 生成后启动本地预览服务 http://127.0.0.1:8000

提取的元数据:
    文件名 / 尺寸(按 EXIF 方向校正) / 宽高比 / 横竖屏
    拍摄时间(优先 EXIF -> 文件名中的日期 -> 文件修改时间)
    相机型号(EXIF) / GPS(需 --gps，默认关闭以免泄露位置)
    主色调(用作图片加载前的占位底色) / 文件大小 / 修改时间
    标题(文件名里带中文地名等描述时自动提取)

依赖: Pillow(可选，但强烈建议)。没有 Pillow 时会退化为“只解析文件名 + 文件时间”，
      尺寸/主色/EXIF 将缺失，页面仍能正常工作。
"""

from __future__ import annotations

import argparse
import base64
import io
import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

try:
    from PIL import Image, ImageOps
    from PIL.ExifTags import TAGS

    HAS_PIL = True
except Exception:  # pragma: no cover
    HAS_PIL = False

VERSION = 2
IMAGE_EXT = {".jpg", ".jpeg", ".jpe", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff", ".heic", ".avif"}
SKIP_NAMES = {".ds_store", "thumbs.db", "desktop.ini"}
SKIP_DIRS = {"_thumbs", "thumbs", ".cache"}

# ---------------------------------------------------------------- 文件名日期解析

RE_UNDERSCORE = re.compile(
    r"(?<!\d)((?:19|20)\d{2})[._-](\d{1,2})[._-](\d{1,2})"
    r"(?:[._\- ](\d{1,2})[._-](\d{1,2})(?:[._\- ](\d{1,2}))?)?"
)
RE_COMPACT = re.compile(r"(?<!\d)((?:19|20)\d{2})(\d{2})(\d{2})(?!\d)")
RE_CN = re.compile(r"((?:19|20)\d{2})\s*年\s*(\d{1,2})\s*月(?:\s*(\d{1,2})\s*日)?")
RE_DASH = re.compile(r"(?<!\d)((?:19|20)\d{2})[-/](\d{1,2})[-/](\d{1,2})")


def _mk(y, m, d, hh=None, mm=None, ss=None):
    try:
        y, m, d = int(y), int(m), int(d)
        hh = int(hh) if hh not in (None, "") else 0
        mm = int(mm) if mm not in (None, "") else 0
        ss = int(ss) if ss not in (None, "") else 0
        if not (1900 <= y <= 2100 and 1 <= m <= 12 and 1 <= d <= 31):
            return None
        if hh > 23 or mm > 59 or ss > 59:
            hh = mm = ss = 0
        return datetime(y, m, d, hh, mm, ss)
    except Exception:
        return None


def date_from_filename(name: str):
    """从文件名里猜拍摄时间，返回 (datetime|None, 是否精确到时刻)"""
    stem = os.path.splitext(name)[0]
    m = RE_UNDERSCORE.search(stem)
    if m:
        dt = _mk(m.group(1), m.group(2), m.group(3), m.group(4), m.group(5), m.group(6))
        if dt:
            return dt, m.group(4) is not None
    m = RE_DASH.search(stem)
    if m:
        dt = _mk(m.group(1), m.group(2), m.group(3))
        if dt:
            return dt, False
    m = RE_CN.search(stem)
    if m:
        dt = _mk(m.group(1), m.group(2), m.group(3) or 1)
        if dt:
            return dt, False
    m = RE_COMPACT.search(stem)
    if m:
        dt = _mk(m.group(1), m.group(2), m.group(3))
        if dt:
            return dt, False
    return None, False


def title_from_filename(name: str) -> str:
    """把文件名整理成人能读的标题；纯日期型文件名返回空字符串"""
    stem = os.path.splitext(name)[0].strip()
    if not stem:
        return ""
    has_cjk = bool(re.search(r"[\u4e00-\u9fff]", stem))
    if not has_cjk:
        return ""
    # 去掉结尾的日期尾巴，例如「佛山南风古灶2020年8月1日」->「佛山南风古灶」
    cleaned = RE_CN.sub("", stem)
    cleaned = RE_UNDERSCORE.sub("", cleaned)
    cleaned = re.sub(r"[_\-]+", " ", cleaned).strip()
    cleaned = re.sub(r"\s{2,}", " ", cleaned)
    return cleaned or stem


def slugify(name: str) -> str:
    stem = os.path.splitext(name)[0]
    s = re.sub(r"[^\w\u4e00-\u9fff]+", "-", stem).strip("-").lower()
    return s or "photo"


# ---------------------------------------------------------------- EXIF

EXIF_DT_KEYS = ("DateTimeOriginal", "DateTimeDigitized", "DateTime")


def read_exif(img):
    """返回 {标签名: 值}，同时展开 Exif 子 IFD"""
    data = {}
    try:
        exif = img.getexif()
    except Exception:
        return data
    if not exif:
        return data
    try:
        for tag, val in exif.items():
            data[TAGS.get(tag, tag)] = val
    except Exception:
        pass
    try:
        for tag, val in exif.get_ifd(0x8769).items():  # ExifIFD
            data[TAGS.get(tag, tag)] = val
    except Exception:
        pass
    return data


def parse_exif_datetime(value):
    if not isinstance(value, str):
        return None
    v = value.strip().replace("\x00", "")
    for fmt in ("%Y:%m:%d %H:%M:%S", "%Y:%m:%d %H:%M", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M"):
        try:
            return datetime.strptime(v, fmt)
        except Exception:
            continue
    return None


def gps_from_exif(img):
    """返回 [lat, lon] 或 None"""
    try:
        exif = img.getexif()
        if not exif:
            return None
        gps = exif.get_ifd(0x8825)
        if not gps:
            return None

        def rat(x):
            try:
                if isinstance(x, tuple):
                    return float(x[0]) / float(x[1]) if x[1] else float(x[0])
                return float(x)
            except Exception:
                return 0.0

        def dms(val, ref, neg):
            if not val or len(val) < 3:
                return None
            d = rat(val[0]) + rat(val[1]) / 60.0 + rat(val[2]) / 3600.0
            return -d if ref in neg else d

        lat = dms(gps.get(2), gps.get(1), ("S", "s"))
        lon = dms(gps.get(4), gps.get(3), ("W", "w"))
        if lat is None or lon is None:
            return None
        return [round(lat, 6), round(lon, 6)]
    except Exception:
        return None


# ---------------------------------------------------------------- 单张照片处理


def dominant_color(img):
    """取图片平均色（缩到 1x1），用于占位底色"""
    try:
        small = img.convert("RGB")
        small.thumbnail((32, 32))
        px = small.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
        return "#%02x%02x%02x" % px[:3]
    except Exception:
        return None


def lqip_data_uri(img, width=24):
    """生成极小尺寸 JPEG 的 data URI，用于加载前的模糊占位"""
    try:
        w, h = img.size
        if w <= 0 or h <= 0:
            return None
        nh = max(1, int(round(h * width / float(w))))
        small = img.convert("RGB").resize((width, nh), Image.LANCZOS)
        buf = io.BytesIO()
        small.save(buf, format="JPEG", quality=40, optimize=True)
        return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("ascii")
    except Exception:
        return None


def make_thumb(path: str, out_path: str, width: int, quality: int):
    try:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        if os.path.exists(out_path) and os.path.getmtime(out_path) >= os.path.getmtime(path):
            return os.path.basename(out_path)
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im)
            im.thumbnail((width, width * 4), Image.LANCZOS)
            if im.mode not in ("RGB", "L"):
                im = im.convert("RGB")
            im.save(out_path, format="JPEG", quality=quality, optimize=True, progressive=True)
        return os.path.basename(out_path)
    except Exception:
        return None


def process_one(args):
    path, opts = args
    name = os.path.basename(path)
    try:
        st = os.stat(path)
    except OSError:  # 扫描之后文件被移动/删除，跳过
        return None
    item = {
        "id": slugify(name),
        "file": name,
        "imgSrc": name,  # 兼容旧版 photo.json
        "src": opts["url_prefix"] + name.replace(" ", "%20"),
        "thumb": None,
        "title": title_from_filename(name),
        "width": None,
        "height": None,
        "ratio": None,
        "orientation": None,
        "bytes": st.st_size,
        "modified": datetime.fromtimestamp(st.st_mtime).strftime("%Y-%m-%d %H:%M:%S"),
        "date": None,
        "time": None,
        "sort": "",
        "dateSource": None,
        "approx": False,
        "year": None,
        "month": None,
        "monthKey": None,
        "camera": None,
        "color": None,
        "lqip": None,
        "gps": None,
    }

    exif_dt = None
    camera = None
    orientation = None

    if HAS_PIL:
        try:
            with Image.open(path) as im:
                w, h = im.size
                exif = read_exif(im)
                orientation = exif.get("Orientation") or 1
                for key in EXIF_DT_KEYS:
                    dt = parse_exif_datetime(exif.get(key))
                    if dt:
                        exif_dt = dt
                        break
                make = (exif.get("Make") or "").strip()
                model = (exif.get("Model") or "").strip()
                if make and model and model.lower().startswith(make.lower()):
                    camera = model
                elif model:
                    camera = model
                elif make:
                    camera = make
                if opts["gps"]:
                    item["gps"] = gps_from_exif(im)
                if orientation in (5, 6, 7, 8):
                    w, h = h, w
                item["width"], item["height"] = int(w), int(h)
                item["ratio"] = round(w / float(h), 4) if h else None
                item["orientation"] = "square" if abs(w - h) <= 2 else ("landscape" if w > h else "portrait")
                if opts["color"]:
                    item["color"] = dominant_color(im)
                if opts["lqip"]:
                    item["lqip"] = lqip_data_uri(im, opts["lqip_width"])
        except Exception as exc:  # 单张失败不影响整体
            sys.stderr.write("  ! 读取失败 %s (%s)\n" % (name, exc))

    fn_dt, fn_has_time = date_from_filename(name)
    if exif_dt:
        dt, source = exif_dt, "exif"
    elif fn_dt:
        dt, source = fn_dt, "filename"
    elif opts["mtime"]:
        dt, source = datetime.fromtimestamp(st.st_mtime), "mtime"
    else:
        dt, source = None, "unknown"

    item["approx"] = source in ("mtime", "unknown")
    item["dateSource"] = source
    if dt:
        item["date"] = dt.strftime("%Y-%m-%d")
        item["time"] = dt.strftime("%H:%M") if (source == "exif" or fn_has_time) else None
        item["sort"] = dt.strftime("%Y-%m-%d %H:%M:%S")
        item["year"] = dt.year
        item["month"] = dt.month
        item["monthKey"] = "%04d-%02d" % (dt.year, dt.month)
    item["camera"] = camera

    if opts["thumbs"]:
        out_dir = os.path.join(opts["photo_dir"], opts["thumb_dir"])
        out_name = slugify(name) + ".jpg"
        made = make_thumb(path, os.path.join(out_dir, out_name), opts["thumb_width"], opts["thumb_quality"])
        if made:
            item["thumb"] = "%s%s/%s" % (opts["url_prefix"], opts["thumb_dir"], made)
    return item


# ---------------------------------------------------------------- 主流程


def list_images(photo_dir: str):
    out = []
    for name in sorted(os.listdir(photo_dir)):
        if name.lower() in SKIP_NAMES or name.startswith("."):
            continue
        path = os.path.join(photo_dir, name)
        if not os.path.isfile(path):
            continue
        if os.path.splitext(name)[1].lower() not in IMAGE_EXT:
            continue
        out.append(path)
    return out


def load_previous(out_path: str):
    """读取旧 photo.json，用于增量更新"""
    if not os.path.exists(out_path):
        return {}
    try:
        with open(out_path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        photos = data.get("photos") if isinstance(data, dict) else data
        cache = {}
        for p in photos or []:
            if isinstance(p, dict) and p.get("file"):
                cache[p["file"]] = p
        return cache
    except Exception as exc:
        sys.stderr.write("  ! 旧 photo.json 无法解析，将全量重算 (%s)\n" % exc)
        return {}


def prune_thumbs(photo_dir, thumb_dir, keep, verbose=False):
    """删除源照片已不存在的孤儿缩略图"""
    td = os.path.join(photo_dir, thumb_dir)
    if not os.path.isdir(td):
        return 0
    removed = 0
    for fn in os.listdir(td):
        if fn.lower() in SKIP_NAMES or fn.startswith("."):
            continue
        if fn in keep:
            continue
        try:
            os.remove(os.path.join(td, fn))
            removed += 1
        except OSError:
            pass
    if removed and verbose:
        print("清理孤儿缩略图: %d 个" % removed)
    return removed


def build_meta(photos, opts):
    years = {}
    for p in photos:
        y = p.get("year")
        if y:
            years[y] = years.get(y, 0) + 1
    year_list = [{"year": y, "count": years[y]} for y in sorted(years)]
    dated = [p["date"] for p in photos if p.get("date")]
    return {
        "title": opts["title"],
        "version": VERSION,
        "generator": "generate_photo_json.py",
        "generatedAt": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "urlPrefix": opts["url_prefix"],
        "photoDir": os.path.basename(os.path.normpath(opts["photo_dir"])),
        "count": len(photos),
        "thumbDir": opts["thumb_dir"] if opts["thumbs"] else None,
        "dateRange": [min(dated), max(dated)] if dated else None,
        "years": year_list,
        "withThumbs": sum(1 for p in photos if p.get("thumb")),
        "withExif": sum(1 for p in photos if p.get("dateSource") == "exif"),
        "withApproxDate": sum(1 for p in photos if p.get("approx")),
        "undated": sum(1 for p in photos if not p.get("date")),
    }


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser(
        description="扫描照片文件夹，生成照片墙索引 photo.json",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="示例: python3 generate_photo_json.py --thumbs --incremental --serve 8000",
    )
    ap.add_argument("photo_dir", nargs="?", default=os.path.join(here, "static", "photo"),
                    help="照片文件夹（默认 ./static/photo）")
    ap.add_argument("-o", "--output", default=os.path.join(here, "photo.json"), help="输出的 json 路径")
    ap.add_argument("--url-prefix", default=None, help="图片 URL 前缀（默认相对 photo.json 所在目录推算）")
    ap.add_argument("--title", default="水蛋的家 · 照片墙", help="写入 meta.title")
    ap.add_argument("--thumbs", action="store_true", help="生成缩略图（会写入 <照片目录>/_thumbs/）")
    ap.add_argument("--thumb-dir", default="_thumbs", help="缩略图文件夹名，默认 _thumbs")
    ap.add_argument("--thumb-width", type=int, default=480, help="缩略图宽度，默认 480")
    ap.add_argument("--thumb-quality", type=int, default=82, help="缩略图质量，默认 82")
    ap.add_argument("--lqip", action="store_true", help="内嵌 24px 模糊占位图（json 会变大）")
    ap.add_argument("--lqip-width", type=int, default=24, help="占位图宽度，默认 24")
    ap.add_argument("--gps", action="store_true", help="提取 GPS 坐标（默认关闭，避免泄露位置）")
    ap.add_argument("--no-color", action="store_true", help="不计算主色调")
    ap.add_argument("--mtime", action="store_true",
                    help="找不到拍摄时间时回退到文件修改时间（默认不回退，这类照片归入「时间未知」，"
                         "因为导出/拷贝时间往往不是拍摄时间）")
    ap.add_argument("--incremental", action="store_true", help="增量更新：复用未变动照片的旧元数据")
    ap.add_argument("--jobs", type=int, default=os.cpu_count() or 4, help="并发线程数")
    ap.add_argument("--compact", action="store_true", help="输出压缩后的 json（体积更小）")
    ap.add_argument("--serve", type=int, nargs="?", const=8000, default=None,
                    help="生成后启动本地预览服务，如 --serve 8000")
    ap.add_argument("-q", "--quiet", action="store_true", help="减少输出")
    args = ap.parse_args()

    photo_dir = os.path.abspath(args.photo_dir)
    out_path = os.path.abspath(args.output)
    if not os.path.isdir(photo_dir):
        sys.stderr.write("照片文件夹不存在: %s\n" % photo_dir)
        return 2

    if args.url_prefix:
        url_prefix = args.url_prefix if args.url_prefix.endswith(("/", "%2F")) else args.url_prefix + "/"
    else:
        rel = os.path.relpath(photo_dir, os.path.dirname(out_path))
        url_prefix = rel.replace(os.sep, "/").rstrip("/") + "/"
        if url_prefix == "/":
            url_prefix = ""

    opts = {
        "url_prefix": url_prefix,
        "photo_dir": photo_dir,
        "thumbs": args.thumbs,
        "thumb_dir": args.thumb_dir.strip("/") or "_thumbs",
        "thumb_width": args.thumb_width,
        "thumb_quality": args.thumb_quality,
        "lqip": args.lqip and HAS_PIL,
        "lqip_width": args.lqip_width,
        "color": (not args.no_color) and HAS_PIL,
        "gps": args.gps and HAS_PIL,
        "mtime": bool(args.mtime),
        "title": args.title,
    }

    files = list_images(photo_dir)
    files = [f for f in files if os.path.basename(os.path.dirname(f)) not in SKIP_DIRS]
    if not files:
        sys.stderr.write("没有找到图片: %s\n" % photo_dir)
        return 1

    verbose = not args.quiet
    if verbose:
        print("照片目录 : %s" % photo_dir)
        print("输出文件 : %s" % out_path)
        print("URL 前缀 : %s" % url_prefix)
        print("图片数量 : %d" % len(files))
        print("Pillow   : %s" % ("可用" if HAS_PIL else "未安装（将缺少尺寸/主色/EXIF）"))

    prev = load_previous(out_path) if args.incremental else {}
    todo, reused = [], []
    for path in files:
        name = os.path.basename(path)
        old = prev.get(name)
        st = os.stat(path)
        if old and old.get("bytes") == st.st_size and old.get("modified") == datetime.fromtimestamp(st.st_mtime).strftime("%Y-%m-%d %H:%M:%S"):
            p = dict(old)
            p["src"] = url_prefix + name.replace(" ", "%20")
            if opts["thumbs"] and not p.get("thumb"):
                todo.append(path)
            else:
                reused.append(p)
            continue
        todo.append(path)

    if verbose:
        print("待处理   : %d 张（复用 %d 张）" % (len(todo), len(reused)))

    t0 = time.time()
    done = []
    if todo:
        workers = max(1, min(args.jobs, len(todo)))
        with ThreadPoolExecutor(max_workers=workers) as pool:
            for i, item in enumerate(pool.map(process_one, [(p, opts) for p in todo]), 1):
                if item:
                    done.append(item)
                if verbose and i % 200 == 0:
                    print("  ... %d/%d" % (i, len(todo)))
    photos = reused + done
    if opts["thumbs"]:
        keep = set(slugify(p["file"]) + ".jpg" for p in photos)
        prune_thumbs(photo_dir, opts["thumb_dir"], keep, verbose)
    photos.sort(key=lambda p: (p.get("sort") or "9999", p.get("file") or ""))

    # 保证 id 唯一
    seen = {}
    for p in photos:
        base = p["id"]
        if base in seen:
            seen[base] += 1
            p["id"] = "%s-%d" % (base, seen[base])
        else:
            seen[base] = 0

    meta = build_meta(photos, opts)
    payload = {"meta": meta, "photos": photos}

    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as fh:
        if args.compact:
            json.dump(payload, fh, ensure_ascii=False, separators=(",", ":"))
        else:
            json.dump(payload, fh, ensure_ascii=False, indent=1)
        fh.write("\n")

    if verbose:
        size_kb = os.path.getsize(out_path) / 1024.0
        print("完成     : %d 张照片，用时 %.1fs，photo.json %.1f KB" % (len(photos), time.time() - t0, size_kb))
        if meta["dateRange"]:
            print("时间跨度 : %s ~ %s" % (meta["dateRange"][0], meta["dateRange"][1]))
        print("年份分布 : " + ", ".join("%d(%d)" % (y["year"], y["count"]) for y in meta["years"]))

    if args.serve:
        import functools
        import http.server
        import socketserver

        root = os.path.dirname(out_path)
        handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)

        class QuietHandler(http.server.SimpleHTTPRequestHandler):
            def log_message(self, fmt, *a):
                pass

        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.ThreadingTCPServer(("127.0.0.1", args.serve),
                                             functools.partial(QuietHandler, directory=root)) as httpd:
            url = "http://127.0.0.1:%d/" % args.serve
            print("预览服务 : %s  （Ctrl+C 结束）" % url)
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n已停止")
    return 0


if __name__ == "__main__":
    sys.exit(main())
