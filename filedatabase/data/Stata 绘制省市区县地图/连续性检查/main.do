use "1995～2023年各省份雷击频率与长途光缆线路增长率交乘面板数据.dta", clear 
local cmd = "tw" 
levelsof 省, local(prov)
foreach i in `prov' {
	local cmd = `"`cmd' (line HRFC_COM_FR_g 年份 if 省 == "`i'", lc(gray%60) lw(*0.3))"'
}
`cmd' ///
(line HRFC_COM_FR_g 年份 if 省 == "北京市", lc("251 207 53") lw(*1.2)) ///
(line HRFC_COM_FR_g 年份 if 省 == "河南省", lc("237 76 28") lw(*1.2)) ///
(line HRFC_COM_FR_g 年份 if 省 == "广东省", lc("156 126 112") lw(*1.2)) ///
(line HRFC_COM_FR_g 年份 if 省 == "安徽省", lc("90 194 241") lw(*1.2)) ///
(line HRFC_COM_FR_g 年份 if 省 == "江苏省", lc("17 119 108") lw(*1.2)), ///
	leg(order(36 "河南" 37 "广东" 38 "安徽" 35 "北京" 39 "江苏") ///
		pos(11) row(2) ring(0)) ///
	xla(1995(3)2020 2023) xti("") yti("雷击频率与长途光缆线路增长率交乘") ///
	ti("历年各省份雷击频率与长途光缆线路增长率交乘变化趋势") ///
	caption("数据来源：https://cmr.earthdata.nasa.gov/search/concepts/C1995863244-GHRC_DAAC.html" "中国统计年鉴2024") 

gr export "1995～2023年各省份雷击频率与长途光缆线路增长率交乘变化趋势.png", replace width(4800) 
