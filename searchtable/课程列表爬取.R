library(tidyverse)
library(httr)

cookies = c(
  csrftoken = "BkH8VBLsUUJiN1w41FirgliSCFcJAVD8zdiVNqbAZYMHrz8av7iM0tp8xmw225xN",
  Hm_lvt_8659756219f35439f2eecb18bd255656 = "1792927848,1792999392,1793034405,1793038224",
  `_clck` = "164110b^2^gan^0^2444",
  auid = "32c4d231f6e84a038da6c5ec9121655d",
  user_info = '{"id":109736,"name":"182****3720","source":"mobile","shop":{"id":"02b79j1bdbe1b168g4","version":"advanced2019","admin":1,"account_id":"4469b866d2b74021a47a4fcc46e79564","permission":[],"applet_version":"basic","is_promotion":0,"announce":0,"sms_status":"enough","is_obs":0,"is_online_live":0,"is_applet_refund":0,"is_version_expire":false}}',
  ds_auth = "eyJ1aWQiOjEwOTczNiwic2lkIjoiMDJiNzlqMWJkYmUxYjE2OGc0IiwicnQiOiI2M2FmMzc5M2VjMmQ0YWM4OWY4NzBhMmU3MWIwODg1MCIsImV4cCI6MTc5MzEzNjgwOH0.le9AoHnoZJnds6Fte4iJbBEKGfi9S3TAvqDhXsAWWR4",
  `_clsk` = "1i9e6ab^1793115211117^12^1^s.clarity.ms/collect",
  `ds-csrf-token` = "eyJpdiI6IlwvYVQzTENmNEFhQzRucWNZVTFrOWlBPT0iLCJ2YWx1ZSI6IlJDZ2lFN0MyazhJZnhRbEpiUUdPampRSGZWVnNzWEd5cFQ1VzFScHlzK2NDY2s1aFgzOVN1ME1nUkNVWjUyZ1JiaW9GSGVCVUdYdWRLbGxDdXViRjZRPT0iLCJtYWMiOiIyMjUzMzRiMTY4MGI0ZjY1ODZjMWEyNjJkZWZlYTY0MzYyYzBjMzkyYmNhOTMzOGVjNzA4MjgwMDYyNDUzZDk2In0=",
  deprecated_duanshu_session = "eyJpdiI6Im5RZkJPSFhiRFwvMERHWVhUU2hOYm1nPT0iLCJ2YWx1ZSI6IlRVd1RDazNxZ29uVGJFNE5uaktWT0JGOEdrajhycG5ONXQ4dGVEREMzOERuNGdEaUx0czhQNXJHQnpVYWkrREorakRQcGlDc3VMdTh1YlJ6amdscHVnPT0iLCJtYWMiOiIxMjU4OWJkNTU0NTBiNDY2MmU4ODM2ZTdlZTljNjcxY2Q4Y2I5ZDcwZGIyNDE3NTgwY2I2ZTJiODZkMDAxYzViIn0="
)

headers = c(
  accept = "application/json, text/plain, */*",
  `accept-language` = "zh-CN,zh;q=0.9,en;q=0.8",
  origin = "https://my.duanshu.com",
  priority = "u=1, i",
  referer = "https://my.duanshu.com/",
  `sec-ch-ua` = '"Not:A-Brand";v="8", "Chromium";v="156", "Google Chrome";v="156"',
  `sec-ch-ua-mobile` = "?0",
  `sec-ch-ua-platform` = '"macOS"',
  `sec-fetch-dest` = "empty",
  `sec-fetch-mode` = "cors",
  `sec-fetch-site` = "same-site",
  `user-agent` = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36",
  `x-shop` = "02b79j1bdbe1b168g4",
  `x-shop-platform` = "duanshu"
)

params = list(
  page = "1",
  count = "1700"
)

res <- httr::GET(url = "https://api.duanshu.com/admin/content/course/lists", httr::add_headers(.headers=headers), query = params, httr::set_cookies(.cookies = cookies)) 

content(res) -> lst
lst$response$data %>% 
  transpose() %>% 
  as_tibble() %>%
  select(title, status, price, hashid) %>% 
  unnest() -> df

df 

lst$response$data %>% 
  transpose() %>% 
  as_tibble() %>% 
  select(title, status, price, hashid, create_time) %>% 
  unnest() %>% 
  mutate(create_time = ymd_hms(create_time)) %>% 
  filter(create_time >= ymd_hms("2026-10-27 00:25:26")) %>% 
  mutate(hashid = paste0("https://rstata.duanshu.com/#/course/", hashid)) %>% 
  rename(链接 = hashid) %>% 
  select(-create_time, -status, -price) %>% 
  set_names("标题", "链接") %>% 
  transmute(text = paste0("[", 标题, "](", 链接, ")")) %>% 
  write_csv("new.csv")

df %>% 
  mutate(class = case_when(
    price == "1000.00" ~ "数据资料",
    price == "999.00" ~ "课程",
    price == "1800.00" ~ "名师讲堂",
    price == "2800.00" ~ "名师讲堂",
    price == "0.00" ~ "数据资料",
    price == "1199.00" ~ "课程",
    price == "2880.00" ~ "名师讲堂",
    price == "3060.00" ~ "名师讲堂",
    price == "2400.00" ~ "名师讲堂",
    T ~ "课程"
  )) %>% 
  select(-price) %>% 
  filter(status != 0) %>% 
  select(-status) %>% 
  arrange(class) %>% 
  mutate(hashid = paste0("https://rstata.duanshu.com/#/course/", hashid)) %>% 
  rename(链接 = hashid) %>% 
  set_names("标题", "链接", "类别") -> df 

