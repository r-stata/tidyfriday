library(tidyverse)
library(sf)

# 中国地图通常使用这样的坐标系
mycrs <- "+proj=aea +lat_0=0 +lon_0=105 +lat_1=25 +lat_2=47 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs" 

# 1. 带小地图版本

# 读取小地图版本的中国省级地图
read_sf("provmapdata/minishp/chinaprov2019mini/chinaprov2019mini.shp") %>% 
  filter(!is.na(省代码)) -> provmap

# 线条
read_sf("provmapdata/minishp/chinaprov2019mini/chinaprov2019mini_line.shp") %>% 
  filter(class %in% c("九段线", "海岸线", "小地图框格")) %>% 
  select(class) -> provlinemap

# 在地图上添加散点图，这里以瞪羚企业分布为例：
readxl::read_xlsx("瞪羚、独角兽、创新型企业经纬度数据.xlsx") %>% 
  filter(!is.na(经度)) -> pointdf 

# 转换成 sf 对象
pointdf %>% 
  st_as_sf(coords = c("经度", "纬度"), crs = 4326) %>% 
  st_transform(mycrs) -> pointdfsf 

# 小地图上的点
# 小地图的范围
small_bbox <- st_bbox(c(xmin = 120000, 
                        xmax = 1766004.1,
                        ymax = 2557786.0,
                        ymin = 320000), 
                      crs = st_crs(mycrs)) %>% 
  st_as_sfc()

# 提取这个范围的点
pointdfsf %>% 
  st_intersection(small_bbox) -> pointdfsf_small

# 把这些点移动到小地图的位置
pointdfsf_small %>% 
  mutate(geometry = geometry * 0.5 + c(2100000, 1665139)) %>% 
  sf::st_set_crs(mycrs) -> pointdfsf_small 

# 合并两部分
bind_rows(pointdfsf, pointdfsf_small) -> pointdfsfall 

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
               "海岸线" = "#0055AA",
               "小地图框格" = "black")
  ) + 
  scale_linewidth_manual(
    values = c("九段线" = 0.6,
               "海岸线" = 0.3,
               "小地图框格" = 0.3)
  ) + 
  new_scale_color() + 
  geom_sf(data = pointdfsfall, aes(color = 省), 
          size = 0.5, show.legend = F) + 
  scale_color_manual(values = paletteer::paletteer_d("ggsci::default_igv", n = 32)) + 
  annotation_scale(location = "bl", 
                   width_hint = 0.3, 
                   text_family = cnfont) + 
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
  ) -> p1 

ggsave("pic1.pdf", width = 10, height = 8.5, device = cairo_pdf) 
ggsave("pic1.png", width = 10, height = 8.5, device = png) 

# 绘制填充地图

# 读取 2021 年城市地图
read_sf("citymapdata/minishp/chinacity2021mini/chinacity2021mini.shp") %>% 
  filter(!is.na(省代码)) -> citymap 

# 在市级地图上强调省级边界
read_sf("provmapdata/minishp/chinaprov2021mini/chinaprov2021mini_line.shp") %>% 
  filter(class %in% c("九段线", "海岸线", "小地图框格", "省份")) %>% 
  select(class) -> provlinemap 

# 统计每个城市的公司数量
pointdf %>% 
  count(市, 市代码) -> citydf 

# 和地图数据合并
citymap %>% 
  left_join(citydf) %>% 
  mutate(n = if_else(is.na(n), 0, n)) -> citymap2 

# 绘图
citymap2 %>% 
  mutate(n = n + 1) %>% 
  ggplot() + 
  geom_sf(aes(fill = n), color = "gray", linewidth = 0.01) + 
  geom_sf(data = provlinemap, 
          aes(color = class, linewidth = class),
          show.legend = F) + 
  scale_color_manual(
    values = c("九段线" = "#A29AC4",
               "海岸线" = "#0055AA",
               "小地图框格" = "black",
               "省份" = "black")
  ) + 
  scale_linewidth_manual(
    values = c("九段线" = 0.6,
               "海岸线" = 0.3,
               "小地图框格" = 0.3,
               "省份" = 0.3)
  ) + 
  scico::scale_fill_scico(palette = "acton", 
                          name = "公司数量", 
                          trans = "log10") + 
  new_scale_color() + 
  geom_sf(data = pointdfsfall, aes(color = 省), 
          size = 0.1, show.legend = F) + 
  stat_sf_coordinates(data = provmap,
                      geom = "text", color = "gray",
                      aes(label = 省), family = cnfont,
                      fun.geometry = st_point_on_surface,
                      size = 3) + 
  scale_color_manual(values = paletteer::paletteer_d("ggsci::default_igv", n = 32)) + 
  annotation_scale(location = "bl", 
                   width_hint = 0.3, 
                   text_family = cnfont) + 
  labs(title = "瞪羚、独角兽、创新型企业地理分布",
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
  ) -> p2

