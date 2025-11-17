library(tidyverse)
library(httr)

cookies = c(
  `csrftoken` = "TCXl9eLlKj4Hqohb3W6AUmZB7UhOTBKw1eDa29p2InmOMN6EnQm5jvEqBwv4DSeX",
  `Hm_lvt_8659756219f35439f2eecb18bd255656` = "1761884585,1762910243,1763088691,1763355233",
  `HMACCOUNT` = "0B0195781314D665",
  `auid` = "9363d2bace65408db55eb2afdcb2ab79",
  `_clck` = "1hicyki^2^g13^0^2048",
  `user_info` = '{"id":109736,"name":"182****3720","source":"mobile","shop":{"id":"02b79j1bdbe1b168g4","version":"advanced2019","admin":1,"account_id":"4469b866d2b74021a47a4fcc46e79564","permission":[],"applet_version":"basic","is_promotion":0,"announce":0,"sms_status":"enough","is_obs":0,"is_online_live":0,"is_applet_refund":0,"is_version_expire":false}}',
  `tfstk` = "g9bxoTAcs7hxrxkqMOquj1vjhgFk7ufVat5ISdvmfTBREsK1SIqVXd6V9h_DosXJBT1psqV2lFK1TtQDSS8XBOChsqj0chA_WO65mG8DjNBRpOmfoRP2P4TVri0Mn-8O19YTKJ43-s52bFw3KpNmC7T26cOXCA07PIY9GCXKSq127FwkdZxsqsWDmU995FNJPCdKfF9XG4NJsIi65KtsF0OBFdT1CdtWPCdIfq91C_NJ_L965F66P7dwFdT65fuERLNXCVIq2hcTB4USWVQJMnptSK0Oca0HXp1XeVwCyIHwds9-5VpLBRMA1OwtSesFeNKCQP3yo6IWPII8109Xvi6DaOUKlK_RGZ9cl80DhZ55xNX71V9OVMte9aNbAnsFnMtRr-3ydg1Rs3Iz_mvGYC6wYN2EuK11TwSHJPh9wMCWygSf-wKXovvpsmN8wcowcQojNzpVm1mBgQp3MviZb3cywpV80cowcQRJKSUobc-oa",
  `Hm_lpvt_8659756219f35439f2eecb18bd255656` = "1763355505",
  `_clsk` = "1nelhw0^1763357241715^13^1^v.clarity.ms/collect",
  `ds_auth` = "eyJ1aWQiOjEwOTczNiwic2lkIjoiMDJiNzlqMWJkYmUxYjE2OGc0IiwicnQiOiJkZjUxZWI2NzdlMGY0YTJmODBhZjVmZDI0ZmYxZTQwMSIsImV4cCI6MTc2MzM3ODg0MX0.1MbEFc_YH2qSmMflCgshaKTZxcH_Pyv9HnD1y6InI_0",
  `ds-csrf-token` = "eyJpdiI6IlVRSG92UlhFXC9RNjBHa1NCaUJwWk1RPT0iLCJ2YWx1ZSI6Ik9pY1FFMkRPaEZuS3BBWEQzWjhMT2dnK3NjQ2dqMnVya2craXNpMDQrY0crNWZ3NHdaK0tadnZORG5Bam1EMk9aK1wvYkdUeHFBdWQ5Yk9qb2paNnY0Zz09IiwibWFjIjoiZWM3OWEyMDUzNTViZDNmM2U5ZjUxNzZiNmRlNjVhMGU0ZmExZTRlMjg0ZmM5MzVmMWNmNDA5MTU3NGE0OGVlNyJ9",
  `deprecated_duanshu_session` = "eyJpdiI6IkZhakloMkhscFdIaWVrTFwvb002ZVVnPT0iLCJ2YWx1ZSI6Ikg3OFI1YTRGSEtETSsraXNVTis5TVZXcEJFQm5oaHNUNkt3SlwvVnQ4elwvbEdVNzRONENLVEZWaXZlRnJ0aHpXWU80MjZlaGloWlpUNENDdFRoZVpwUmc9PSIsIm1hYyI6IjZmMGFhOTkyM2VmNDcyZjQ0YTE3MzQxNmJiMmVhMzE0NmI2N2NiODk0MmNjY2Q2NmI5MTY5ZWExYzFjOGEwMGMifQ=="
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
