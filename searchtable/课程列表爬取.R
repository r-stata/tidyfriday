library(tidyverse)
library(httr)

cookies = c(
  `MEIQIA_TRACK_ID` = "2uwjhWis6wWgEwSUGqsQ3teS0Fd",
  `MEIQIA_VISIT_ID` = "2uwjhSyVvJv667t9zn2Kn6PenzN",
  `csrftoken` = "rIaB268ZCLJOLCzVIsc443gxrIDYsLwumKIreODOpfdlOXzzHTITCAFlSVAHpbH8",
  `Hm_lvt_64c33900b1f45b302e16a732efb245b6` = "1751873954",
  `Hm_lvt_8659756219f35439f2eecb18bd255656` = "1753341055,1753431479,1753462746,1753605722",
  `_clck` = "lmgvb6|2|fxz|0|1911",
  `tfstk` = "gwvtZOsMmDEtqDJOxhl3mHYyQgmHXXxZSF-7nZbgGeLp-hCXnGcwMZTw2s9GIhYKHeLTnEKqbi_XlEQDsXDkbhWVh4bxEYxNBMrpoFe1cMifcgFjx1TVBv2Fh40oK41-vQ6Xoe3bFXKC8iIbGsTbODIRftw1GRNQRw7Chiwb16tCqiw1fiTXADIARZ6fhE6IvilGb8_IfZwv66dpi7c9k-wXpGCItH_BeLicj1QeXwhjGpef6at1J-0MIaYRRgpIuPb2pH91qeM3BtKCDUB692w9khOyugTspPs913Kl9Ku7HMRB76j99mNC53_MW1d8RcQ2IFpA_LguLNOpLKBMtVelusOHQ_JiRRBWahXMGeibhZdCcgrpELUh9zbRm5iKvSPV1MSo32MJnPIRMMQoXzN4g6qFvamK_SPV1MSdrcH3gS53Y",
  `auid` = "40acac9675ab4a04b0d5da84f5a432dd",
  `ds_auth` = "eyJ1aWQiOjEwOTczNiwic2lkIjoiMDJiNzlqMWJkYmUxYjE2OGc0IiwicnQiOiI0NjNlZjk1MDFkOGE0ZjQyYjlmZDY2N2JlZmE0NGQ3ZCIsImV4cCI6MTc1Mzc1NTg5NX0.fCuGLYhMTw8e-Ft85w3QfKWLfJ2zY-O2bqqUBIfzNUk",
  `ds-csrf-token` = "eyJpdiI6IjZ5a25DQXg4ZDdmQlZlQzFRV0tDcWc9PSIsInZhbHVlIjoiVGhWTnU2VElFbm03SE96bzJZcUtKMkxLWmdTd1BQN0FjQzFJRkVTSW9zdFpIUjQyYmwxd1F4NjVDVzIwRUtNeGdXYStFc29zaThSbmZWd01pa0ptMWc9PSIsIm1hYyI6IjVlNmIwNTY3NzIxOGRjMjYzZjJlZmM1YTZhZWFhNWQ0ZjZjYmRkMWEyMDBhZWMwNWE3YmRlMGVjYjhiNjk1YmYifQ==",
  `deprecated_duanshu_session` = "eyJpdiI6IlZyZmR1SjU1bmVsNEdCQkJJbVNiM3c9PSIsInZhbHVlIjoicmNaM005eEtWUDhWTWFKb0cwQytBc2tER0FyRVl0Vm1VZVlxOTRKXC9zbFhCR0JhZktKTEx3cDV0VEpRVEtGNVJ6VGdicTBCZ0F3TUd2Rzk4ekZscUJnPT0iLCJtYWMiOiJiZDEyNGFkOGJjMWZiMDlmZjFiNmE5ODhiZWE4ZWFmYzc1NTJlNGM3MWUxMDgzNjIyODYwNmVhMTc4ZTAzM2JkIn0=",
  `_clsk` = "okqtdf|1753734299386|3|1|f.clarity.ms/collect"
)

headers = c(
  `accept` = "application/json, text/plain, */*",
  `accept-language` = "zh-CN,zh;q=0.9,en;q=0.8",
  `origin` = "https://my.duanshu.com",
  `priority` = "u=1, i",
  `referer` = "https://my.duanshu.com/",
  `sec-ch-ua` = '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
  `sec-ch-ua-mobile` = "?0",
  `sec-ch-ua-platform` = '"macOS"',
  `sec-fetch-dest` = "empty",
  `sec-fetch-mode` = "cors",
  `sec-fetch-site` = "same-site",
  `user-agent` = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  `x-shop` = "02b79j1bdbe1b168g4",
  `x-shop-platform` = "duanshu"
)

params = list(
  `page` = "1",
  `count` = "1000",
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
  mutate(hashid = paste0("https://rstata.duanshu.com/#/course/", hashid)) %>% 
  rename(链接 = hashid) %>% 
  select(title, 链接) %>% 
  writexl::write_xlsx("RStata 课程&数据列表（截止2025年7月29日）raw.xlsx")

df %>% 
  mutate(hashid = paste0("https://rstata.duanshu.com/#/course/", hashid)) %>% 
  rename(链接 = hashid) %>% 
  select(title, 链接) %>% 
  write_csv("RStata 课程&数据列表（截止2025年7月29日）raw.csv")

# readxl::read_xlsx("~/Desktop/RStata 课程&数据列表（截止2025年2月10日）.xlsx") -> df 

df

df %>% 
  arrange(标题) %>% 
  mutate(标题 = str_remove_all(标题, "名师讲堂｜"),
         标题 = str_replace_all(标题, "~", "～")) %>% 
  transmute(类别, text = paste0("[", 标题, "](", 链接, ")")) %>% 
  write_csv("RStata 课程&数据列表（截止2025年7月29日）.csv")

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

