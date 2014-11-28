# 模块化

本教程所说的模块化指的是将代码拆分成多个脚本文件，并且让它们能相互操作的过程。本文将介绍如何在 Fireball-x 中编写和调用模块，至于内部的原理可参考：[脚本编译](core/script-building.md)。
```
所有“备注”都属于进阶内容，一开始不需要了解。
```

本文索引：
- [概述](#intro)
- [定义模块](#define)
- [引用模块](#import)
- [其它注意事项](#note)

## <a name="intro"></a>概述

- 如果你还不确定**模块化**究竟能做什么，模块化相当于：
	- C/C++ 中的 include
    - C# 中的 using
    - Java 和 Python 中的 import
    - HTML 中的 link
- 模块化使你可以在 Fireball-x 中引用其它脚本文件：
	- 访问其它文件公开的参数
    - 调用其它文件公开的方法
    - 使用其它文件公开的类型
    - 使用或继承其它文件公开的Component
- Fireball-x 中的 JavaScript 使用和 node.js 相同的方式来实现模块化：
	- 每一个单独的脚本文件就是一个模块。
	- 每个模块都是一个单独的作用域，在该模块内使用`var`定义的局部变量，无法被其它模块读取。
	- 以同步的 `require` 方法来引用其它模块。
	- 使用 `module.exports` 对象输出变量。

- 备注
	- 不论模块如何定义，所有用户代码最终会由 Fireball-x 编译为原生的 JavaScript，可在手机浏览器中运行。
    
## <a name="define"></a>定义模块

其实每一个单独的脚本文件就是一个模块，例如新建一个脚本 `rotate.js`，内容如下
```js
var Rotate = Fire.define('Rotate', Fire.Component);
Fire.addComponentMenu(Rotate, 'Rotate');
Rotate.prop('speed', 1);
Rotate.prototype.update = function () {
    this.transform.rotation += this.speed;
};
```
这个模块定义了一个Component，但只有在菜单里才能添加这个Component，没办法在其它代码里访问到这个Component。为了可以在外部调用它，我们在最后加上一行代码：
```js
module.exports = Rotate;
```
这里把 **module.exports** 赋值为 Rotate 之后，当有人访问这个模块，就将获得 Rotate 指向的这个 Component。

## <a name="import"></a>引用模块

所有模块都通过**文件名**进行访问，这个名字不包含路径也不包含后缀。上面这个模块，就能通过 `"rotate"` 来访问：
```js
var Rotate = require('rotate');
```















