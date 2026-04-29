library(tidyverse)
library(httr)

cookies = c(
  `csrftoken` = "2rbFhO9aBhcEYBUjz2K5kVexMcH2sED8OjT0hpemMw7nolwSrAqsF80qbk1n9BnD",
  `_clck` = "14y9qrz^2^g5m^0^2290",
  `Hm_lvt_8659756219f35439f2eecb18bd255656` = "1777301646,1777351533,1777459960,1777476901",
  `auid` = "77dd22d551274390b9aab03c8077f0d0",
  `_clsk` = "1a42ttr^1777479386442^4^1^b.clarity.ms/collect",
  `ds_auth` = "eyJ1aWQiOjEwOTczNiwic2lkIjoiMDJiNzlqMWJkYmUxYjE2OGc0IiwicnQiOiJkNmVjZGM0NzUxOWY0NTNjOTg2OTZkMzMwNTVmNDA4YyIsImV4cCI6MTc3NzUwMTEzNn0.xEW4uZnubjWaDzXoo-QSQpZ7cw6llRLYfXLGCPUNhhs",
  `ds-csrf-token` = "eyJpdiI6ImEwR1o3bDJYeVBmakVJNHZqdVdvdHc9PSIsInZhbHVlIjoicmk1T2RtSE9Iem1xdGdmTGlqZW43dXFOY1h3T2RKTkVMcG4xRTNCYU5KWUtcL1I0b1Z2MzdpQ0V1NFFQTytqRm4rUUxicCtrbGpHaEF6XC81aks1WWtcL0E9PSIsIm1hYyI6IjRiN2QyYzExZDU4MWVlODZkYjg0ZjBhMzFmMmNhYTNhZTIwNDMzZjM0NDdmZDhlZTRkYzIzOWFiZmUwNjk5ZjMifQ==",
  `deprecated_duanshu_session` = "eyJpdiI6IitxelZcL01kUHRscWxuSHlcLzltdVwvY2c9PSIsInZhbHVlIjoiSlwvNWpRcnczXC82REpsN05cL2NcL3c4SW9icGwxbFo2SURMXC80aGF6TzNFY3kyam5scEM2RUZXUERxQURFWjF4b3FmYWl2dmJIbHlTcURDcjBzNk5YME5KUT09IiwibWFjIjoiOWJmODgwOGFhMzYxZGMxY2YzOWI3ZjQyNGRjOGI2NGM5YTBjMTRhMGY4YTQ3Yzg2YThiODhiYmY4ZmI5ZmQwMyJ9"
)

headers = c(
  `accept` = "application/json, text/plain, */*",
  `accept-language` = "zh-CN,zh;q=0.9,en;q=0.8",
  `origin` = "https://my.duanshu.com",
  `priority` = "u=1, i",
  `referer` = "https://my.duanshu.com/",
  `sec-ch-ua` = '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
  `sec-ch-ua-mobile` = "?0",
  `sec-ch-ua-platform` = '"macOS"',
  `sec-fetch-dest` = "empty",
  `sec-fetch-mode` = "cors",
  `sec-fetch-site` = "same-site",
  `user-agent` = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
  `x-shop` = "02b79j1bdbe1b168g4",
  `x-shop-platform` = "duanshu"
)

params = list(
  `page` = "1",
  `count` = "1300",
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

lst$response$data %>% 
  transpose() %>% 
  as_tibble() %>% 
  select(title, status, price, hashid, create_time) %>% 
  unnest() %>% 
  mutate(create_time = ymd_hms(create_time)) %>% 
  filter(create_time >= ymd("2026-02-01")) %>% 
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

df
