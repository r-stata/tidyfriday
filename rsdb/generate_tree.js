#!/usr/bin/env node
"use strict";const fs=require("fs"),path=require("path");function parseFrontmatter(e){var t,n,r=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);return r?(t=e.slice(r[0].length),n={},(r=r[1].match(/^title:\s*(.+)$/m))&&(n.title=r[1].trim()),{meta:n,body:t}):{meta:{},body:e}}function escapeAttr(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function inlineToHtml(e){let t="",n=0;for(var r=/\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;null!==(a=r.exec(e));){t+=escapeHtml(e.slice(n,a.index));var i=a[1],a=a[2].trim();t+='<a href="'+escapeAttr(a)+'" target="_blank" rel="noopener">'+escapeHtml(i)+"</a>",n=r.lastIndex}return t=(t=(t=(t+=escapeHtml(e.slice(n))).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")).replace(/(^|[^*])\*([^*\n]+)\*/g,"$1<i>$2</i>")).replace(/`([^`]+)`/g,"<code>$1</code>")}function buildTree(t){var{meta:t,body:e}=parseFrontmatter(t);let n=t.title||"",r=0;t=e.split(/\r?\n/);if(!n){let e=null;for(const c of t)if(c.match(/^#{1,6}\s/)){e=c;break}e&&1===e.match(/^(#{1,6})/)[1].length&&(n=e.replace(/^#\s+/,"").trim(),r=1)}e={content:inlineToHtml(n=n||"Mindmap"),children:[]};const i=[{depth:0,node:e}];let a=0;function o(e,t){for(;1<i.length&&i[i.length-1].depth>=t;)i.pop();i[i.length-1].node.children.push(e),i.push({depth:t,node:e})}for(const p of t)if(p.trim()){var l=p.match(/^(#{1,6})\s+(.*)$/);if(l){let e=l[1].length-r;e<1&&(e=1),o({content:inlineToHtml(l[2].trim()),children:[]},e),a=e}else{var s,l=p.match(/^(\s*)[-*+]\s+(.*)$/);l&&(s=l[1].replace(/\t/g,"  "),s=Math.floor(s.length/2),s=a+1+s,o({content:inlineToHtml(l[2].trim()),children:[],payload:{tag:"li"}},s))}}return{root:e,title:n}}function countNodes(e){let t=1;return(e.children||[]).forEach(e=>{t+=countNodes(e)}),t}const HTML_TEMPLATE=`<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<title>/*__TITLE__*/</title>
<style>
* { margin: 0; padding: 0; }
html {
  font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}
#mindmap { display: block; width: 100vw; height: 100vh; }
.markmap-dark { background: #27272a; color: white; }
</style>
</head>
<body>
<svg id="mindmap"></svg>

<script src="d3.min.js"></script>
<script src="index.js"></script>
<script src="index2.js"></script>
<script>
window.__MARKMAP_DATA__ = /*__DATA__*/;
window.__MARKMAP_OPTIONS__ = /*__OPTIONS__*/;
(function () {
  var M = window.markmap;
  if (!M || !M.Markmap) {
    document.body.innerHTML =
      '<p style="padding:24px;font-family:sans-serif">未能加载 markmap 运行库，请确认 d3.min.js / index.js / index2.js 与本页面在同一目录。</p>';
    return;
  }
  var options = M.deriveOptions(window.__MARKMAP_OPTIONS__);
  var mm = M.Markmap.create('svg#mindmap', options, window.__MARKMAP_DATA__);
  if (M.Toolbar) {
    var tb = new M.Toolbar();
    tb.attach(mm);
    tb.setBrand(false);
    var el = tb.render();
    el.setAttribute('style', 'position:absolute;bottom:20px;right:20px');
    document.body.appendChild(el);
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('markmap-dark');
  }
})();
</script>
</body>
</html>
`;function main(){var t=process.argv.slice(2);let n=null,r=null,i=null;for(let e=0;e<t.length;e++)"--title"===t[e]?i=t[++e]:t[e].startsWith("--")||(n?r=r||t[e]:n=t[e]);n||(console.error('用法: node generate_tree.js <input.md> [output.html] [--title "标题"]'),process.exit(1)),fs.existsSync(n)||(console.error("找不到输入文件: "+n),process.exit(1));var{root:e,title:a}=buildTree(fs.readFileSync(n,"utf8")),a=i||a,o=r?path.dirname(path.resolve(r)):path.dirname(path.resolve(n)),l=r?path.basename(r):path.basename(n,path.extname(n))+"_tree.html",l=path.join(o,l),s=__dirname;for(const m of["d3.min.js","index.js","index2.js"]){var c,p=path.join(o,m);fs.existsSync(p)||(c=path.join(s,m),fs.existsSync(c)?(fs.copyFileSync(c,p),console.log("  已复制运行库: "+m)):console.warn("  警告: 未找到运行库 "+m+"（请将其放入输出目录或脚本目录）"))}a=HTML_TEMPLATE.replace(/\/\*__TITLE__\*\//g,a).replace("/*__DATA__*/",JSON.stringify(e)).replace("/*__OPTIONS__*/",'{"initialExpandLevel":3}');fs.writeFileSync(l,a,"utf8"),console.log("✅ 已生成原始风格树图(markmap): "+l),console.log("   节点总数: "+countNodes(e)+"，一级分支: "+(e.children||[]).length)}main();