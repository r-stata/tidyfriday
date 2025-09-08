{smcl}
{* 26jul2025}{...}
{cmd:help revstr}{right:v1.0.0}
{hline}

{title:Title}

{p2colset 5 18 20 2}{...}
{p2col:{hi:revstr} {hline 2}}Reverse the order of strings in a list{p_end}
{p2colreset}{...}

{title:Syntax}

{p 8 15 2}
{cmd:revstr}
{it:string_list}
[{cmd:,}
{cmd:delimiter(}{it:string}{cmd:)}
{cmd:noquotes}
{cmd:separator(}{it:string}{cmd:)}
]

{title:Description}

{pstd}
{cmd:revstr} reverses the order of strings in a given list. The command preserves
the original content of each string element while changing their order.

{title:Options}

{phang}
{cmd:delimiter(}{it:string}{cmd:)} specifies the delimiter used to separate strings 
in the input (default is space).

{phang}
{cmd:noquotes} suppresses quotes around individual strings in the output.

{phang}
{cmd:separator(}{it:string}{cmd:)} specifies a custom separator for the output 
(default is space).

{title:Examples}

{phang2}{cmd:. revstr "apple banana cherry"}{p_end}
{phang2}{cmd:. revstr "215,48,39" "252,141,89", delimiter(",")}{p_end}
{phang2}{cmd:. revstr "one|two|three", delimiter("|") separator(" > ")}{p_end}
{phang2}{cmd:. revstr "alpha" "beta" "gamma", noquotes}{p_end}

{title:Stored results}

{pstd}
{cmd:revstr} stores the following in {cmd:r()}:

{synoptset 20 tabbed}{...}
{p2col 5 20 24 2: Scalars}{p_end}
{synopt:{cmd:r(N)}}number of strings processed{p_end}

{p2col 5 20 24 2: Macros}{p_end}
{synopt:{cmd:r(revstr)}}reversed string list{p_end}
{synopt:{cmd:r(original)}}original string list{p_end}
{p2colreset}{...}

{title:Author}

{pstd}
Your Name{p_end}
{pstd}
Your Institution{p_end}
{pstd}
Email: your@email.com{p_end}

{title:Also see}

{psee}
Manual: {help macrolists}, {help tokenize}
{p_end}
