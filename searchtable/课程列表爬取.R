library(tidyverse)
library(httr)

cookies = c(
  `csrftoken` = "LxWdbT3R7BZVYDgLURA27vB35bzUytXCIuHdFe5hE0EgEto1pPCbi05l4NfHhjc6",
  `_clck` = "ugm1eg^2^g4n^0^2267",
  `Hm_lvt_8659756219f35439f2eecb18bd255656` = "1774235618,1774238183,1774341581,1774405847",
  `auid` = "6bbc9f2b02d742c981e101122900f351",
  `user_info` = '{"id":109736,"name":"182****3720","source":"mobile","shop":{"id":"02b79j1bdbe1b168g4","version":"advanced2019","admin":1,"account_id":"4469b866d2b74021a47a4fcc46e79564","permission":[],"applet_version":"basic","is_promotion":0,"announce":0,"sms_status":"enough","is_obs":0,"is_online_live":0,"is_applet_refund":0,"is_version_expire":false}}',
  `tfstk` = "gPGSeqXzLDhV1rLJvg8VlUauyoPBpERwVwaKS2CPJ7F-OBEjXT8o8u7C9oi348P-8DaK4DDrZU0UJ6gQwJDzYurQO2m6uhRw_40utJKwbCk2hpZz_gBdeMSYHWzB6tTKF40utZ2l-UrxrB1de3zL9DFYHzz39yFLpENYSyVdwJCRHiE0JWFL26QADyUR9gELpEgYmyNLvDFplSE0JWEKvWhZLpUCFugWJGsBuRQkX4qf96hbkHqiPN5Ulb47ylg-N6CpWzw7X4EvVJeclJi7FjR5jzMx50zSxCfuwJM-B7hBfQNxSxo8lDK1doHsZXwZNh6g2bqnf7HXD_NLaAh_9W91rrlSkf2IZ31YVm0xQ7c9m6ituVlunXt1DkDzSSUSheBY2JIPP1r1b3BClRfQll8Xl9Xnv1XfvnQs6Y28ozgklEs7K8U0l5YXl9X3er47UETfVJf..",
  `ds_auth` = "eyJ1aWQiOjEwOTczNiwic2lkIjoiMDJiNzlqMWJkYmUxYjE2OGc0IiwicnQiOiI4NzBjZTE4OGYyY2I0ZWFlYjFkMmYyMGY2Yzg0MTQzYSIsImV4cCI6MTc3NDQ2NDMwNH0.mWPKzgO7kKudpchH0eEFfYigMyiQnag2RU3UfxqeTqw",
  `_clsk` = "10i4lf9^1774442705587^6^1^e.clarity.ms/collect",
  `ds-csrf-token` = "eyJpdiI6IkFpdUY5Mmh0a2k4XC9mZ0pJQUpXV1VnPT0iLCJ2YWx1ZSI6IitLWFk2Q1JXaGlmVzJSc0d4VDNRVlpTcFBLXC9JT0IraXhlUTNOTndHUGhUSGZoaFwvY1dmbEduZWoxVWZTOXpVdjdZeGRLcWl6RkhkOEJTK1M1NmdiV3c9PSIsIm1hYyI6ImNmZTRlZjMzMzNhZjMzYjQyODAzMDE1ZmY1MDJhNTEzMzJkZTZiZjE2ZTlkYjQzZmI2YjliNmRlOWNjNjQ4NDgifQ==",
  `deprecated_duanshu_session` = "eyJpdiI6IlJJZ2traVd6MzVFK0IybG1EdUIrZ2c9PSIsInZhbHVlIjoiN3NiWlN5cGdGWE4yYkxGQlloXC8wOUs4TVJJK1Byck9sZkU3dnFaNVpRRHh5cTY5WHFaRVJWbFVRVzVyVjkzTDFXTEdINFlcL0xXM1ZxMjYrWDNIS0xIUT09IiwibWFjIjoiMTkxZTQ5YWNjZGVmNDcxZTZjOWE3YWQ5ZGFiYmFiMWI4YjgxZjI5ZjQ4ZWYyNDMzMmFjMWZiM2I5Nzg3M2ZiMiJ9"
)

headers = c(
  `accept` = "application/json, text/plain, */*",
  `accept-language` = "zh-CN,zh;q=0.9,en;q=0.8",
  `origin` = "https://my.duanshu.com",
  `priority` = "u=1, i",
  `referer` = "https://my.duanshu.com/",
  `sec-ch-ua` = '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
  `sec-ch-ua-mobile` = "?0",
  `sec-ch-ua-platform` = '"macOS"',
  `sec-fetch-dest` = "empty",
  `sec-fetch-mode` = "cors",
  `sec-fetch-site` = "same-site",
  `user-agent` = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
  `x-shop` = "02b79j1bdbe1b168g4",
  `x-shop-platform` = "duanshu"
)

params = list(
  `page` = "1",
  `count` = "1200",
  `status` = "2"
)

res <- httr::GET(url = "https://api.duanshu.com/admin/content/course/lists", httr::add_headers(.headers=headers), query = params, httr::set_cookies(.cookies = cookies))

content(res) -> lst
lst$response$data %>% 
  transpose() %>% 
  as_tibble() %>%
  select(title, status, price, hashid) %>% 
  unnest() -> df

df 

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
         PC端链接 = paste0("<a target=\"_blank\" href=\"", PC端链接, "\">PC端链接</a>")) %>% 
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
                    list(visible = FALSE, targets = c(1))  # 隐藏第2列和第4列（索引从0开始）
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
  ) %>% 
  htmlwidgets::saveWidget("index.html", title = "RStata 课程与图表数据库索引") 

# 读取原始 HTML 文件
html_content <- readLines("index.html")

# 在 </head> 前插入 favicon
modified_content <- sub(
  "</head>",
  '<link rel="icon" href="https://tidyfriday.cn/images/pad.svg">\n</head>',
  html_content
)

# 保存修改后的文件
writeLines(modified_content, "index.html")

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
