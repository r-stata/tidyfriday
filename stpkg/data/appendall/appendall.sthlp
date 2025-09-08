{smcl}
{* 26jul2025}{...}
{cmd:help appendall}{right:v1.0.0}
{hline}

{title:Title}

{p2colset 5 18 20 2}{...}
{p2col:{hi:appendall} {hline 2}}Merge all .dta files in a directory{p_end}
{p2colreset}{...}

{title:Syntax}

{p 8 15 2}
{cmd:appendall}
[{it:directory}]
[{cmd:,}
{cmd:clear}
{cmd:force}
{cmd:list}
{cmd:pattern(}{it:string}{cmd:)}
{cmd:saving(}{it:filename}{cmd:)}
]

{title:Description}

{pstd}
{cmd:appendall} merges all Stata dataset files (.dta) in a specified directory by 
appending them vertically. The command preserves variable attributes and handles 
variable name case sensitivity.

{title:Options}

{phang}
{cmd:clear} permits the command to replace the dataset in memory, even if the current 
dataset has not been saved to disk.

{phang}
{cmd:force} forces the command to continue even if some files cannot be appended.

{phang}
{cmd:list} displays the list of files that will be processed.

{phang}
{cmd:pattern(}{it:string}{cmd:)} specifies a file pattern to match (default is *.dta).

{phang}
{cmd:saving(}{it:filename}{cmd:)} saves the merged dataset to the specified filename.

{title:Examples}

{phang2}{cmd:. appendall "C:/my_data"}{p_end}
{phang2}{cmd:. appendall, pattern("survey_*.dta") saving(combined.dta)}{p_end}
{phang2}{cmd:. appendall "D:/project/data", list force}{p_end}

{title:Stored results}

{pstd}
{cmd:appendall} stores the following in {cmd:r()}:

{synoptset 20 tabbed}{...}
{p2col 5 20 24 2: Scalars}{p_end}
{synopt:{cmd:r(N_files)}}number of files processed{p_end}

{p2col 5 20 24 2: Macros}{p_end}
{synopt:{cmd:r(files)}}list of processed files{p_end}
{synopt:{cmd:r(directory)}}directory path{p_end}
{p2colreset}{...}

{title:Author}

{pstd}
RStata{p_end}
{pstd}
https://rstata.duanshu.com/{p_end}

{title:Also see}

{psee}
Manual: {help append}, {help dir}
{p_end}
