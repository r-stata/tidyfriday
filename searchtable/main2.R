library(tidyverse)
library(httr)

cookies = c(
  `csrftoken` = "TCXl9eLlKj4Hqohb3W6AUmZB7UhOTBKw1eDa29p2InmOMN6EnQm5jvEqBwv4DSeX",
  `Hm_lvt_8659756219f35439f2eecb18bd255656` = "1767595107,1768538983,1769509901",
  `auid` = "c21feebee3bc4a0db2abb5cf817d407b",
  `_clck` = "1hicyki^2^g37^0^2048",
  `user_info` = '{"id":109736,"name":"182****3720","source":"mobile","shop":{"id":"02b79j1bdbe1b168g4","version":"advanced2019","admin":1,"account_id":"4469b866d2b74021a47a4fcc46e79564","permission":[],"applet_version":"basic","is_promotion":0,"announce":0,"sms_status":"enough","is_obs":0,"is_online_live":0,"is_applet_refund":0,"is_version_expire":false}}',
  `tfstk` = "gnnqmWMINlcSxOOnLvqwY1ze7pZx5lRQicN_IADghSVmhZgzQvGa5ii_h4PZZbPmcowbS5cQwr9xCECNb7cTGZa_GGJ-GAIs_ApYI5ci_5gXPHMxHlEMO5-BAxh-Flang-qgZd2L3-v7ohyupoqMOBtSHUs9IlDXGnyTrYV8QRbcmf2lqRFuntVms74uKJ10jlcMU72Ld1bGj5xkqJPuslqisYvzC720jlciELyt_MUz83y3oKcMe1wWrp40txVPjMWLhrvshNsFYb24ucDYaRyZ4-z4OPvE3pmEKxmLQcph75kKojw-_HRzqmlqmzrwbgEjL4c4zqRN4z3opc4ryB7Kpxcq-ymD4LZiofr0acpOXS0jIcaZmBX_imhj4ynOgQNsRYi0zXA54fUZo2qmbB-l4e5TEnt-Xq5G7r28UW9yUJwziEoHvAkFWNUo18PBHxQOWr47UW9yUNQTro2zOKHA.",
  `ds_auth` = "eyJ1aWQiOjEwOTczNiwic2lkIjoiMDJiNzlqMWJkYmUxYjE2OGc0IiwicnQiOiIyZjJhYmE0NmJjYTc0NzgzOTAxMWZkOGZiYjU1ZTFhMSIsImV4cCI6MTc2OTk2MDM3NH0.Dkxk9n0tzwU0nkkf1GNrg4MSAzsBy12odLK0i_CjRnw",
  `_clsk` = "1ds8lnn^1769938775392^7^1^i.clarity.ms/collect",
  `ds-csrf-token` = "eyJpdiI6IiswZ21Rc0RXaHFJdzVqeHlqWGhKdnc9PSIsInZhbHVlIjoibEI2TjRUcWhzMCtHZFNsZ0dVaG1pdkRFeGFpZU9xWGRPOW44cFNsTEJ6VjdKSmZHelVXUFRnaGRld1wvdko4WjhXSFI0M1pYUmxjU2RRa3BxcktBY1ZBPT0iLCJtYWMiOiIxM2U3MDk1ZDYwNGY5NGQ5YjY0MDJlNzg4ZDhmM2FlNmM3OWFjNTQ5Y2QzNDM0NGQxMDI1MjNmNTk2MjI3YTdjIn0=",
  `deprecated_duanshu_session` = "eyJpdiI6IlBwU1dWNVY2V2ZCcDZscnF1QlhyRkE9PSIsInZhbHVlIjoiOWZza25VMHV0d1ZFaWNhUzdPbno1N0NGcWlWd2l1ZGZXV2NrcnVnZnJUWm9vaXI3NUNZK2h4b2FTdUxOYzQ0VStWTUVCU3N3bUxzMUZxbVJcLzBuTGx3PT0iLCJtYWMiOiI5YzVhMWUzZDNiODExZjcyZTdiNDJkOTBjZGMxOGQzZWU3NzQ3MjllYWE5ZmQ4OGRhZGQ3MzIyZWQyNmQxMDEyIn0="
)

headers = c(
  `accept` = "application/json, text/plain, */*",
  `accept-language` = "zh-CN,zh;q=0.9",
  `origin` = "https://my.duanshu.com",
  `priority` = "u=1, i",
  `referer` = "https://my.duanshu.com/",
  `sec-ch-ua` = '"Chromium";v="135", "Not-A.Brand";v="8"',
  `sec-ch-ua-mobile` = "?0",
  `sec-ch-ua-platform` = '"macOS"',
  `sec-fetch-dest` = "empty",
  `sec-fetch-mode` = "cors",
  `sec-fetch-site` = "same-site",
  `user-agent` = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  `x-shop` = "02b79j1bdbe1b168g4",
  `x-shop-platform` = "duanshu"
)

params = list(
  `page` = "1",
  `count` = "100",
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
  mutate(hashid = paste0("https://rstata.duanshu.com/#/course/", hashid)) %>% 
  rename(链接 = hashid) %>% 
  set_names("标题", "链接", "类别") -> df 

df

df %>% 
  mutate(标题 = str_remove_all(标题, "名师讲堂｜"),
         标题 = str_replace_all(标题, "~", "～")) %>% 
  transmute(类别, text = paste0("[", 标题, "](", 链接, ")")) %>% 
  write_csv("RStata 课程&数据列表new.csv")