df
  
df %>% 
  writexl::write_xlsx("RStata 课程&数据列表raw.xlsx")

df %>% 
  write_csv("RStata 课程&数据列表raw.csv")

df

df %>% 
  arrange(标题) %>% 
  mutate(标题 = str_remove_all(标题, "名师讲堂｜"),
         标题 = str_replace_all(标题, "~", "～")) %>% 
  transmute(类别, text = paste0("[", 标题, "](", 链接, ")")) %>% 
  write_csv("RStata 课程&数据列表.csv")

df %>% 
  mutate(标题 = str_remove_all(标题, "名师讲堂｜"),
         标题 = str_replace_all(标题, "~", "～")) %>% 
  select(-类别) %>% 
  mutate(PC端链接 = str_replace_all(链接, "https://rstata.duanshu.com/#/course/", "https://rstata-pc.duanshu.com/course/detail/"),
         手机端链接 = paste0("<a target=\"_blank\" href=\"", 链接, "\">手机端链接</a>"),
         PC端链接 = paste0("<a target=\"_blank\" href=\"", PC端链接, "\">PC端链接</a>"),
         复制 = "<button class=\"dtcopy\" onclick=\"copyRow(this)\">复制</button>") %>% 
  DT::datatable(width = "100%", height = "400px",
                rownames = FALSE, # 去除表头
                filter = "top", # 在顶部添加过滤控件
                escape = F,
                extensions = 'Buttons',  # 启用 Buttons 扩展
                caption = htmltools::tags$caption(
                  style = "caption-side: top; text-align: center; font-size: 24px;",
                  "RStata 课程与图表数据库索引"  # 设置标题文本
                ),
                options = list(
                  columnDefs = list(
                    list(visible = FALSE, targets = c(1))  # 隐藏第2列（链接，索引从0开始）
                  ),
                  autoWidth = TRUE,
                  pageLength = 10, # 每页显示的数量
                  initComplete = htmlwidgets::JS(
                    "function(settings, json) {",
                    "$(this.api().table().container()).css({'font-family': 'SourceHanSerifSC-Medium'});",
                    "}"),
                  dom = 'Bfrtip',       # 定义控件布局（B 表示按钮）
                  buttons = list(
                    list(extend = 'csv', filename = 'RStata 课程与图表数据库索引',
                         text = '下载 CSV',
                         exportOptions = list(
                           columns = c(0, 1)  # 只导出第1、2列
                         )),
                    list(extend = 'excel', 
                         filename = 'RStata 课程与图表数据库索引',
                         text = '下载 Excel',
                         exportOptions = list(
                           columns = c(0, 1),  # 只导出第1、2列
                           title = 'RStata 课程与图表数据库索引',
                           header = FALSE
                         ))
                  )
                )
  ) -> dt_old

# 复制功能所需的样式与脚本（复制「名称：手机端链接」）
copy_style <- htmltools::tags$style(htmltools::HTML(
  ".dtcopy{margin-left:8px;border:1px solid #3b6fe0;background:#fff;color:#3b6fe0;border-radius:8px;padding:4px 12px;cursor:pointer;font-size:12px;font-weight:600;transition:all .15s ease}
   .dtcopy:hover{background:#3b6fe0;color:#fff;box-shadow:0 3px 10px rgba(59,111,224,.3)}
   .dtcopy.done{border-color:#27b06f;color:#27b06f}
   .dtcopy.done:hover{background:#27b06f;color:#fff}"
))
copy_script <- htmltools::tags$script(htmltools::HTML(
  "function copyText(text, btn){
     function ok(){ if(btn){ btn.classList.add('done'); var t=btn.textContent; btn.textContent='已复制 ✓'; setTimeout(function(){ btn.textContent=t; btn.classList.remove('done'); }, 1200); } }
     function fb(){ var ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.top='-9999px'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); ok(); }catch(e){ alert('复制失败，请手动复制'); } document.body.removeChild(ta); }
     if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(ok).catch(fb); } else { fb(); }
   }
   function copyRow(btn){ var tr=btn.closest('tr'); if(!tr) return; var t=tr.cells[0].textContent.trim(); var link=''; var as=tr.getElementsByTagName('a'); for(var i=0;i<as.length;i++){ var h=as[i].getAttribute('href')||''; if(h.indexOf('rstata.duanshu.com/#/course/')!==-1){ link=h; break; } } if(!link && tr.cells[1]) link=tr.cells[1].textContent.trim(); copyText(t+'：'+link, btn); }"
))

