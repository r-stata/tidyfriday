*! 读取指定文件夹中特定类型的所有文件，版本 4.0（增强型特殊符号处理）
*! 作者：微信公众号 RStata 
*! 日期：2025年8月22日 
*! 语法：readfiles 文件夹路径, ext(文件扩展名) [replace debug]

program define readfiles, rclass 
    version 15.1
    syntax anything(name=folder), ext(string) [replace debug]
    
    * 检查是否要替换现有数据集
    if "`replace'" == "" & _N > 0 {
        di as error "数据集已存在，请使用 replace 选项替换"
        exit 1
    }
    
    * 确保文件夹路径以斜杠结尾
    local last_char = substr("`folder'", -1, 1)
    if "`last_char'" != "/" & "`last_char'" != "\" {
        local folder "`folder'/"
    } 
    
    * 获取指定文件夹中特定类型的所有文件
    local files : dir `"`folder'"' files "*.`ext'"
    
    * 如果没有找到文件
    if `"`files'"' == "" {
        di as error "在文件夹 `folder' 中没有找到 .`ext' 类型的文件"
        exit 2
    }
    
    * 创建新数据集
    clear
    qui {
        set obs 0
        gen filename = ""
        gen content = ""
    }
    * 循环读取每个文件
    local i = 1
    foreach file in `files' {
        di as text "正在读取文件: `file'"
        
        * 使用临时文件处理特殊字符
        tempfile tmpfile
        tempfile tmpfilefilter
        local fullpath "`folder'`file'"
        
        * 将文件内容复制到临时文件，同时转义`符号
        qui copy "`fullpath'" "`tmpfile'", replace 
        
        * 使用filefilter命令进行更可靠的替换
        qui filefilter "`tmpfile'" "`tmpfilefilter'", from("`") to("'") replace
        
        * 从过滤后的临时文件读取内容
        local content = fileread("`tmpfilefilter'")
        
        * 调试模式：显示处理后的内容前100个字符
        if "`debug'" != "" {
            di as text "处理后的内容预览: " substr(`"`content'"', 1, 100) "..."
        } 
        
        * 将文件名和内容存入数据集
        qui {
            set obs `i'
            replace filename = "`fullpath'" in `i'
            replace content = `"`content'"' in `i'
        }
        
        local i = `i' + 1
    }

    ret scalar filecount = `=`i'-1'
    ret local filelist = `"`files'"'
    
    * 显示结果信息
    di as result "成功读取了 `=`i'-1' 个 .`ext' 类型的文件"
    di as result "数据集包含变量: filename (文件名) 和 content (文件内容)"
    di as text "注意：文件中的反引号已被转义为单引号"
end
