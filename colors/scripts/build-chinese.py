#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 https://chinese-colors.heyfe.org/ 抓取中国传统色，按色相分组为中国传统色调色板，

生成 assets/data/chinese.js（window.CHINESE_DATA），供配色网站使用。

用法：
    python3 scripts/build-chinese.py            # 重新抓取并生成
    python3 scripts/build-chinese.py --use-cache # 使用本地 /tmp/cc_app.js 缓存

依赖：requests（仅抓取时需要；--use-cache 不需要）
"""
import io
import json
import re
import sys
import colorsys
import urllib.request

ROOT = sys.path[0] + "/.."
OUT = ROOT + "/assets/data/chinese.js"
BUNDLE_URL = "https://chinese-colors.heyfe.org/assets/index.a2b43b4c.js"

# 按色相把传统色归为若干“家族”，每个家族生成一个调色板
FAMILIES = [
    ("中国红", "zhongguohong", range(345, 360 + 1)),
    ("嫣红粉", "yanhongfen", range(320, 345)),
    ("橘橙棕", "juchengzong", range(15, 35)),
    ("鹅黄", "eyu", range(35, 65)),
    ("青绿", "qinglü", range(65, 175)),
    ("碧青", "biqing", range(175, 200)),
    ("群青蓝", "qunqinglan", range(200, 260)),
    ("黛紫", "daizi", range(260, 320)),
]


def fetch_bundle():
    try:
        with urllib.request.urlopen(BUNDLE_URL, timeout=20) as r:
            return r.read().decode("utf-8")
    except Exception as e:  # pragma: no cover
        print("抓取失败，回退到 /tmp/cc_app.js：", e, file=sys.stderr)
        return open("/tmp/cc_app.js", encoding="utf-8").read()


def parse_colors(src):
    pat = re.compile(
        r'\{RGB:\[(\d+),(\d+),(\d+)\],hex:"(#?[0-9a-fA-F]{6})",'
        r'name:"((?:\\u[0-9a-fA-F]{4}|[^"\\])*)",pinyin:"([^"]*)"\}'
    )
    out = []
    seen = set()
    for m in pat.finditer(src):
        r, g, b = int(m.group(1)), int(m.group(2)), int(m.group(3))
        hexv = m.group(4).lower()
        if not hexv.startswith("#"):
            hexv = "#" + hexv
        if hexv in seen:
            continue
        seen.add(hexv)
        name = m.group(5).encode().decode("unicode_escape")
        out.append({"name": name, "hex": hexv, "pinyin": m.group(6), "rgb": [r, g, b]})
    return out


def hsl_of(hexv):
    h = hexv.lstrip("#")
    r, g, b = int(h[0:2], 16) / 255, int(h[2:4], 16) / 255, int(h[4:6], 16) / 255
    hh, ll, ss = colorsys.rgb_to_hls(r, g, b)
    return hh * 360, ll, ss


# ---- 感知色彩空间 & 渐变排序 ------------------------------------------------
def _srgb_to_lab(hexv):
    """sRGB(#rrggbb) -> CIE Lab (D65)。用于感知均匀的排序。"""
    h = hexv.lstrip("#")
    r = int(h[0:2], 16) / 255.0
    g = int(h[2:4], 16) / 255.0
    b = int(h[4:6], 16) / 255.0

    def lin(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = lin(r), lin(g), lin(b)
    x = r * 0.4124 + g * 0.3576 + b * 0.1805
    y = r * 0.2126 + g * 0.7152 + b * 0.0722
    z = r * 0.0193 + g * 0.1192 + b * 0.9505
    x, y, z = x / 0.95047, y / 1.0, z / 1.08883

    def f(t):
        return t ** (1.0 / 3) if t > 0.008856 else (7.787 * t + 16.0 / 116)

    fx, fy, fz = f(x), f(y), f(z)
    L = 116 * fy - 16
    a = 500 * (fx - fy)
    bb = 200 * (fy - fz)
    return (L, a, bb)


def _pca_axis(labs):
    """对一组 Lab 向量做 PCA，返回方差最大的主成分方向（单位向量）。"""
    n = len(labs)
    if n < 2:
        return (1.0, 0.0, 0.0)
    mean = [sum(p[i] for p in labs) / n for i in range(3)]
    X = [[p[i] - mean[i] for i in range(3)] for p in labs]
    # 散度矩阵 S = X^T X
    S = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
    for p in X:
        for i in range(3):
            for j in range(3):
                S[i][j] += p[i] * p[j]
    # 幂迭代求最大特征值对应的特征向量
    v = [1.0, 0.0, 0.0]
    for _ in range(100):
        nv = [sum(S[i][j] * v[j] for j in range(3)) for i in range(3)]
        norm = sum(x * x for x in nv) ** 0.5 or 1.0
        v = [x / norm for x in nv]
    return tuple(v)


def gradient_sort(items):
    """把同族颜色尽量按“渐变色”顺序排列：投影到 Lab 主成分轴后升序。

    纯 Python 实现（无需 numpy），对离散/连续家族都适用。
    """
    if len(items) < 2:
        return items
    labs = [_srgb_to_lab(c["hex"]) for c in items]
    axis = _pca_axis(labs)
    mean = [sum(p[i] for p in labs) / len(labs) for i in range(3)]
    X = [[p[i] - mean[i] for i in range(3)] for p in labs]
    scored = sorted(
        zip(items, X),
        key=lambda t: sum(t[1][i] * axis[i] for i in range(3)),
    )
    return [c for c, _ in scored]


def family_of(c):
    H, L, S = hsl_of(c["hex"])
    if S < 0.12 or L < 0.08 or L > 0.93:
        return ("月白灰" if L >= 0.5 else "墨黑灰", "yuebaihui" if L >= 0.5 else "moheihui")
    for label, key, rng in FAMILIES:
        if int(H) in rng:
            return (label, key)
    return ("嫣红粉", "yanhongfen")  # 兜底


def even_sample(items, n):
    if n >= len(items):
        return list(items)
    step = (len(items) - 1) / (n - 1)
    return [items[int(round(i * step))] for i in range(n)]


def main():
    use_cache = "--use-cache" in sys.argv
    if use_cache:
        src = open("/tmp/cc_app.js", encoding="utf-8").read()
    else:
        src = fetch_bundle()
        open("/tmp/cc_app.js", "w", encoding="utf-8").write(src)

    colors = parse_colors(src)
    print("解析到 %d 个传统色" % len(colors))

    groups = {}
    for c in colors:
        label, key = family_of(c)
        groups.setdefault((label, key), []).append(c)

    # 按感知主成分轴排序，使同族内颜色尽可能排成平滑渐变（暗→亮/冷→暖）
    for k in groups:
        groups[k] = gradient_sort(groups[k])

    # 配色顺序（暖→冷→中性）
    order = [
        "中国红", "嫣红粉", "橘橙棕", "鹅黄", "青绿",
        "碧青", "群青蓝", "黛紫", "墨黑灰", "月白灰",
    ]
    key_of = {k: v for (k, v) in [(l, kk) for l, kk, _ in FAMILIES]}
    key_of["墨黑灰"] = "moheihui"
    key_of["月白灰"] = "yuebaihui"

    palettes = []
    native_counts = [6, 9, 12, 18]
    for label in order:
        key = key_of[label]
        items = groups.get((label, key), [])
        if not items:
            continue
        full = [c["hex"] for c in items]
        colors_map = {len(full): full}
        for n in native_counts:
            if 2 <= n < len(full):
                colors_map[n] = even_sample(full, n)
        palettes.append({
            "id": "cn:" + key,
            "name": "中国传统色·" + label,
            "source": "chinese",
            "group": label,
            "key": key,
            "type": "qual",
            "maxClasses": len(full),
            "properties": None,
            "colors": colors_map,
        })

    out = "window.CHINESE_DATA = " + json.dumps(palettes, ensure_ascii=False, indent=1) + ";\n"
    with io.open(OUT, "w", encoding="utf-8") as f:
        f.write(out)
    print("已写入 %s：%d 个调色板" % (OUT, len(palettes)))
    for p in palettes:
        print("  - %s (%d 色)" % (p["name"], p["maxClasses"]))


if __name__ == "__main__":
    main()