# 仅做样式美化（不改变任何功能），与 index.html 的 navy 主题保持一致
beautify_style <- htmltools::tags$style(htmltools::HTML(
  "/* ===== RStata 课程索引：仅样式美化，不改变任何功能 ===== */
   body{background:linear-gradient(135deg,#f4f7fc 0%,#eaeff8 100%) !important;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Source Han Sans SC',sans-serif !important}
   #htmlwidget_container{max-width:1180px;margin:0 auto !important;padding:34px 20px 56px !important}
   .dataTables_wrapper{background:#fff;border:1px solid #e6ecf7;border-radius:16px;box-shadow:0 10px 34px rgba(21,35,63,.10);padding:20px 20px 16px}
   .dataTables_wrapper caption,table.dataTable caption{caption-side:top !important;text-align:center !important;font-size:26px !important;font-weight:700 !important;color:#1f3a8a !important;letter-spacing:.5px;padding:4px 0 18px !important}
   table.dataTable thead th{background:#f2f6fd !important;color:#1f3a8a !important;font-weight:600;border-bottom:2px solid #d7e0f3 !important;padding:12px 14px !important;white-space:nowrap}
   table.dataTable tbody td{padding:11px 14px !important;color:#36405a;border-top:1px solid #eef1f7 !important}
   table.dataTable tbody tr:nth-child(even) td{background:#fafbfe}
   table.dataTable tbody tr:hover td{background:#eef3ff !important}
   table.dataTable tbody a{color:#3b6fe0;text-decoration:none}
   table.dataTable tbody a:hover{text-decoration:underline}
   .dataTables_wrapper .dataTables_filter input,.dataTables_wrapper tfoot input,.dataTables_wrapper .form-control{border:1px solid #d7e0f3 !important;border-radius:9px !important;padding:6px 11px !important;outline:none;box-shadow:none !important}
   .dataTables_wrapper input:focus{border-color:#3b6fe0 !important;box-shadow:0 0 0 3px rgba(59,111,224,.15) !important}
   .dataTables_wrapper tfoot th{background:#fbfcfe}
   .dt-buttons .dt-button{background:linear-gradient(180deg,#4a7df0,#3b6fe0) !important;color:#fff !important;border:none !important;border-radius:10px !important;padding:8px 16px !important;font-size:13px !important;font-weight:600 !important;box-shadow:0 4px 12px rgba(59,111,224,.28) !important;margin:0 8px 8px 0 !important;transition:transform .12s ease,box-shadow .12s ease}
   .dt-buttons .dt-button:hover{transform:translateY(-1px);box-shadow:0 7px 18px rgba(59,111,224,.38) !important}
   .dataTables_wrapper .dataTables_length select,.dataTables_wrapper .dataTables_length,.dataTables_wrapper .dataTables_info,.dataTables_wrapper .dataTables_filter label{color:#56627a !important;font-size:13px}
   .dataTables_paginate .paginate_button{border:1px solid #e1e8f5 !important;border-radius:8px !important;color:#3b6fe0 !important;background:#fff !important;margin-left:4px !important}
   .dataTables_paginate .paginate_button:hover{background:#eef3ff !important;border-color:#3b6fe0 !important}
   .dataTables_paginate .paginate_button.current,.dataTables_paginate .paginate_button.current:hover{background:#3b6fe0 !important;color:#fff !important;border-color:#3b6fe0 !important}
   /* 嵌入博客文章（iframe 内）时去掉独立页面的留白与悬浮卡片感，做到无缝融合 */
   .in-iframe body{background:#fff !important}
   .in-iframe #htmlwidget_container{max-width:100% !important;margin:0 !important;padding:0 !important}
   .in-iframe .dataTables_wrapper{box-shadow:none !important;border-radius:12px !important}"
))

# 嵌入博客（iframe）时：自动撑高，消除滚动条与“盒子感”
embed_script <- htmltools::tags$script(htmltools::HTML(
  "(function(){
    function sendHeight(){
      try{
        var d=document.documentElement;
        var h=Math.ceil(Math.max(d.scrollHeight,d.offsetHeight,document.body.scrollHeight||0));
        if(window.self!==window.top){ window.parent.postMessage({__rsdbResize:true,height:h},'*'); }
      }catch(e){}
    }
    if('ResizeObserver' in window){ try{ var ro=new ResizeObserver(sendHeight); ro.observe(document.documentElement); }catch(e){} }
    window.addEventListener('resize',sendHeight);
    window.addEventListener('load',sendHeight);
    document.addEventListener('draw.dt',function(){ setTimeout(sendHeight,30); });
    document.addEventListener('init.dt',function(){ setTimeout(sendHeight,30); });
    [200,600,1200,2000].forEach(function(t){ setTimeout(sendHeight,t); });
  })();"
))

# 批量选择与复制（复刻 index.html 交互：勾选 + 全选本页/筛选结果 + 复制选中）
batch_style <- htmltools::tags$style(htmltools::HTML(
  ".dataTables_wrapper .selbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:#fff;border:1px solid #e6ecf7;border-radius:12px;padding:10px 14px;margin:0 0 14px}
   .dataTables_wrapper .selbar .info{color:#56627a;font-size:13px}
   .dataTables_wrapper .selbar .info b{color:#3b6fe0}
   .dataTables_wrapper .btn-sel{border:1px solid #d7e0f3;background:#fff;color:#36405a;padding:7px 14px;border-radius:9px;cursor:pointer;font-size:13px;font-weight:600;transition:.15s}
   .dataTables_wrapper .btn-sel:hover{border-color:#3b6fe0;color:#3b6fe0}
   .dataTables_wrapper .btn-sel.primary{background:linear-gradient(180deg,#4a7df0,#3b6fe0);color:#fff;border:none}
   .dataTables_wrapper .btn-sel.primary:hover{filter:brightness(1.05)}
   .dataTables_wrapper .btn-sel:disabled{opacity:.5;cursor:not-allowed}
   .dataTables_wrapper .chk{width:16px;height:16px;cursor:pointer;accent-color:#3b6fe0;vertical-align:middle}
   table.dataTable tbody tr.selected td{background:#eef3ff !important}"
))

batch_script <- htmltools::tags$script(htmltools::HTML(
  "(function(){
    var selMap={};
    function J(){ return window.jQuery||window.$; }
    function tableEl(){ return document.querySelector('.dataTables_wrapper table.dataTable'); }
    function api(){ var t=tableEl(), j=J(); return (t&&j)? j(t).DataTable() : null; }
    function rowKey(tr){ var as=tr.getElementsByTagName('a'); for(var i=0;i<as.length;i++){ var h=as[i].getAttribute('href')||''; if(h.indexOf('rstata.duanshu.com/#/course/')!==-1) return h; } return tr.cells[0]?tr.cells[0].textContent.trim():''; }
    function rowHandler(tr){ return function(){ var key=rowKey(tr); if(this.checked){ selMap[key]={t:tr.cells[0].textContent.trim(), l:key}; } else { delete selMap[key]; } tr.classList.toggle('selected', this.checked); syncSelUI(); }; }
    function ensureSelbar(){
      var w=document.querySelector('.dataTables_wrapper'); if(!w||document.getElementById('selbar')) return;
      var bar=document.createElement('div'); bar.className='selbar'; bar.id='selbar';
      bar.innerHTML='<span class=\"info\" id=\"selInfo\">已选 <b>0</b> 项</span><button class=\"btn-sel\" id=\"selectAllFiltered\">全选筛选结果</button><button class=\"btn-sel primary\" id=\"copySelected\" disabled>复制选中</button><button class=\"btn-sel\" id=\"clearSel\">清除</button>';
      w.insertBefore(bar, w.firstChild);
      document.getElementById('selectAllFiltered').addEventListener('click', function(){ var a=api(); if(!a) return; a.rows({search:'applied'}).every(function(){ var d=this.data(); selMap[d[1]]={t:d[0], l:d[1]}; }); syncSelUI(); ensureChecks(); });
      document.getElementById('copySelected').addEventListener('click', function(){ var keys=Object.keys(selMap); if(!keys.length) return; var text=keys.map(function(k){ return selMap[k].t+'：'+selMap[k].l; }).join('\\n'); copyText(text, this); });
      document.getElementById('clearSel').addEventListener('click', function(){ selMap={}; syncSelUI(); ensureChecks(); });
    }
    function ensureChecks(){
      var t=tableEl(); if(!t) return;
      var th0=t.querySelector('thead th:first-child');
      if(th0 && !th0.querySelector('#selectAllPage')){
        th0.innerHTML='<input type=\"checkbox\" class=\"chk\" id=\"selectAllPage\" title=\"全选本页\">';
        document.getElementById('selectAllPage').addEventListener('change', function(){ var a=api(); if(!a) return; var on=this.checked; a.rows({page:'current', search:'applied'}).every(function(){ var d=this.data(); if(on){ selMap[d[1]]={t:d[0], l:d[1]}; } else { delete selMap[d[1]]; } }); syncSelUI(); ensureChecks(); });
      }
      var rows=Array.prototype.slice.call(t.querySelectorAll('tbody tr'));
      rows.forEach(function(tr){ var td0=tr.querySelector('td:first-child'); if(!td0) return; var k=rowKey(tr); var cb=td0.querySelector('.rowchk'); if(!cb){ cb=document.createElement('input'); cb.type='checkbox'; cb.className='rowchk'; cb.style.marginRight='6px'; cb.addEventListener('change', rowHandler(tr)); td0.insertBefore(cb, td0.firstChild); } cb.checked=!!selMap[k]; tr.classList.toggle('selected', cb.checked); });
      syncHeader();
    }
    function syncHeader(){
      var sap=document.getElementById('selectAllPage'); if(!sap) return;
      var t=tableEl(); if(!t) return;
      var rows=Array.prototype.slice.call(t.querySelectorAll('tbody tr'));
      var keys=rows.map(rowKey);
      var onPage=keys.length>0 && keys.every(function(k){ return !!selMap[k]; });
      var some=keys.some(function(k){ return !!selMap[k]; });
      sap.checked=onPage; sap.indeterminate=(!onPage && some);
    }
    function syncSelUI(){ var n=Object.keys(selMap).length; var info=document.getElementById('selInfo'); if(info) info.innerHTML='已选 <b>'+n+'</b> 项'; var cs=document.getElementById('copySelected'); if(cs) cs.disabled=(n===0); syncHeader(); }
    function init(){ ensureSelbar(); ensureChecks(); }
    document.addEventListener('init.dt', init);
    document.addEventListener('draw.dt', function(){ ensureChecks(); });
    document.addEventListener('length.dt', function(){ ensureChecks(); });
    [200,500,1000,2000].forEach(function(t){ setTimeout(init, t); });
  })();"
))

dt_old %>% 
  htmlwidgets::appendContent(copy_style, copy_script, beautify_style, embed_script, batch_style, batch_script) %>% 
  htmlwidgets::saveWidget("index-old.html", title = "RStata 课程与图表数据库索引") 

# 读取原始 HTML 文件
html_content <- readLines("index-old.html")

# 在 </head> 前插入 favicon
modified_content <- sub(
  "</head>",
  '<link rel="icon" href="https://tidyfriday.cn/images/pad.svg">\n</head>',
  html_content
)
# 若是嵌入博客（iframe）内打开，则给 <html> 加 in-iframe 类，便于无缝样式接管
modified_content <- sub(
  '<body style="background-color: white;">',
  '<body style="background-color: white;">\n<script>if(window.self!==window.top){document.documentElement.className+=\' in-iframe\';}</script>',
  modified_content
)

# 保存修改后的文件
writeLines(modified_content, "index-old.html")

# ============ 生成功能更丰富、页面更精美的 index.html ============
# 采用自包含单页（数据内嵌为 JSON，离线可用），不再依赖 DT / CDN
library(jsonlite)

# 准备展示数据：保留「类别」用于筛选，并生成 PC 端链接
df_show <- df %>% 
  mutate(标题 = str_remove_all(标题, "名师讲堂｜"),
         标题 = str_replace_all(标题, "~", "～")) %>% 
  mutate(PC端链接 = str_replace_all(链接, 
          "https://rstata.duanshu.com/#/course/", 
          "https://rstata-pc.duanshu.com/course/detail/")) %>% 
  select(标题, 链接, 类别, PC端链接)

# 转为 JSON 内嵌到 HTML
data_json <- jsonlite::toJSON(
  df_show, auto_unbox = TRUE, dataframe = "rows", na = "null"
)

# ---- HTML 模板（数据占位符为 ___DATA___）----
html_template <- '<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>RStata 课程与图表数据库索引</title>
<link rel="icon" href="https://tidyfriday.cn/images/pad.svg" />
<style>
:root{
  --navy:#15233f; --navy2:#21365c; --accent:#3b6fe0;
  --bg:#eef1f6; --card:#ffffff; --text:#1f2733; --muted:#6b7686; --line:#e3e8f0;
  --c-course:#3b6fe0; --c-lecture:#e0a52e; --c-data:#27b06f;
  --shadow:0 6px 22px rgba(21,35,63,.10);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei","Source Han Sans SC","Noto Sans CJK SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
header.hero{background:linear-gradient(135deg,var(--navy) 0%,var(--navy2) 100%);color:#fff;padding:38px 24px 30px}
.hero-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.hero img.logo{width:54px;height:54px;border-radius:14px;background:#fff;padding:6px;box-shadow:var(--shadow)}
.hero h1{margin:0;font-size:26px;font-weight:700;letter-spacing:.5px}
.hero p{margin:4px 0 0;color:#c4d0e6;font-size:14px}
main{max-width:1180px;margin:-22px auto 40px;padding:0 24px}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:22px}
.stat{background:var(--card);border-radius:16px;padding:18px 20px;box-shadow:var(--shadow);border:1px solid var(--line)}
.stat .num{font-size:30px;font-weight:800;line-height:1}
.stat .lbl{margin-top:6px;color:var(--muted);font-size:13px}
.stat.total .num{color:var(--accent)} .stat.c1 .num{color:var(--c-course)}
.stat.c2 .num{color:var(--c-lecture)} .stat.c3 .num{color:var(--c-data)}
.toolbar{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;box-shadow:var(--shadow)}
.tabs{display:flex;gap:8px;flex-wrap:wrap}
.tab{border:1px solid var(--line);background:#fff;color:var(--text);padding:8px 16px;border-radius:999px;cursor:pointer;font-size:14px;transition:.18s;font-weight:600}
.tab:hover{border-color:var(--accent)}
.tab.active{background:var(--accent);border-color:var(--accent);color:#fff}
.controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.search{position:relative}
.search input{border:1px solid var(--line);border-radius:10px;padding:9px 14px 9px 34px;width:230px;font-size:14px;outline:none;transition:.18s;background:#fbfcfe}
.search input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(59,111,224,.15)}
.search svg{position:absolute;left:11px;top:50%;transform:translateY(-50%);opacity:.5}
.viewtoggle{display:flex;border:1px solid var(--line);border-radius:10px;overflow:hidden}
.viewtoggle button{border:none;background:#fff;padding:9px 14px;cursor:pointer;font-size:13px;color:var(--muted)}
.viewtoggle button.active{background:var(--accent);color:#fff}
.btn-dl{border:1px solid var(--accent);background:#fff;color:var(--accent);padding:9px 16px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;transition:.18s}
.btn-dl:hover{background:var(--accent);color:#fff}
.resultcount{color:var(--muted);font-size:13px;margin:14px 2px 10px}
.table-wrap{background:var(--card);border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow);overflow:hidden}
table{width:100%;border-collapse:collapse;font-size:14px}
thead th{background:#f5f7fb;text-align:left;padding:13px 16px;font-weight:700;color:var(--muted);border-bottom:1px solid var(--line);position:sticky;top:0}
tbody td{padding:13px 16px;border-bottom:1px solid var(--line);vertical-align:middle}
tbody tr:hover{background:#f7f9fd}
.badge{display:inline-block;padding:3px 11px;border-radius:999px;font-size:12px;font-weight:700;color:#fff}
.badge.课程{background:var(--c-course)} .badge.名师讲堂{background:var(--c-lecture)} .badge.数据资料{background:var(--c-data)}
.title-cell{font-weight:600;max-width:560px}
.links a{display:inline-block;margin-right:8px;padding:6px 13px;border-radius:9px;font-size:13px;text-decoration:none;font-weight:600}
.links a.m{background:rgba(59,111,224,.1);color:var(--accent)} .links a.p{background:rgba(39,176,111,.12);color:var(--c-data)}
.links a:hover{filter:brightness(.96);text-decoration:underline}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:12px;transition:.18s}
.card:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(21,35,63,.16)}
.card .top{display:flex;justify-content:space-between;align-items:center}
.card .ctitle{font-weight:700;font-size:15px;line-height:1.5}
.card .cactions{display:flex;gap:8px;margin-top:auto}
.card .cactions a{flex:1;text-align:center;padding:9px 0;border-radius:10px;font-size:13px;text-decoration:none;font-weight:600}
.card .cactions a.m{background:rgba(59,111,224,.1);color:var(--accent)} .card .cactions a.p{background:rgba(39,176,111,.12);color:var(--c-data)}
.card .copy{border:1px solid var(--line);background:#fff;color:var(--muted);border-radius:10px;padding:9px 0;cursor:pointer;font-size:13px;flex:1}
.empty{text-align:center;color:var(--muted);padding:50px 0}
.pager{display:flex;justify-content:center;align-items:center;gap:10px;margin:20px 0 8px;flex-wrap:wrap}
.pager .pg{border:1px solid var(--line);background:#fff;color:var(--text);padding:8px 14px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;transition:.18s}
.pager .pg:hover:not([disabled]){border-color:var(--accent);color:var(--accent)}
.pager .pg[disabled]{opacity:.45;cursor:not-allowed}
.pager .pginfo{color:var(--muted);font-size:13px;margin:0 4px}
.pager .pginfo b{color:var(--text)}
.pgsize{display:flex;align-items:center;gap:6px;color:var(--muted);font-size:13px}
.pgsize select{border:1px solid var(--line);border-radius:10px;padding:8px 10px;font-size:13px;outline:none;background:#fbfcfe;cursor:pointer;transition:.18s}
.pgsize select:focus{border-color:var(--accent)}
.chk{width:16px;height:16px;cursor:pointer;accent-color:var(--accent);vertical-align:middle}
tr.selected{background:#eef3ff}
.card.selected{border-color:var(--accent);box-shadow:0 0 0 2px rgba(59,111,224,.22)}
.copy-btn{border:1px solid var(--line);background:#fff;color:var(--muted);border-radius:9px;padding:6px 12px;cursor:pointer;font-size:13px;font-weight:600;transition:.18s;white-space:nowrap}
.copy-btn:hover{border-color:var(--accent);color:var(--accent)}
.copy-btn.done{border-color:var(--c-data);color:var(--c-data)}
.selbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 16px;box-shadow:var(--shadow);margin:14px 0}
.selbar .info{color:var(--muted);font-size:13px}
.selbar .info b{color:var(--accent)}
.btn-sel{border:1px solid var(--accent);background:#fff;color:var(--accent);padding:8px 14px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;transition:.18s}
.btn-sel:hover{background:var(--accent);color:#fff}
.btn-sel.primary{background:var(--accent);color:#fff}
.btn-sel[disabled]{opacity:.5;cursor:not-allowed}
footer{max-width:1180px;margin:0 auto;padding:24px;text-align:center;color:var(--muted);font-size:13px}
@media(max-width:760px){
  .stats{grid-template-columns:repeat(2,1fr)}
  .search input{width:160px} .hero h1{font-size:21px}
}
</style>
</head>
<body>
<header class="hero">
  <div class="hero-inner">
    <img class="logo" src="https://tidyfriday.cn/images/pad.svg" alt="RStata" />
    <div>
      <h1>RStata 课程与图表数据库索引</h1>
      <p>一站式检索 RStata 数据中心全部课程、名师讲堂与数据资料</p>
    </div>
  </div>
</header>
<main>
  <section class="stats" id="stats"></section>
  <section class="toolbar">
    <div class="tabs" id="tabs"></div>
    <div class="controls">
      <div class="search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7686" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="search" placeholder="搜索课程名称或链接…" />
      </div>
      <label class="pgsize">每页
        <select id="pageSize">
          <option value="10">10</option>
          <option value="20" selected>20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="all">全部</option>
        </select>
      </label>
      <div class="viewtoggle">
        <button data-view="table" class="active">表格</button>
        <button data-view="card">卡片</button>
      </div>
      <button class="btn-dl" id="download">下载 CSV</button>
    </div>
  </section>
  <div class="selbar" id="selbar">
    <span class="info">已选 <b id="selCount">0</b> 项</span>
    <button class="btn-sel" id="selectAllFiltered">全选筛选结果</button>
    <button class="btn-sel primary" id="copySelected">复制选中</button>
    <button class="btn-sel" id="clearSel">清空选择</button>
  </div>
  <div class="resultcount" id="resultcount"></div>
  <div class="table-wrap" id="tableView">
    <table>
      <thead><tr><th style="width:42px"><input type="checkbox" class="chk" id="selectAllPage" title="全选本页" /></th><th>类别</th><th>名称</th><th>访问</th><th style="width:92px">复制</th></tr></thead>
      <tbody id="tbody"></tbody>
    </table>
    <div id="emptyRow" class="empty" style="display:none">没有匹配的资源</div>
  </div>
  <div class="cards" id="cardView"></div>
  <div class="pager" id="pager"></div>
</main>
<footer>RStata 数据中心 · 数据来源：rstata.duanshu.com ｜ 本页由课程列表爬取.R 自动生成</footer>
<script>
const DATA = ___DATA___;

function el(tag, cls, txt){
  var e=document.createElement(tag);
  if(cls) e.setAttribute("class", cls);
  if(txt!=null) e.textContent=txt;
  return e;
}
function makeLink(url, cls, txt){
  var a=el("a", cls, txt);
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  return a;
}
function makeStat(num, lbl, cls){
  var card=el("div", "stat " + cls);
  card.appendChild(el("div", "num", String(num)));
  card.appendChild(el("div", "lbl", lbl));
  return card;
}
function filtered(){
  var q=state.q.trim().toLowerCase();
  return DATA.filter(function(d){
    if(state.cat!=="全部" && d["类别"]!==state.cat) return false;
    if(q && !(String(d["标题"]).toLowerCase().includes(q) || String(d["链接"]||"").toLowerCase().includes(q))) return false;
    return true;
  });
}
function renderStats(){
  var c={"课程":0,"名师讲堂":0,"数据资料":0};
  DATA.forEach(function(d){ if(c[d["类别"]]!=null) c[d["类别"]]++; });
  var box=document.getElementById("stats"); box.innerHTML="";
  box.appendChild(makeStat(DATA.length, "全部资源", "total"));
  box.appendChild(makeStat(c["课程"], "课程", "c1"));
  box.appendChild(makeStat(c["名师讲堂"], "名师讲堂", "c2"));
  box.appendChild(makeStat(c["数据资料"], "数据资料", "c3"));
}
function renderTabs(){
  var tabs=["全部","课程","名师讲堂","数据资料"];
  var box=document.getElementById("tabs"); box.innerHTML="";
  tabs.forEach(function(t){
    var d=el("div", "tab" + (state.cat===t ? " active" : ""), t);
    d.setAttribute("data-cat", t);
    d.addEventListener("click", function(){ state.cat=t; state.page=1; renderTabs(); renderAll(); });
    box.appendChild(d);
  });
}
function renderTable(rows){
  var tb=document.getElementById("tbody"); tb.innerHTML="";
  var er=document.getElementById("emptyRow");
  if(!rows.length){ er.style.display=""; return; }
  er.style.display="none";
  rows.forEach(function(d){
    var key=d["链接"];
    var tr=el("tr");
    if(state.selected.has(key)) tr.className="selected";
    var td0=el("td");
    var cb=el("input","chk"); cb.type="checkbox"; cb.checked=state.selected.has(key);
    cb.setAttribute("data-key", key);
    cb.addEventListener("change", function(){ toggleSel(key, cb.checked); });
    td0.appendChild(cb); tr.appendChild(td0);
    var td1=el("td"); td1.appendChild(el("span","badge "+d["类别"], d["类别"])); tr.appendChild(td1);
    tr.appendChild(el("td","title-cell", d["标题"]));
    var td3=el("td","links");
    td3.appendChild(makeLink(d["链接"],"m","手机端"));
    td3.appendChild(makeLink(d["PC端链接"],"p","PC端"));
    tr.appendChild(td3);
    var td4=el("td");
    var cp=el("button","copy-btn","复制");
    cp.addEventListener("click", function(){ copyOne(d, cp); });
    td4.appendChild(cp); tr.appendChild(td4);
    tb.appendChild(tr);
  });
  syncSelUI();
}
function renderCards(rows){
  var box=document.getElementById("cardView"); box.innerHTML="";
  if(!rows.length){ box.appendChild(el("div","empty","没有匹配的资源")); return; }
  rows.forEach(function(d){
    var key=d["链接"];
    var card=el("div","card"); if(state.selected.has(key)) card.className="card selected";
    var top=el("div","top"); top.appendChild(el("span","badge "+d["类别"], d["类别"]));
    var cb=el("input","chk"); cb.type="checkbox"; cb.checked=state.selected.has(key); cb.setAttribute("data-key", key);
    cb.addEventListener("change", function(){ toggleSel(key, cb.checked); });
    top.appendChild(cb); card.appendChild(top);
    card.appendChild(el("div","ctitle", d["标题"]));
    var actions=el("div","cactions");
    actions.appendChild(makeLink(d["链接"],"m","手机端打开"));
    actions.appendChild(makeLink(d["PC端链接"],"p","PC端打开"));
    card.appendChild(actions);
    var copy=el("button","copy","复制：链接");
    copy.addEventListener("click", function(){ copyOne(d, copy); });
    card.appendChild(copy);
    box.appendChild(card);
  });
  syncSelUI();
}
function totalPages(total){
  if(state.pageSize==="all") return 1;
  return Math.max(1, Math.ceil(total/state.pageSize));
}
function pageRows(rows){
  if(state.pageSize==="all") return rows;
  var ps=state.pageSize, pages=totalPages(rows.length);
  if(state.page>pages) state.page=pages;
  if(state.page<1) state.page=1;
  var start=(state.page-1)*ps;
  return rows.slice(start, start+ps);
}
function renderPager(total){
  var box=document.getElementById("pager"); box.innerHTML="";
  var pages=totalPages(total);
  if(state.page>pages) state.page=pages;
  if(state.page<1) state.page=1;
  function mk(label, dis, go){
    var b=el("button","pg",label);
    if(dis) b.setAttribute("disabled","");
    else b.addEventListener("click", function(){ state.page=go; renderAll(); });
    return b;
  }
  box.appendChild(mk("« 首页", state.page<=1, 1));
  box.appendChild(mk("‹ 上一页", state.page<=1, state.page-1));
  box.appendChild(el("span","pginfo","第 " + state.page + " / " + pages + " 页"));
  box.appendChild(mk("下一页 ›", state.page>=pages, state.page+1));
  box.appendChild(mk("末页 »", state.page>=pages, pages));
}
function renderAll(){
  var all=filtered();
  var rows=pageRows(all);
  if(state.view==="table"){
    document.getElementById("tableView").style.display="";
    document.getElementById("cardView").style.display="none";
    renderTable(rows);
  } else {
    document.getElementById("tableView").style.display="none";
    document.getElementById("cardView").style.display="";
    renderCards(rows);
  }
  var tp=totalPages(all.length);
  document.getElementById("resultcount").textContent="共 " + all.length + " 项，第 " + state.page + " / " + tp + " 页，本页显示 " + rows.length + " 条";
  renderPager(all.length);
}
var state={cat:"全部",q:"",view:"table",page:1,pageSize:20,selected:new Set()};
function copyText(text, btn){
  function ok(){ if(btn){ btn.classList.add("done"); var t=btn.textContent; btn.textContent="已复制 ✓"; setTimeout(function(){ btn.textContent=t; btn.classList.remove("done"); }, 1200); } }
  function fb(){ var ta=document.createElement("textarea"); ta.value=text; ta.style.position="fixed"; ta.style.top="-9999px"; document.body.appendChild(ta); ta.select(); try{ document.execCommand("copy"); ok(); }catch(e){ alert("复制失败，请手动复制"); } document.body.removeChild(ta); }
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(ok).catch(fb); } else { fb(); }
}
function copyOne(d, btn){ copyText(d["标题"] + "：" + d["链接"], btn); }
function toggleSel(key, on){ if(on) state.selected.add(key); else state.selected.delete(key); syncSelUI(); }
function syncSelUI(){
  var n=state.selected.size;
  var sc=document.getElementById("selCount"); if(sc) sc.textContent=n;
  var cs=document.getElementById("copySelected"); if(cs) cs.disabled=(n===0);
  var sap=document.getElementById("selectAllPage");
  if(sap){ var pageKeys=pageRows(filtered()).map(function(d){ return d["链接"]; }); var onPage=pageKeys.length>0 && pageKeys.every(function(k){ return state.selected.has(k); }); var some=pageKeys.some(function(k){ return state.selected.has(k); }); sap.checked=onPage; sap.indeterminate=(!onPage && some); }
}
document.getElementById("selectAllPage").addEventListener("change", function(){
  var pageKeys=pageRows(filtered()).map(function(d){ return d["链接"]; });
  if(this.checked){ pageKeys.forEach(function(k){ state.selected.add(k); }); } else { pageKeys.forEach(function(k){ state.selected.delete(k); }); }
  syncSelUI(); renderTable(pageRows(filtered()));
});
document.getElementById("selectAllFiltered").addEventListener("click", function(){
  filtered().forEach(function(d){ state.selected.add(d["链接"]); }); syncSelUI(); renderAll();
});
document.getElementById("copySelected").addEventListener("click", function(){
  var items=DATA.filter(function(d){ return state.selected.has(d["链接"]); });
  if(!items.length) return;
  var text=items.map(function(d){ return d["标题"] + "：" + d["链接"]; }).join(String.fromCharCode(10));
  copyText(text, this);
});
document.getElementById("clearSel").addEventListener("click", function(){ state.selected.clear(); syncSelUI(); renderAll(); });
document.getElementById("search").addEventListener("input", function(e){ state.q=e.target.value; state.page=1; renderAll(); });
document.querySelectorAll(".viewtoggle button").forEach(function(b){ b.onclick=function(){
  state.view=b.dataset.view;
  state.page=1;
  document.querySelectorAll(".viewtoggle button").forEach(function(x){ x.classList.remove("active"); });
  b.classList.add("active"); renderAll();
}; });
document.getElementById("pageSize").addEventListener("change", function(e){
  var v=e.target.value; state.pageSize=(v==="all"?"all":parseInt(v,10)); state.page=1; renderAll();
});
document.getElementById("download").addEventListener("click", function(){
  var rows=filtered();
  var q=String.fromCharCode(34), nl=String.fromCharCode(10);
  var head=["标题","链接","类别","PC端链接"];
  var out=[head.join(",")];
  rows.forEach(function(d){
    out.push([d["标题"],d["链接"],d["类别"],d["PC端链接"]].map(function(v){
      return q + String(v==null?"":v).replace(new RegExp(q,"g"), q+q) + q;
    }).join(","));
  });
  var csv=out.join(nl);
  var blob=new Blob(["﻿"+csv], {type:"text/csv;charset=utf-8"});
  var a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download="RStata_课程与图表数据库索引.csv"; a.click();
});
renderStats(); renderTabs(); renderAll();
</script>
</body>
</html>'

# 注入数据并写出 index.html
html_out <- gsub("___DATA___", data_json, html_template, fixed = TRUE)
writeLines(html_out, "index.html")

# read_csv("RStata 课程与图表数据库索引.csv") %>% 
#   transmute(text = paste0("[", 标题, "](", 链接, ")")) %>% 
#   write_csv("RStata 课程&数据列表.csv")

lst$response$data %>% 
  transpose() %>% 
  as_tibble() %>% 
  select(title, hashid, price, create_time, subscribe) %>% 
  unnest() %>% 
  mutate(create_time = lubridate::ymd_hms(create_time)) %>% 
  filter(create_time >= ymd("2025-01-01")) %>% 
  arrange(desc(subscribe)) %>% 
  mutate(class = case_when(
    price == "1000.00" ~ "数据资料",
    price == "999.00" ~ "课程",
    price == "1800.00" ~ "名师讲堂",
    price == "2800.00" ~ "名师讲堂",
    price == "0.00" ~ "数据资料",
    price == "1199.00" ~ "课程",
    price == "2880.00" ~ "名师讲堂",
    price == "3060.00" ~ "名师讲堂",
    price == "2400.00" ~ "名师讲堂",
    T ~ "课程"
  )) %>% 
  select(-price) %>% 
  mutate(title = str_remove_all(title, "旧版本｜")) %>% 
  select(-subscribe) -> dfb 

# 系列课程订阅排行榜
dfb %>% 
  filter(class == "数据资料") %>% 
  select(title, create_time) %>% 
  set_names("课程名称", "创建时间") %>% 
  mutate(排名 = row_number()) %>% 
  select(排名, everything()) %>% 
  slice(1:100) %>% 
  kableExtra::kable()
  
dfb %>% 
  filter(class == "数据资料")

dfb %>% 
  write_csv("classdata.csv")

df %>% 
  select(标题) %>% 
  write_csv("可以年度更新的课程和数据.csv") 

df

file.copy("~/Documents/GitHub/tfsite/themes/navy/source/searchtable/RStata 课程&数据列表raw.csv", "~/Documents/global_dir/data.csv", overwrite = T)
