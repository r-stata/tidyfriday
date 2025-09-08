{smcl}
{* *! version 4.0 22aug2025}{...}
{vieweralsosee "" "--"}{...}
{vieweralsosee "help import" "help import"}{...}
{vieweralsosee "help file" "help file"}{...}
{viewerjumpto "语法" "readfiles##syntax"}{...}
{viewerjumpto "描述" "readfiles##description"}{...}
{viewerjumpto "选项" "readfiles##options"}{...}
{viewerjumpto "示例" "readfiles##examples"}{...}
{viewerjumpto "存储结果" "readfiles##results"}{...}
{viewerjumpto "作者" "readfiles##author"}{...}

{title:标题}

{p2colset 5 16 18 2}{...}
{p2col :{cmd:readfiles} {hline 2}}读取指定文件夹中特定类型的所有文件{p_end}
{p2colreset}{...}


{marker syntax}{...}
{title:语法}

{p 8 15 2}
{cmd:readfiles} {it:folder_path}{cmd:,} {cmd:ext(}{it:string}{cmd:)} 
[{cmd:replace} {cmd:debug}]

{synoptset 20 tabbed}{...}
{synopthdr}
{synoptline}
{synopt:{cmd:ext(}{it:string}{cmd:)}}指定要读取的文件扩展名（必需）{p_end}
{synopt:{cmd:replace}}替换当前数据集{p_end}
{synopt:{cmd:debug}}显示调试信息{p_end}
{synoptline}
{p2colreset}{...}


{marker description}{...}
{title:描述}

{pstd}
{cmd:readfiles} 命令读取指定文件夹中特定扩展名的所有文件，并将每个文件的内容存储为数据集中的观测值。
该命令特别适合处理文本文件，如 do 文件、日志文件、文本数据文件等。

{pstd}
每个文件在数据集中创建一条观测，包含两个变量：
{break}{cmd:filename}: 文件的完整路径和名称
{break}{cmd:content}: 文件的完整内容

{pstd}
注意：该命令会自动将文件中的反引号（`）转换为单引号（'），以避免 Stata 解释问题。


{marker options}{...}
{title:选项}

{phang}
{cmd:ext(}{it:string}{cmd:)} 指定要读取的文件扩展名（不含点号）。例如，要读取所有 do 文件，使用 {cmd:ext(do)}。

{phang}
{cmd:replace} 如果内存中已有数据，使用此选项替换当前数据集。

{phang}
{cmd:debug} 显示调试信息，包括每个文件处理后的内容预览。


{marker examples}{...}
{title:示例}

{phang}{cmd:. readfiles "C:/myfiles", ext(do)}{p_end}
{phang}读取 C:/myfiles 文件夹中的所有 .do 文件{p_end}

{phang}{cmd:. readfiles "D:/data/texts", ext(txt) replace}{p_end}
{phang}读取 D:/data/texts 文件夹中的所有 .txt 文件，替换当前数据集{p_end}

{phang}{cmd:. readfiles "./results", ext(log) debug}{p_end}
{phang}读取当前目录下 results 文件夹中的所有 .log 文件，显示调试信息{p_end}


{marker results}{...}
{title:存储结果}

{pstd}
{cmd:readfiles} 在 {cmd:r()} 中存储以下结果：

{synoptset 15 tabbed}{...}
{p2col 5 15 19 2: 标量}{p_end}
{synopt:{cmd:r(filecount)}}读取的文件数量{p_end}

{p2col 5 15 19 2: 宏}{p_end}
{synopt:{cmd:r(filelist)}}读取的文件列表{p_end}


{marker author}{...}
{title:作者}

{pstd}
微信公众号 RStata{p_end}
{pstd}
电子邮件：请联系微信公众号{p_end}


{title:Also see}

{psee}
在线帮助：{help import}, {help file}, {help filefilter}
