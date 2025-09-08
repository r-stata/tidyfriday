*! 批量将'YYYY-MM-DD'格式字符串转换为日期变量并替换原变量 v2.0
*! 作者：微信公众号 RStata 
*! 日期：2025年08月13日
*! 语法：strtodate 变量列表

program define strtodate
    version 15.1
    syntax varlist(string)
    
    // 循环处理每个变量
    foreach var of local varlist {
        // 检查变量是否为字符串类型
        capture confirm string variable `var'
        if _rc != 0 {
            display as error "错误：`var' 不是字符串变量，已跳过"
            continue  // 跳过非字符串变量，继续处理下一个
        }
        
        // 创建临时变量存储转换结果
        tempvar tempdate
        
        // 执行转换：将"YYYY-MM-DD"格式转换为日期变量
        generate `tempdate' = date(`var', "YMD")
        
        // 检查转换是否成功（是否有缺失值产生）
        qui count if missing(`tempdate') & !missing(`var')
        if r(N) > 0 {
            display in yellow "警告：变量 `var' 中有 `r(N)' 个值转换失败（非标准格式）"
        }
        
        // 删除原字符串变量
        drop `var'
        
        // 将临时变量重命名为原变量名 
        rename `tempdate' `var'
        
        // 应用日期格式
        format `var' %tdCY-N-D
        
        // 显示处理信息
        display as text "已转换变量: " as result "`var'"
    }
    
    display as text _n "处理完成！所有变量已转换为日期格式并保持原变量名"
end
