*! 微信公众号 RStata
*! 2020 年 5 月 22 日
cap prog drop cnstock2
prog def cnstock2
	version 7.0
	di in yellow "下载中..."
	qui{
		clear
		copy "http://stockdata.stock.hexun.com/gszl/data/jsondata/jbgk.ashx?count=5000&titType=null&page=1&callback=hxbase_json15" "temp.json", replace
		cap erase temp2.json
		mata: file()
		* 处理 json 格式的数据
		* 转码
		unicode encoding set gb18030
		unicode translate "temp2.json"
		unicode erasebackups, badidea
		gen str100 Stockname = ""
		gen str100 Pricelimit = ""
		gen str100 lootchips = ""
		gen str100 shareholders = ""
		gen str100 Institutional = ""
		gen str100 Iratio = ""
		gen str100 district = ""
		gen str100 Cprice = ""
		gen str200 maincost = ""
		insheetjson Stockname Pricelimit lootchips shareholders Institutional Iratio district Cprice maincost using "temp2.json", table(list) col("Stockname" "Pricelimit" "lootchips" "shareholders" "Institutional" "Iratio" "district" "Cprice" "maincost")
		replace district = ustrregexs(1) if ustrregexm(district, ">(.*)<")
		replace maincost = ustrregexs(1) if ustrregexm(maincost, `"'>(.*)</a"')
		foreach i of varlist _all {
			replace `i' = "" if `i' == "--"
		}
		compress
		destring, replace
		cap erase temp.json
	}
	di in green "获取成功..."
end

mata:
	void file() {
		fin = fopen("temp.json", "r")
		line = fread(fin, 3000000)
		line = subinstr(line, `"'"', `"""', .)
		line = subinstr(line, `""_blank""', `"'_blank'"', .)
		line = subinstr(line, `"openshowd(this,""', "", .)
		line = subinstr(line, `"","1")"', "", .)
		line = subinstr(line, `""Closed(this)""', "", .)
		line = subinstr(line, `"<img alt="" src=""', "", .)
		line = subinstr(line, `""/>"', "", .)
		line = subinstr(line, "sum", `""sum""', .)
		line = subinstr(line, "list", `""list""', .)
		line = subinstr(line, "Number", `""Number""', .)
		line = subinstr(line, "StockNameLink", `""StockNameLink""', .)
		line = subinstr(line, "Stockname", `""Stockname""', .)
		line = subinstr(line, "Pricelimit", `""Pricelimit""', .)
		line = subinstr(line, "lootchips", `""lootchips""', .)
		line = subinstr(line, "shareholders", `""shareholders""', .)
		line = subinstr(line, "Institutional", `""Institutional""', .)
		line = subinstr(line, "Iratio", `""Iratio""', .)
		line = subinstr(line, "deviation", `""deviation""', .)
		line = subinstr(line, "maincost", `""maincost""', .)
		line = subinstr(line, "district", `""district""', .)
		line = subinstr(line, "Cprice", `""Cprice""', .)
		line = subinstr(line, "Stockoverview", `""Stockoverview""', .)
		line = subinstr(line, "hyLink", `""hyLink""', .)
		line = subinstr(line, "dyLink", `""dyLink""', .)
		line = subinstr(line, "gnLink", `""gnLink""', .)
		line = subinstr(line, "StockLink", `""StockLink""', .)
		line = subinstr(line, "Addoptional", `""Addoptional""', .)
		line = subinstr(line, "hxbase_json15(", "", .)
		line = subinstr(line, "}]})", "}]}", .)
		fclose(fin)
		fout = fopen("temp2.json", "w")
		fwrite(fout, line)
		fclose(fout)
	}
end
