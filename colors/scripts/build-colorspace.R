# Extract the named color palettes shipped by the `colorspace` R package
# (these are NOT covered by `paletteer`, so they are added as extra R-package palettes).
#
# Output: assets/data/colorspace.raw.js  ->  window.__COLORSPACE_RAW__ = [...]
#   Each row: { package:"colorspace", palette:"<name>", type:"continuous"|"discrete", colors:[...] }
#
# Type mapping:
#   - Qualitative                 -> discrete  (qualitative_hcl)
#   - Sequential (single/multi)   -> continuous (sequential_hcl, 51-step base ramp)
#   - Diverging                   -> continuous (diverging_hcl,  51-step base ramp)

suppressMessages({ library(colorspace) ; library(jsonlite) })
pdf(NULL)  # avoid opening a graphics device

normcol <- function(x) {
  x <- as.character(x)
  if (is.na(x) || x == "") return(NA_character_)
  if (substr(x, 1, 1) == "#") {
    h <- substr(x, 2, nchar(x))
    if (nchar(h) == 8) h <- substr(h, 1, 6)
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

hp <- hcl_palettes()
names_vec <- rownames(hp)
type_vec <- hp$type

# Remove duplicate *consecutive* colors (qualitative schemes cycle past their
# distinct count and would otherwise repeat colors on the map/bars).
dedupe <- function(v) {
  out <- c(); seen <- c()
  for (x in v) { if (!(x %in% seen)) { out <- c(out, x); seen <- c(seen, x) } }
  out
}

out <- list()
for (i in seq_along(names_vec)) {
  nm <- names_vec[i]
  ty <- type_vec[i]
  cols <- NULL
  final_type <- "continuous"
  if (ty == "Qualitative") {
    cols <- tryCatch(as.character(qualitative_hcl(12, palette = nm)), error = function(e) NULL)
    cols <- dedupe(cols)
    final_type <- "discrete"
  } else if (grepl("Sequential", ty, fixed = TRUE)) {
    cols <- tryCatch(as.character(sequential_hcl(51, palette = nm)), error = function(e) NULL)
  } else if (ty == "Diverging") {
    cols <- tryCatch(as.character(diverging_hcl(51, palette = nm)), error = function(e) NULL)
  }
  if (!is.null(cols) && length(cols) > 0) {
    cols <- sapply(cols, normcol)
    cols <- cols[!is.na(cols)]
    if (length(cols) >= 2) {
      out[[length(out) + 1]] <- list(
        package = "colorspace",
        palette = nm,
        type = final_type,
        n = length(cols),
        colors = cols
      )
    }
  }
}

js <- paste0("window.__COLORSPACE_RAW__ = ", toJSON(out, auto_unbox = TRUE, null = "null"), ";")
writeLines(js, "assets/data/colorspace.raw.js")
cat("WROTE", length(out), "colorspace palettes to assets/data/colorspace.raw.js\n")
