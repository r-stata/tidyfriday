library(jsonlite)
library(readstata13)
library(readxl)
library(data.table)

# 设置数据根目录
root_dir <- "data"

# 递归获取所有文件信息
get_file_info <- function(dir_path, root) {
  items <- list.files(dir_path, full.names = FALSE, include.dirs = TRUE)
  result <- list()
  
  for (item in items) {
    item_path <- file.path(dir_path, item)
    rel_path <- substr(item_path, nchar(root) + 2, nchar(item_path))  # 相对路径
    
    if (dir.exists(item_path)) {
      # 如果是目录，递归处理
      sub_items <- get_file_info(item_path, root)
      result[[item]] <- list(
        type = "directory",
        path = rel_path,
        items = sub_items
      )
    } else {
      # 如果是文件，获取文件信息
      file_ext <- tools::file_ext(item)
      content <- NULL
      file_type <- if (file_ext %in% c("R", "r", "py", "js", "html", "do", "ado", "txt")) {
        "code"
      } else if (file_ext %in% c("csv", "xlsx", "dta")) {
        "data"
      } else {
        "other"
      }
      
      # 读取文件内容
      if (file_type == "code") {
        # 读取代码文件内容
        content <- readLines(item_path, warn = FALSE)
        content <- paste(content, collapse = "\n")
      } else if (file_type == "data") {
        # 读取数据文件内容
        tryCatch({
          if (file_ext == "csv") {
            data <- fread(item_path, stringsAsFactors = FALSE, fill = TRUE)
          } else if (file_ext == "xlsx") {
            data <- read_excel(item_path)
            data <- as.data.table(data)
          } else if (file_ext == "dta") {
            data <- read.dta13(item_path)
            data <- as.data.table(data)
          }
          
          # 将数据转换为JSON格式，字符串用双引号括起来
          content <- toJSON(data, pretty = TRUE, auto_unbox = TRUE, force = TRUE)
        }, error = function(e) {
          content <- paste("Error reading data file:", e$message)
        })
      }
      
      result[[item]] <- list(
        type = file_type,
        extension = file_ext,
        path = rel_path,
        content = content
      )
    }
  }
  
  return(result)
}

# 生成文件信息JSON
file_info <- get_file_info(root_dir, root_dir)
json_data <- list(
  root = root_dir,
  files = file_info,
  generated_at = as.character(Sys.time())
)

# 保存为JSON文件
write_json(json_data, "file_structure.json", pretty = TRUE, auto_unbox = TRUE)

cat("JSON file generated successfully: file_structure.json\n")
