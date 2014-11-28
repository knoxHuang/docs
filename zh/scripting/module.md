# 模块化

本教程所说的模块化指的是将代码拆分成多个脚本文件，并且让它们能相互操作的过程。本文将介绍如何在 Fireball-x 中编写和调用模块，至于内部的原理可参考：[脚本编译](core/script-building.md)。
```
所有“备注”都属于进阶内容，一开始不需要了解。
```

本文索引：
- [概述](#intro)
- [编写模块](#export)
- [引用模块](#import)
- [其它注意事项](#note)

## <a name="intro"></a>概述

- 如果你还不确定**模块化**究竟能做什么，模块化相当于：
	- C/C++ 中的 include
    - C# 中的 using
    - Java 和 Python 中的 import
    - HTML 中的 link
- Fireball-x 中的 JavaScript 使用和 node.js 相同的方式来实现模块化：
	- 每一个单独的脚本文件就是一个模块。
	- 每个模块都是一个单独的作用域，在该模块内使用`var`定义的局部变量，无法被其它模块读取。
	- 以同步的 `require` 方法来引用其它模块。
	- 使用 `module.exports` 对象输出变量。

- 备注
	- 不论模块如何定义，所有用户代码最终会由 Fireball-x 编译为原生的 JavaScript，可在手机浏览器中运行。
    


