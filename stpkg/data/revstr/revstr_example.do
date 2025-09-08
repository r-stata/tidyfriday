* revstr 示例脚本
version 12.1
clear

* 基本用法
revstr "apple banana cherry"
di "Reversed: `r(revstr)'"

* 使用自定义分隔符
revstr "one,two,three", delimiter(",") separator(" | ")

* 处理带空格的值
revstr "value 1" "value 2" "value 3", noquotes

* 编程应用
local colors "red green blue"
revstr `"`colors'"'
local reversed `"`r(revstr)'"'
di "Colors reversed: `reversed'"
