use 各城市闪电频率数据.dta, clear 
merge 1:1 省 省代码 市 市代码 using chinacity2021mini_db.dta
keep if _m == 3
drop _m 

/* revstr "215 48 39" "252 141 89" "254 224 139" "255 255 191" "217 239 139" "145 207 96" "26 152 80"
local colorlist = r(revstr) */

nicecut HRFC_COM_FR, n(8) unit(" ") format("%6.2f")
grmap HRFC_COM_FR using chinacity2021mini_coord.dta, ///
	id(ID) osize(vvthin ...) ocolor(white ...) ///
	clmethod(custom) clbreaks(`r(cutpoints)') /// 
    fcolor(gray "239 235 233" "215 204 200" "188 170 164" "161 136 127" "141 110 99" "121 85 72" "109 76 65") /// 
    graphr(margin(medium)) ///
    leg(order(`r(legorder)')) /// 
	line(data(chinaprov2021mini_line_coord2.dta) by(group) ///
		size(vvthin *1 *0.5 *0.5 *0.5) pattern(solid ...) ///
		select(drop if inlist(group, 4, 7)) ///
		color(gs20 /// 省界颜色 
			  black /// 国界线颜色 
			  "0 85 170" /// 海岸线颜色 
			  black /// 小地图框格颜色
			  black /// 比例尺和指北针颜色
			  )) /// 
	polygon(data(polygon2) fcolor(black) /// 
		osize(vvthin)) /// 
	label(data(chinacity2021mini_label2) x(X) y(Y) label(cname) length(20) size(*0.8)) /// 
	ti("各城市闪电频率数据（次/平方公里/年）") /// 
	subti("数据整理 & 绘制：微信公众号 RStata") ///
	caption("数据来源：https://cmr.earthdata.nasa.gov/search/concepts/C1995863244-GHRC_DAAC.html", size(*0.8)) 

gr export "各城市闪电频率数据.png", replace width(4800) 
