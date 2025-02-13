library(tidyverse)
library(httr)

cookies = c(
  csrftoken = "ykrK4l2g1XpJGZlfIOYJ6SWVqhlyqSEtz7eUBCQ1KZkBRseC7qZa1YwfsFnE9ZqF",
  Hm_lvt_64c33900b1f45b302e16a732efb245b6 = "1737184886",
  `_clck` = "v6tgnj|2|fte|0|1841",
  tfstk = "gezrbyN_h22bSBaPKj0e7i1jZD0RZ2yFC44ItXVL9BDor7_30RFNwDM7Req4K-nSET3W-DV3QYm52WgeLRMYPYGSAvYUk88WRyPp8XV3p_HCwiN8w23hCOgF57FJC1wBUzkomSVx_3chc0VqiF3RCO_1lrIf56B_FSfdrilKnbcnEvfqifhE-Xco-skmTfKHEJ0hgslI6bxox2ADofho-v2n-sPmHXcCMmoNufmltNkk_NLdsEk_Zx8H-zbKuARnpjHuuborImD2-bzqa0kgNza9wRlUjPo8IttSElrTQfw5oUyaZ8rijzvc32FbbJlar1xZL8F0Pm4lOhhxJuqiryWwESNgZoqgZttqgoV7umaGQeo8m8EtYy6fW4Z_1yngraJthchUQ4qVnUyG4ZpKibfgJuJHY0cxgA1VgDp3rmfcYg5MvHn0djk1w7Kpv0mrgA1VgHKKm4cqC_FR.",
  Hm_lvt_8659756219f35439f2eecb18bd255656 = "1739356202,1739360112,1739377866,1739440881",
  auid = "ea8999af8f734bfb9a44695d235906f3",
  ds_auth = "eyJ1aWQiOjEwOTczNiwic2lkIjoiMDJiNzlqMWJkYmUxYjE2OGc0IiwicnQiOiJmNjAyYTUwOTc3MzA0NzE0YTgwZjIyZTIxMDYyN2Q2MCIsImV4cCI6MTczOTQ4ODAyMH0.HHiuyw2Z6Zty9kUrrJnOPgte02oYqKRCFr7dv3mC4wA",
  `_clsk` = "1bswyqw|1739466421715|8|1|s.clarity.ms/collect",
  `ds-csrf-token` = "eyJpdiI6IkRTbTJxdFRMV2pRTG16ejR3Y1ZKWkE9PSIsInZhbHVlIjoiZ0l3Z3FzTjJqZWlXSkVqU20yXC9aNFYreFJBMkNPOTdOcGVDMnZnRzhHMXdxT1wvbGxlN0FXbVgzdVdjN3FYYzdZWVh2VkJ5QmNORWdrbmxnRGtyTVl3Zz09IiwibWFjIjoiNzM2YTFlYTJkYzEyYTNmYzVhYjQ0YTViNGE1YjY0YTYwNTg3OWMwODA0MWM0Y2U5YzgyNjJkZTNlMDYwY2I4NCJ9",
  deprecated_duanshu_session = "eyJpdiI6Ijh5YXkyRUJKeFRsWTNuejBnazhKNlE9PSIsInZhbHVlIjoiN0ViWlh5c3NoVXR2TGFsSUhReVJoMWVDaFpEZXJ1ZDlyN2RTd0dMK2xFMlQ0bmVGQ3ZFeUNIRU5YVjJzR0JoV0d6dnAyMHRuSGM0NDIycHlKVFdCR2c9PSIsIm1hYyI6IjIyMTI4YWE5YTU1ODUzZGQ3YzZhMTdiZDgyNWVhNWVlMmJkM2VjNGE5YjJhM2ExZTgyNTBiMmY5MzczMjgzYTUifQ=="
)

headers = c(
  accept = "application/json, text/plain, */*",
  `accept-language` = "zh-CN,zh;q=0.9,en;q=0.8",
  origin = "https://my.duanshu.com",
  priority = "u=1, i",
  referer = "https://my.duanshu.com/",
  `sec-ch-ua` = '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
  `sec-ch-ua-mobile` = "?0",
  `sec-ch-ua-platform` = '"macOS"',
  `sec-fetch-dest` = "empty",
  `sec-fetch-mode` = "cors",
  `sec-fetch-site` = "same-site",
  `user-agent` = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
  `x-shop` = "02b79j1bdbe1b168g4",
  `x-shop-platform` = "duanshu"
)

params = list(
  `page` = "1",
  `count` = "1000"
)

res <- httr::GET(url = "https://api.duanshu.com/admin/content/course/lists", httr::add_headers(.headers=headers), query = params, httr::set_cookies(.cookies = cookies))

content(res) -> lst
lst$response$data %>% 
  transpose() %>% 
  as_tibble() %>%
  select(title, status, price, hashid) %>% 
  unnest() -> df

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
  
df %>% 
  writexl::write_xlsx("RStata 课程&数据列表（截止2025年2月14日）.xlsx")

df %>% 
  write_csv("RStata 课程&数据列表（截止2025年2月14日）.csv")

# readxl::read_xlsx("~/Desktop/RStata 课程&数据列表（截止2025年2月10日）.xlsx") -> df 

df

df %>% 
  mutate(标题 = str_remove_all(标题, "名师讲堂｜"),
         标题 = str_replace_all(标题, "~", "～")) %>% 
  transmute(类别, text = paste0("[", 标题, "](", 链接, ")")) %>% 
  write_csv("RStata 课程&数据列表（截止2025年2月14日）.csv")

df %>% 
  mutate(标题 = str_remove_all(标题, "名师讲堂｜"),
         标题 = str_replace_all(标题, "~", "～")) %>% 
  select(-类别) %>% 
  mutate(PC端链接 = str_replace_all(链接, "https://rstata.duanshu.com/#/course/", "https://rstata-pc.duanshu.com/course/detail/"),
         链接 = paste0("<a target=\"_blank\" href=\"", 链接, "\">手机端链接</a>"),
         PC端链接 = paste0("<a target=\"_blank\" href=\"", PC端链接, "\">PC端链接</a>")) %>% 
  DT::datatable(width = "100%", height = "400px",
                rownames = FALSE, # 去除表头
                filter = "top", # 在顶部添加过滤控件
                escape = F,
                options = list(
                  autoWidth = TRUE,
                  pageLength = 10, # 每页显示的数量
                  initComplete = htmlwidgets::JS(
                    "function(settings, json) {",
                    "$(this.api().table().container()).css({'font-family': 'SourceHanSerifSC-Medium'});",
                    "}")
                )
  ) %>% 
  htmlwidgets::saveWidget("index.html")
