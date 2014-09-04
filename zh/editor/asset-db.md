# Asset Database

## AssetDB refresh 读取流程

 - 遍历 AssetDB._mounts, 并 walk 每一个 mount point 的真实路径 
 - 检查 .meta 文件是否有对应的raw data
   - 如果没有对应的raw data 则删除这份 .meta 文件
 - 检查 raw data 是否有对应的 .meta 文件
   - 如果有对应的 .meta 文件，则读取该文件
     - 如果该文件读取失败，则重新创建一份 .meta 文件
   - 如果没有对应的 .meta 文件，则重新创建一份
   - 如果该份 .meta 文件中的 uuid 已经在 AssetDB 中记录，则说明uuid发生碰撞，重新创建一份
    

