capture program drop nicecut
program define nicecut, rclass 
	syntax anything, n(string) unit(string) [format(string)]
	if "`format'" == "" local format "%6.1f"
	qui sum `anything' if `anything' != -1000
	local cutpoints = "-1000 `=floor(`r(min)')'"
	local legorder = `"2 "无数据" "'
	local max = `=ceil(`r(max)')'
	_pctile `anything', n(`n')
	forval i = 1/`=`n' - 1' {
		if `i' == 1 {
			local cutpoints = `"`cutpoints' `=string(`r(r`i')', "`format'")'"'
			local legorder = `"`legorder' 3 "< `=string(`r(r`i')', "`format'")'`unit'" "'
		}
		if `i' > 1 & `i' < `=`n'-1' {
			local cutpoints = `"`cutpoints' `=string(`r(r`i')', "`format'")'"'
			local legorder = `"`legorder' `=`i' + 2' "`=string(`r(r`=`i'-1')', "`format'")'`unit' ~ `=string(`r(r`=`i'')', "`format'")'`unit'" "'
		}
		if `i' == `=`n'-1' {
			local cutpoints = "`cutpoints' `max'"
			local legorder = `"`legorder' `=`i' + 2' "> `=string(`r(r`=`i'-1')', "`format'")'`unit'" "'
		}
	}
	local cutpoints = subinstr("`cutpoints'", "00000000000001", "", .)
	local legorder = subinstr(`"`legorder'"', "00000000000001", "", .)
	di "`cutpoints'"
	ret local cutpoints = "`cutpoints'"
	di `"`legorder'"'
	ret local legorder = `"`legorder'"'
end // end of program nicecut
