options(repos = c(CRAN = "https://cloud.r-project.org"))
if (!requireNamespace("paletteer", quietly = TRUE)) install.packages("paletteer")
if (!requireNamespace("jsonlite", quietly = TRUE)) install.packages("jsonlite")

library(paletteer)
library(jsonlite)

pdf(NULL)  # avoid opening a graphics device

# Normalize any color string to #RRGGBB (drop alpha)
normcol <- function(x) {
  x <- as.character(x)
  if (is.na(x) || x == "") return(NA_character_)
  if (substr(x, 1, 1) == "#") {
    h <- substr(x, 2, nchar(x))
    if (nchar(h) == 8) h <- substr(h, 1, 6)        # drop alpha
    if (nchar(h) == 3) h <- paste0(substr(h,1,1),substr(h,1,1),substr(h,2,2),substr(h,2,2),substr(h,3,3),substr(h,3,3))
    if (nchar(h) == 6) return(toupper(paste0("#", h)))
    return(NA_character_)
  }
  m <- regmatches(x, gregexpr("[0-9.]+", x))[[1]]
  if (length(m) >= 3) {
    r <- as.integer(m[1]); g <- as.integer(m[2]); b <- as.integer(m[3])
    if (is.na(r)) return(NA_character_)
    return(sprintf("#%02X%02X%02X", r, g, b))
  }
  return(NA_character_)
}

nm <- palettes_d_names
out <- list()
seen <- list()

# Process a palette name table. use_c=TRUE -> continuous (paletteer_c); FALSE -> discrete (paletteer_d).
process_table <- function(tbl, use_c) {
  for (i in seq_len(nrow(tbl))) {
    pkg <- as.character(tbl$package[i])
    pal <- as.character(tbl$palette[i])
    s <- paste0(pkg, "::", pal)
    # paletteer_d / paletteer_c use non-standard evaluation on the first argument,
    # so we must pass a LITERAL string (built via sprintf, evaluated with parse).
    if (use_c) {
      expr <- sprintf('paletteer_c("%s", n=51)', s)
      final_type <- "continuous"
    } else {
      expr <- sprintf('paletteer_d("%s")', s)
      final_type <- "discrete"
    }
    cols <- tryCatch(as.character(eval(parse(text = expr))), error = function(e) NULL)
    if (!is.null(cols) && length(cols) > 0) {
      cols <- sapply(cols, normcol)
      cols <- cols[!is.na(cols)]
      if (length(cols) >= 2) {
        key <- paste0(pkg, "__", pal)
        if (is.null(seen[[key]])) {
          seen[[key]] <<- TRUE
          out[[length(out) + 1]] <<- list(
            key = key,
            package = pkg,
            palette = pal,
            type = final_type,
            n = length(cols),
            colors = cols
          )
        }
      }
    }
  }
}

process_table(palettes_d_names, FALSE)
if (exists("palettes_c_names")) process_table(palettes_c_names, TRUE)

js <- paste0("window.__PALETTEER_RAW__ = ", toJSON(out, auto_unbox = TRUE, null = "null"), ";")
writeLines(js, "assets/data/paletteer.raw.js")
cat("WROTE", length(out), "palettes to assets/data/paletteer.raw.js\n")
