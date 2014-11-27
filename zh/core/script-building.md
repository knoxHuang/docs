# 脚本编译
```
本文档相关代码是 main/tools/gulp-compile.js
所有“备注”都属于进阶内容，初学者不需要了解。
```

Fireball 的所有第三方代码，包括项目和插件代码，都会经过内部重新编译后才加载进来。这些操作由编辑器自动完成，本教程只谈一些注意事项。

本文索引：
- [脚本编译做了什么](#intro)
- [基本流程](#pipeline)
- [browserify](#browserify)
- [引用代码](#require)

## <a name="intro"></a>脚本编译做了什么

脚本编译**负责**：
- 将所有用户代码转换为 JavaScript
- 错误检查
- 集成运行时所需的第三方库
- 将代码合并为最终文件
- 生成调试信息

脚本编译**不负责**：
- 监听用户代码修改
- 构建项目需要的 Fireball 最小运行时
- 将 Fireball 运行时和用户代码打包到一起
- 重新加载用户代码
- 导入导出用户代码

## <a name="pipeline"></a>基本流程

1. 扫描 Assets 下所有代码文件，如  JavaScript、TypeScript、CoffeeScript 等。
2. item
3. item


