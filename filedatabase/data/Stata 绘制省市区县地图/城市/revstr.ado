*! revstr：反转字符串列表 
*! revstr "215 48 39" "252 141 89" "254 224 139" "255 255 191" "217 239 139" "145 207 96" "26 152 80"
*! ret list 
cap prog drop revstr
prog def revstr, rclass
	syntax anything 
	tokenize `"`anything'"'
	local n: word count `anything'
	di "`n'"
	local res ""
	forval i = `n'(-1)1 {
		local res = `"`res' "``i''""'
	}
	di `"`res'"'
	ret local revstr = `"`res'"'
end 

