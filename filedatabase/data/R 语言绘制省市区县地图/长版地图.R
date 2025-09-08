library(tidyverse)
library(sf)

# 中国地图通常使用这样的坐标系
mycrs <- "+proj=aea +lat_0=0 +lon_0=105 +lat_1=25 +lat_2=47 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs" 

# 长版地图

# 读取小地图版本的中国省级地图
read_sf("provmapdata/longshp/chinaprov2019long/chinaprov2019long.shp") %>% 
  filter(!is.na(省代码)) -> provmap

# 线条
read_sf("provmapdata/longshp/chinaprov2019long/chinaprov2019long_line.shp") %>% 
  filter(class %in% c("九段线", "海岸线")) %>% 
  select(class) -> provlinemap

# 在地图上添加散点图，这里以瞪羚企业分布为例：
readxl::read_xlsx("瞪羚、独角兽、创新型企业经纬度数据.xlsx") %>% 
  filter(!is.na(经度)) -> pointdf 

# 转换成 sf 对象
pointdf %>% 
  st_as_sf(coords = c("经度", "纬度"), crs = 4326) %>% 
  st_transform(mycrs) -> pointdfsf 

# 范围
st_bbox(provmap) 

# 绘图
library(ggspatial) 
library(ggnewscale) 
ggplot(provmap) + 
  geom_sf(fill = "white", color = "gray", linewidth = 0.01) + 
  geom_sf(data = provlinemap, 
          aes(color = class, linewidth = class),
          show.legend = F) + 
  stat_sf_coordinates(data = provmap,
                      geom = "text", color = "gray",
                      aes(label = 省), family = cnfont,
                      fun.geometry = st_point_on_surface,
                      size = 3) + 
  scale_color_manual(
    values = c("九段线" = "#A29AC4",
               "海岸线" = "#0055AA")
  ) + 
  scale_linewidth_manual(
    values = c("九段线" = 0.6,
               "海岸线" = 0.3)
  ) + 
  new_scale_color() + 
  geom_sf(data = pointdfsf, aes(color = 省), 
          size = 0.5, show.legend = F) + 
  scale_color_manual(values = paletteer::paletteer_d("ggsci::default_igv", n = 32)) + 
  annotation_scale(location = "bl", 
                   width_hint = 0.3, 
                   text_family = cnfont) + 
  coord_sf(xlim = c(-2625585.8, 2206964.7) * 1.2) + 
  labs(title = "瞪羚、独角兽、创新型企业的地理分布",
       subtitle = "数据爬取&绘制：微信公众号 RStata",
       caption = "数据来源：瞪羚云网站") + 
  theme(axis.title.x = element_blank(),
        axis.title.y = element_blank()) + 
  annotation_north_arrow(
    location = "tr", 
    which_north = "false",
    pad_y = unit(0.1, "cm"), 
    style = north_arrow_fancy_orienteering(
      text_family = cnfont
    ) 
  ) -> p6 

ggsave("pic6.png", width = 8, height = 9, device = png) 
