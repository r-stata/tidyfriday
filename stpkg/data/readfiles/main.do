* ==============================================================================
* readfiles 命令示例代码
* 作者：微信公众号 RStata
* 日期：2025年8月22日
* 描述：readfiles 命令使用示例
* ==============================================================================

* 清除所有并设置工作环境
clear all

* ==============================================================================
* 第一部分：安装命令（取消注释使用）
* ==============================================================================

/*
* 从本地安装
net install readfiles.pkg, from("readfiles.pkg 文件所在的文件夹路径")

* 验证安装
which readfiles
help readfiles
*/

* ==============================================================================
* 第二部分：生成示例测试数据
* ==============================================================================

* 创建测试文件夹
capture mkdir test_files
cd test_files

* 创建第一个示例文本文件
file open myfile using "example1.txt", write text replace
file write myfile "这是第一个示例文件" _n
file write myfile "包含一些文本内容：`特殊字符`处理" _n
file write myfile "第三行内容"
file close myfile

* 创建第二个示例文本文件
file open myfile using "example2.txt", write text replace
file write myfile "第二个文件" _n
file write myfile "文件结束"
file close myfile

* 创建日志文件
file open myfile using "data.log", write text replace
file write myfile "日志文件开始" _n
file write myfile "日志结束"
file close myfile

* 回到原始目录
cd ..

* ==============================================================================
* 第三部分：基本使用方法
* ==============================================================================

* 1. 读取文本文件（使用 replace 选项替换现有数据）
readfiles test_files, ext(txt) replace 

* 2. 查看生成的数据集结构
describe

* 3. 查看前几行数据
list in 1/2

* 4. 读取日志文件
readfiles test_files, ext(log) replace

* 5. 使用调试模式查看处理过程
readfiles test_files, ext(txt) debug replace

* ==============================================================================
* 第四部分：查看和分析结果
* ==============================================================================

* 查看数据结构
describe

* 查看文件内容（浏览模式）
browse

* 查看返回的结果信息
readfiles test_files, ext(txt) replace
ret list 

* 显示读取的文件数量
di "读取了 " r(filecount) " 个文件"

* 显示文件列表
di "文件列表: " r(filelist)

* ==============================================================================
* 第五部分：高级应用示例
* ==============================================================================

* 批量处理多种文件类型
cap mkdir "res"
foreach ext in txt log {
    capture readfiles test_files, ext(`ext') replace
    if _rc == 0 {
        ren filename filename0 
        save "res/`ext'_files.dta", replace
        di "已保存 `ext' 文件结果"
    }
}

* 再使用 appendall 就可以合并了
appendall res, clear 