ggsave("pic2.png", width = 10, height = 8.5, device = png)    

# 使用分段填色
citymap2$n %>% 
  quantile(probs = 1:10/10, digits = 1) %>% 
  as.integer() %>% 
  unique() -> cutlist

cutlist

citymap2 %>% 
  mutate(group = cut(n, breaks = unique(cutlist), 
                     include.lowest = T,
                     labels = c("<= 1", "1～3", "3～9", "9～18",
                                "19～39", "39～92", ">= 92"))) -> citymap3

citymap3 %>% 
  ggplot() + 
  geom_sf(aes(fill = group), color = "gray", linewidth = 0.01) + 
  geom_sf(data = provlinemap, 
          aes(color = class, linewidth = class),
          show.legend = F) + 
  scale_color_manual(
    values = c("九段线" = "#A29AC4",
               "海岸线" = "#0055AA",
               "小地图框格" = "black",
               "省份" = "black")
  ) + 
  scale_linewidth_manual(
    values = c("九段线" = 0.6,
               "海岸线" = 0.3,
               "小地图框格" = 0.3,
               "省份" = 0.3)
  ) + 
  scico::scale_fill_scico_d(palette = "acton", 
                            name = "公司数量", 
                            end = 0.95) + 
  new_scale_color() + 
  geom_sf(data = pointdfsfall, aes(color = 省), 
          size = 0.1, show.legend = F) + 
  scale_color_manual(values = paletteer::paletteer_d("ggsci::default_igv", n = 32)) + 
  annotation_scale(location = "bl", 
                   width_hint = 0.3, 
                   text_family = cnfont) + 
  labs(title = "瞪羚、独角兽、创新型企业地理分布",
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
  ) + 
  theme(legend.position = c(0.12, 0.2)) + 
  guides(fill = guide_legend(ncol = 2)) -> p3 

ggsave("pic3.png", width = 10, height = 8.5, device = png) 

# 栅格数据
# 高分辨率数据
library(raster)
raster("cn2022.tif") -> cn2022
cn2022 %>% 
  aggregate(fact = 10, fun = mean) %>% 
  rasterToPoints(spatial = TRUE) %>% 
  st_as_sf() -> cn2022points 

cn2022points %>% 
  st_transform(mycrs) -> cn2022points

# 提取小地图内的点
cn2022points %>% 
  st_intersection(small_bbox) -> cn2022points_small 

# 移动小地图内的点到恰当位置：
cn2022points_small %>% 
  mutate(geometry = geometry * 0.5 + c(2100000, 1665139)) %>% 
  sf::st_set_crs(mycrs) -> cn2022points_small 

# 合并两个部分
bind_rows(cn2022points, cn2022points_small) -> cn2022points_all 

# 绘图
read_sf("provmapdata/minishp/chinaprov2019mini/chinaprov2019mini_line.shp") %>% 
  filter(class %in% c("九段线", "海岸线", "小地图框格")) %>% 
  select(class) -> provlinemap

