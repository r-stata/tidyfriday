*! appendall v1.0.0 26jul2025
*! Author: RStata 
*! Merges all .dta files in a specified directory

cap program drop appendall
program define appendall, rclass
    version 16  // 指定兼容的 Stata 版本
    
    syntax [anything(name=foldername)] [, CLEAR FORCE LIST PATTERN(string) SAVing(string)]
    
    // 如果没有指定文件夹，默认当前目录
    if "`foldername'" == "" {
        local foldername "."
        di as text "Note: Using current working directory"
    }
    
    // 检查文件夹是否存在
    local oldpwd = `"`c(pwd)'"'
    cap qui cd "`foldername'"
    if _rc {
        di as error "Directory `foldername' not found"
        exit 601
    }
    cd `"`oldpwd'"'  // 返回原始目录
    
    // 获取文件列表
    if "`pattern'" == "" local pattern "*.dta"
    local files: dir "`foldername'" files "`pattern'", respectcase
    local filecount: word count `files'
    
    if `filecount' == 0 {
        di as error "No .dta files found in `foldername'"
        exit 601
    }
    
    // 显示找到的文件列表（如果指定了list选项）
    if "`list'" != "" {
        di as text _n "Found `filecount' files:"
        foreach f of local files {
            di as text " - `f'"
        }
    }
    
    // 检查内存中是否有数据（除非指定了clear或force）
    if c(N) > 0 & "`clear'" == "" & "`force'" == "" {
        di as error "Data in memory will be lost. Use {bf:clear} or {bf:force} option"
        exit 4
    }
    
    // 主处理循环
    tempfile master
    local firstfile: word 1 of `files'
    di as text _n "Number of files found: `filecount'" 
    
    qui use "`foldername'/`firstfile'", clear
    qui gen filename = "`firstfile'"
    di as text _n "Appending files: (1" _continue
    
    forvalues i = 2/`filecount' {
        local nextfile: word `i' of `files'
        cap qui append using "`foldername'/`nextfile'"
        qui replace filename = "`nextfile'" if mi(filename) 
        if _rc {
            di as error _n "Error appending `nextfile'"
            if "`force'" == "" exit _rc
        }
        di as text " `i'" _continue
    }
    
    di as text ") Done" _n
    di as text "Total observations:  " as result _N
    
    // 保存结果（如果指定了saving选项）
    if "`saving'" != "" {
        save "`saving'", `replace'
        di as text _n "Merged data saved to: `saving'"
    }
    
    // 返回信息
    return local N_files = `filecount'
    return local files `"`files'"'
    return local directory `"`foldername'"'
end
