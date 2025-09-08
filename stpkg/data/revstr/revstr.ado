*! revstr v1.0.0 26jul2025
*! Author: RStata
*! Reverse the order of strings in a list

cap program drop revstr
program define revstr, rclass
    version 12.1  // 兼容 Stata 12.1 及以上版本
    
    syntax anything(name=strings id="string list") [, DELimiter(string) NOQuotes SEParator(string)]
    
    // 设置默认分隔符
    if "`delimiter'" == "" local delimiter " "
    
    // 处理输入字符串
    tokenize `"`strings'"'
    local n: word count `strings'
    
    // 反转字符串
    local res ""
    forvalues i = `n'(-1)1 {
        local current ``i''
        
        // 处理引号选项
        if "`noquotes'" == "" {
            local current `""`current'""'
        }
        
        // 构建结果字符串
        if `i' == `n' {
            local res "`current'"
        }
        else {
            if "`separator'" != "" {
                local res "`res'`separator'`current'"
            }
            else {
                local res "`res' `current'"
            }
        }
    }
    
    // 显示结果
    di as text _n "Original: " as result `"`strings'"'
    di as text "Reversed: " as result `"`res'"' _n
    
    // 返回结果
    return local revstr `"`res'"'
    return local original `"`strings'"'
    return scalar N = `n'
end
