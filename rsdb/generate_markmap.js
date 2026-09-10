#!/usr/bin/env node
"use strict";const fs=require("fs"),path=require("path");function parseFrontmatter(t){var e=t.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);if(!e)return{meta:{},body:t};var t=t.slice(e[0].length),e=e[1],n={},i=e.match(/^title:\s*(.+)$/m),i=(i&&(n.title=i[1].trim()),e.match(/markmap:\s*\n([\s\S]*?)(?=\n[^\s]|$)/));const s={};return i&&i[1].split("\n").forEach(e=>{e=e.match(/^\s+([\w-]+):\s*(.+?)\s*$/);if(e){let t=e[2];/^\d+$/.test(t)?t=Number(t):"true"===t?t=!0:"false"===t&&(t=!1),s[e[1]]=t}}),Object.keys(s).length&&(n.markmap=s),{meta:n,body:t}}function escapeAttr(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function inlineToHtml(t){let e="",n=0;for(var i=/\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;null!==(l=i.exec(t));){e+=escapeHtml(t.slice(n,l.index));var s=l[1],l=l[2].trim();e+='<a href="'+escapeAttr(l)+'" target="_blank" rel="noopener">'+escapeHtml(s)+"</a>",n=i.lastIndex}return e=(e=(e=(e+=escapeHtml(t.slice(n))).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")).replace(/(^|[^*])\*([^*\n]+)\*/g,"$1<i>$2</i>")).replace(/`([^`]+)`/g,"<code>$1</code>")}function buildTree(e){var{meta:e,body:t}=parseFrontmatter(e),n=e.markmap||{};let i=e.title||"",s=0;e=t.split(/\r?\n/);if(!i){let t=null;for(const d of e)if(d.match(/^#{1,6}\s/)){t=d;break}t&&1===t.match(/^(#{1,6})/)[1].length&&(i=t.replace(/^#\s+/,"").trim(),s=1)}t={content:inlineToHtml(i=i||"Mindmap"),children:[]};const l=[{depth:0,node:t}];let r=0;function a(t,e){for(;1<l.length&&l[l.length-1].depth>=e;)l.pop();l[l.length-1].node.children.push(t),l.push({depth:e,node:t})}for(const p of e)if(p.trim()){var o=p.match(/^(#{1,6})\s+(.*)$/);if(o){let t=o[1].length-s;t<1&&(t=1),a({content:inlineToHtml(o[2].trim()),children:[]},t),r=t}else{var c,o=p.match(/^(\s*)[-*+]\s+(.*)$/);o&&(c=o[1].replace(/\t/g,"  "),c=Math.floor(c.length/2),c=r+1+c,a({content:inlineToHtml(o[2].trim()),children:[],payload:{tag:"li"}},c))}}return{root:t,options:n,title:i}}const HTML_TEMPLATE=`<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<title><!--TITLE--></title>
<link rel="stylesheet" href="style.css" />
</head>
<body>
<div id="app">
  <header id="topbar">
    <div class="brand"><span class="logo"></span><span id="doc-title"><!--TITLE--></span></div>
    <div class="controls">
      <div class="search-box">
        <div class="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input id="search" type="text" placeholder="搜索节点…  (按 / 聚焦)" autocomplete="off" />
          <button id="search-clear" title="清除">✕</button>
          <span id="search-count" class="search-count"></span>
        </div>
        <div id="search-results" class="search-results"></div>
      </div>
      <button id="btn-expand" class="btn" title="展开全部 (e)">展开</button>
      <button id="btn-collapse" class="btn" title="折叠全部 (c)">折叠</button>
      <button id="btn-fit" class="btn" title="适配视图 (f)">适配</button>
      <button id="btn-zoom-in" class="btn" title="放大">＋</button>
      <button id="btn-zoom-out" class="btn" title="缩小">－</button>
      <button id="btn-theme" class="btn" title="切换明暗主题">🌓</button>
      <button id="btn-fullscreen" class="btn" title="全屏">⛶</button>
      <button id="btn-print" class="btn" title="打印 / 导出 PDF">打印</button>
    </div>
  </header>

  <aside id="sidebar">
    <div class="sidebar-head"><span>目录</span><button id="btn-show-all" class="btn-mini" title="显示全部节点">全部</button><button id="sidebar-toggle" class="btn-mini" title="收起">‹</button></div>
    <div class="sidebar-search">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input id="dir-search" type="text" placeholder="在目录中搜索…" autocomplete="off" />
      <button id="dir-clear" title="清除">✕</button>
    </div>
    <div id="branches" class="branches"></div>
  </aside>
  <button id="sidebar-open" class="btn-float" title="显示目录">☰</button>

  <svg id="mindmap"></svg>

  <div id="stats">共 <b id="stat-nodes">0</b> 个节点 · 匹配 <b id="stat-matches">0</b></div>
</div>

<script src="d3.min.js"></script>
<script src="index.js"></script>
<script src="index2.js"></script>
<script>
window.__MARKMAP_DATA__ = <!--DATA-->;
window.__MARKMAP_OPTIONS__ = <!--OPTIONS-->;
window.__MARKMAP_TITLE__ = <!--TITLE_JSON-->;
</script>
<script src="app.js"></script>
</body>
</html>
`;function main(){var e=process.argv.slice(2);let n=null,i=null,s=null;for(let t=0;t<e.length;t++)"--title"===e[t]?s=e[++t]:e[t].startsWith("--")||(n?i=i||e[t]:n=e[t]);n||(console.error('用法: node generate_markmap.js <input.md> [output.html] [--title "标题"]'),process.exit(1)),fs.existsSync(n)||(console.error("找不到输入文件: "+n),process.exit(1));var{root:t,options:l,title:r}=buildTree(fs.readFileSync(n,"utf8")),r=s||r,a=i?path.dirname(path.resolve(i)):path.dirname(path.resolve(n)),o=i?path.basename(i):path.basename(n,path.extname(n))+".html",o=path.join(a,o),c=__dirname;for(const h of["d3.min.js","index.js","index2.js","app.js","style.css"]){var d,p=path.join(a,h);fs.existsSync(p)||(d=path.join(c,h),fs.existsSync(d)?(fs.copyFileSync(d,p),console.log("  已复制运行库: "+h)):console.warn("  警告: 未找到运行库 "+h+"（请将其放入输出目录或脚本目录）"))}l=HTML_TEMPLATE.replace(/<!--TITLE-->/g,r).replace("\x3c!--DATA--\x3e",JSON.stringify(t)).replace("\x3c!--OPTIONS--\x3e",JSON.stringify(l)).replace("\x3c!--TITLE_JSON--\x3e",JSON.stringify(r));fs.writeFileSync(o,l,"utf8"),console.log("✅ 已生成: "+o),console.log("   节点总数: "+countNodes(t)+"，一级分支: "+(t.children||[]).length)}function countNodes(t){let e=1;return(t.children||[]).forEach(t=>{e+=countNodes(t)}),e}main();