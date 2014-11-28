# 脚本编译
```
本文档相关代码是 main/tools/gulp-compile.js
所有“备注”都属于进阶内容，初学者不需要了解。
```

Fireball 的所有第三方代码，包括项目和插件代码，都会经过内部重新编译后才加载进来。这些操作由编辑器自动完成，本教程只谈一些注意事项。这部分内容的变更会比较频繁，将来会加入更多标准的支持。

本文索引：
- [脚本编译做了什么](#intro)
- [基本流程](#pipeline)
- [browserify](#browserify)
- [引用模块(require)](#require)

## <a name="intro"></a>脚本编译做了什么

脚本编译**负责**：
- 将各类用户代码转换为 JavaScript
- 编译期错误检查
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

1. 获取 `%project%/assets` 下所有脚本，如  JavaScript、TypeScript、CoffeeScript 等。
2. 将代码预编译为 JavaScript，放入`%project%/temp`，保留相对路径。
3. 生成**主文件**，用来 require 所有上个步骤生成的脚本。
4. 通过**browserify**，将主文件包含的所有脚本打包成为 `%project%/library/bundle.js`。

## <a name="browserify"></a>browserify

[browserify](http://browserify.org/) 在前端提供了 CommonJS 风格的模块编写方式，能够让你像 node.js 那样用同步的方式 require 模块。

## <a name="require"></a>引用模块(require)

