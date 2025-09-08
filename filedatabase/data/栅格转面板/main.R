library(tidyverse)
library(sf)
library(terra)

rast("LISOTD_HRFC_V2.3.2015.nc") -> rst 

ncdf4::nc_open("LISOTD_HRFC_V2.3.2015.nc")
# HRFC_AREA：Grid Cell Area
# HRFC_COM_FR：Combined Flash Rate Climatology
# HRFC_LIS_DE：Applied LIS Detection Efficiency
# HRFC_LIS_FR：LIS Flash Rate Climatology

units(rst)

rst[[c(2, 3, 7)]] -> rst 

read_sf("2021行政区划/省.shp") %>% 
  select(-contains("类型")) %>% 
  st_make_valid() -> prov
read_sf("2021行政区划/市.shp") %>% 
  select(-contains("类型")) %>% 
  st_make_valid() -> city
read_sf("2021行政区划/县.shp") %>% 
  select(-contains("类型")) %>% 
  st_make_valid() -> county

terra::extract(rst, vect(prov), fun = mean, na.rm = T) %>% 
  as_tibble() -> provres 
terra::extract(rst, vect(city), fun = mean, na.rm = T) %>% 
  as_tibble() -> cityres 
terra::extract(rst, vect(county), fun = mean, na.rm = T) %>% 
  as_tibble() -> countyres 

# HRFC数据是基于星载光学瞬变探测器（OTD）和热带降雨测量任务（TRMM）卫星上的闪电成像传感器
# （LIS）监测得到的全球闪电总闪光频率构成的栅格数据，该数据反映了1995年5月至2014年12月的全球每年每
# 平方公里闪电发生次数的分布特征。数据来源参见https：//cmr.earthdata.nasa.gov/search/concepts/C1995863244-
#   GHRC_DAAC.html。

provres %>% 
  left_join(
    prov %>% 
      st_drop_geometry() %>% 
      mutate(ID = row_number())
  ) %>% 
  select(-ID) %>% 
  select(省, 省代码, everything()) -> provdf 

cityres %>% 
  left_join(
    city %>% 
      st_drop_geometry() %>% 
      mutate(ID = row_number())
  ) %>% 
  select(-ID) %>% 
  select(省, 省代码, 市, 市代码, everything()) -> citydf 

countyres %>% 
  left_join(
    county %>% 
      st_drop_geometry() %>% 
      mutate(ID = row_number())
  ) %>% 
  select(-ID) %>% 
  select(省, 省代码, 市, 市代码, 县, 县代码, everything()) -> countydf 

# save 
provdf %>% 
  haven::write_dta("各省份闪电频率数据.dta", label = "数据处理：微信公众号 RStata") 

citydf %>% 
  haven::write_dta("各城市闪电频率数据.dta", label = "数据处理：微信公众号 RStata") 

countydf %>% 
  haven::write_dta("各区县闪电频率数据.dta", label = "数据处理：微信公众号 RStata") 

rst

read_sf("2021行政区划/省.shp") %>% 
  st_transform(4326) -> prov
prov %>% 
  st_union() %>% 
  nngeo::st_remove_holes() %>% 
  st_sf() -> cnpoly

rst %>% 
  terra::crop(vect(prov)) %>% 
  terra::mask(vect(prov)) -> cnrst 

plot(cnrst$HRFC_COM_FR)

# cnrst %>% 
#   writeRaster("中国范围雷电频率栅格数据.tif") 

readr::read_csv("中国统计年鉴2024-电信主要通信能力.csv") %>% 
  mutate_all(as.numeric) %>% 
  select(-...6) -> df 

df %>% 
  mutate(全国长途光缆线路增长率 = (长途光缆线路长度_公里 - dplyr::lag(长途光缆线路长度_公里)) / 长途光缆线路长度_公里) %>% 
  select(年份, 全国长途光缆线路增长率) %>% 
  filter(!is.na(全国长途光缆线路增长率)) -> df 

provdf %>% 
  crossing(df) %>% 
  select(年份, everything()) %>% 
  mutate(HRFC_COM_FR_g = HRFC_COM_FR * 全国长途光缆线路增长率,
         HRFC_LIS_FR_g = HRFC_LIS_FR * 全国长途光缆线路增长率,
         HRFC_OTD_FR_g = HRFC_OTD_FR * 全国长途光缆线路增长率) -> provdf
citydf %>% 
  crossing(df) %>% 
  select(年份, everything()) %>% 
  mutate(HRFC_COM_FR_g = HRFC_COM_FR * 全国长途光缆线路增长率,
         HRFC_LIS_FR_g = HRFC_LIS_FR * 全国长途光缆线路增长率,
         HRFC_OTD_FR_g = HRFC_OTD_FR * 全国长途光缆线路增长率) -> citydf
countydf %>% 
  crossing(df) %>% 
  select(年份, everything()) %>% 
  mutate(HRFC_COM_FR_g = HRFC_COM_FR * 全国长途光缆线路增长率,
         HRFC_LIS_FR_g = HRFC_LIS_FR * 全国长途光缆线路增长率,
         HRFC_OTD_FR_g = HRFC_OTD_FR * 全国长途光缆线路增长率) -> countydf

provdf %>% 
  haven::write_dta("1995～2023年各省份雷击频率与长途光缆线路增长率交乘面板数据.dta", label = "数据处理：微信公众号 RStata") 
citydf %>% 
  haven::write_dta("1995～2023年各城市雷击频率与长途光缆线路增长率交乘面板数据.dta", label = "数据处理：微信公众号 RStata") 
countydf %>% 
  haven::write_dta("1995～2023年各区县雷击频率与长途光缆线路增长率交乘面板数据.dta", label = "数据处理：微信公众号 RStata") 


