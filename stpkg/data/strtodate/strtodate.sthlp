{smcl}
{* 标题部分 *}
{title:Title}

{bf:strtodate} {hline 2} 将'YYYY-MM-DD'格式的字符串批量转换为日期变量

{title:Syntax}

{cmd:strtodate} {it:varlist}

{title:Description}

{p 4 4 2}
{cmd:strtodate} 用于将一个或多个格式为'YYYY-MM-DD'的字符串变量批量转换为Stata日期变量，并替换原变量。{p_end}

{p 4 4 2}
转换过程中，命令会自动检查变量类型，仅处理字符串变量。转换后的日期变量将应用%tdCY-N-D格式（如2023-3-15），便于阅读和后续分析。{p_end}

{title:Examples}

{p 4 4 2}1. 转换单个字符串变量：{p_end}
{phang2}. {cmd:strtodate birthdate}{p_end}

{p 4 4 2}2. 转换多个字符串变量：{p_end}
{phang2}. {cmd:strtodate startdate enddate registrationdate}{p_end}

{title:Remarks}

{p 4 4 2}{bf:1. 变量类型检查}{p_end}
{p 8 8 2}命令会先检查每个变量是否为字符串类型，非字符串变量将被跳过并显示错误信息：{p_end}
{phang2}{err:错误：age 不是字符串变量，已跳过}{p_end}

{p 4 4 2}{bf:2. 格式要求}{p_end}
{p 8 8 2}此命令专门处理'YYYY-MM-DD'格式的字符串（如'2025-08-13'），其他格式的日期字符串可能转换失败。{p_end}

{p 4 4 2}{bf:3. 转换失败提示}{p_end}
{p 8 8 2}对于不符合格式要求的值，转换会失败并产生缺失值，命令会显示警告信息：{p_end}
{phang2}{yellow:警告：变量 eventdate 中有 3 个值转换失败（非标准格式）}{p_end}

{p 4 4 2}{bf:4. 变量替换}{p_end}
{p 8 8 2}转换成功后，原字符串变量会被删除，临时日期变量会重命名为原变量名，保持数据结构不变。{p_end}

{title:Author}

{p 4 4 2}微信公众号 RStata{p_end}

{smcl}
    