ggplot(provmap) + 
  geom_sf(data = cn2022points_all, aes(color = cn2022), 
          size = 0.01, show.legend = F) + 
  scico::scale_color_scico(
    palette = "lajolla",
    direction = -1,
    trans = "log10"
  ) + 
  new_scale_color() + 
  geom_sf(fill = NA, color = "gray", linewidth = 0.01) + 
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
               "海岸线" = "#0055AA",
               "小地图框格" = "black")
  ) + 
  scale_linewidth_manual(
    values = c("九段线" = 0.6,
               "海岸线" = 0.3,
               "小地图框格" = 0.3)
  ) + 
  annotation_scale(location = "bl", 
                   width_hint = 0.3, 
                   text_family = cnfont) + 
  labs(title = "2022 年中国夜间灯光地图",
       subtitle = "数据处理&绘制：微信公众号 RStata",
       caption = "数据来源：An extended time-series (2000-2020) of global NPP-VIIRS-like nighttime light data - Harvard Dataverse\nhttps://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/YGIVCD") + 
  theme(axis.title.x = element_blank(),
        axis.title.y = element_blank()) + 
  annotation_north_arrow(
    location = "tr", 
    which_north = "false",
    pad_y = unit(0.1, "cm"), 
    style = north_arrow_fancy_orienteering(
      text_family = cnfont
    ) 
  ) -> p4

ggsave("pic4.png", width = 10, height = 8.5, device = png)

# 低分辨率
raster("NH3_em_anthro_2015_sector_ENE.tif") %>% 
  rasterToPolygons() %>% 
  st_as_sf() -> cn2022polygons 

cn2022polygons %>% 
  st_transform(mycrs) -> cn2022polygons

# 提取小地图内的点
cn2022polygons %>% 
  st_intersection(small_bbox) -> cn2022polygons_small 

# 移动小地图内的点到恰当位置：
cn2022polygons_small %>% 
  mutate(geometry = geometry * 0.5 + c(2100000, 1665139)) %>% 
  sf::st_set_crs(mycrs) -> cn2022polygons_small 

# 合并两个部分
bind_rows(cn2022polygons, cn2022polygons_small) -> cn2022polygons_all 

# 提取中国范围的
cn2022polygons_all %>% 
  st_intersection(provmap) -> cn2022polygons_all 

cn2022polygons_all$NH3_em_anthro_2015_sector_ENE -> numlist
range(log10(numlist), na.rm = T, finite = T) -> rlist
10^(mean(rlist)) -> median 
10^(rlist[1] + 0.02 * (rlist[2] - rlist[1])) -> min
10^(rlist[2] - 0.02 * (rlist[2] - rlist[1])) -> max 

min;median;max 

ggplot(provmap) + 
  geom_sf(data = cn2022polygons_all, 
          aes(fill = NH3_em_anthro_2015_sector_ENE), 
          linewidth = 0.001) + 
  scico::scale_fill_scico(
    palette = "imola", trans = "log10",
    direction = -1, 
    breaks = c(min, median, max), 
    labels = c("低", latex2exp::TeX("$\\leftarrow$ NH3 排放($kg/m^2/yr$) $\\rightarrow$"), "高"),
    name = "2015 年各地能源开采部门",
    guide = guide_colorbar(
      direction = "horizontal",
      barheight = unit(3, units = "mm"),
      barwidth = unit(60, units = "mm"),
      draw.ulim = FALSE,
      ticks.colour = "transparent",
      title.position = 'top',
      title.hjust = 0.5,
      label.hjust = 0.5
    )
  ) +  
  new_scale_color() + 
  geom_sf(fill = NA, color = "gray", linewidth = 0.01) + 
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
               "海岸线" = "#0055AA",
               "小地图框格" = "black")
  ) + 
  scale_linewidth_manual(
    values = c("九段线" = 0.6,
               "海岸线" = 0.3,
               "小地图框格" = 0.3)
  ) + 
  annotation_scale(location = "bl", 
                   width_hint = 0.3, 
                   text_family = cnfont) + 
  labs(title = latex2exp::TeX("各地区 $NH_{3}$ 排放分布(单位：$kg/m^2/yr$)"), 
       subtitle = "数据处理&绘制：微信公众号 RStata",
       caption = "数据来源：中国历史空气污染物排放数据集（1990-2015 逐年）\n<https://zenodo.org/record/4741285>") + 
  theme(axis.title.x = element_blank(),
        axis.title.y = element_blank()) + 
  annotation_north_arrow(
    location = "tr", 
    which_north = "false",
    pad_y = unit(0.1, "cm"), 
    style = north_arrow_fancy_orienteering(
      text_family = cnfont
    ) 
  ) + 
  theme(legend.position = c(0.15, 0.12)) -> p5 

ggsave("pic5.png", width = 10, height = 8.5, device = png)
