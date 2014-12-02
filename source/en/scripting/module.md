title: Module
permalink: en/scripting/module
---

本教程所说的模块化指的是将代码拆分成多个脚本文件，并且让它们能相互操作的过程。本文将介绍如何在 Fireball-x 中编写和调用模块，至于内部的原理可参考[脚本编译](core/script-building.md)。
```
所有“备注”都属于进阶内容，一开始不需要了解。
```

本文索引：
- [概述](#intro)
- [定义模块](#define)
- [引用模块](#import)
- [示例](#example)
	- [导出变量](#exports)
	- [封装私有变量](#private)

## <a name="intro"></a>概述

如果你还不确定**模块化**究竟能做什么，模块化相当于：  
- C/C++ 中的 include
- C# 中的 using
- Java 和 Python 中的 import
- HTML 中的 link

模块化使你可以在 Fireball-x 中引用其它脚本文件：  
- 访问其它文件公开的参数
- 调用其它文件公开的方法
- 使用其它文件公开的类型
- 使用或继承其它文件公开的Component

Fireball-x 中的 JavaScript 使用和 node.js 相同的方式来实现模块化：  
- 每一个单独的脚本文件就是一个模块。
- 每个模块都是一个单独的作用域（在该模块内使用`var`定义的局部变量，无法被其它模块读取）。
- 以同步的 `require` 方法来引用其它模块。
- 使用 `module.exports` 对象输出变量。

不论模块如何定义，所有用户代码最终会由 Fireball-x 编译为原生的 JavaScript，可直接在手机浏览器中运行。

## <a name="define"></a>定义模块

其实每一个单独的脚本文件就是一个模块，例如新建一个脚本 `rotate.js`，在里面定义一个 Component：
```js
var Rotate = Fire.define('Rotate', Fire.Component);
Rotate.prop('speed', 1);
Fire.addComponentMenu(Rotate, 'Rotate');

Rotate.prototype.update = function () {
    this.transform.rotation += this.speed;
};
```
我们定义了 Rotate 这个 Component，但只有从菜单里才能添加，从别的脚本文件是获取不到 Rotate 的。为了可以在外部访问到 Rotate，我们还需要在 `rotate.js` 最后加上一行代码：
```js
module.exports = Rotate;
```
当我们把 **module.exports** 赋值为 Rotate 之后，只要有人引用这个模块，就将获得 Rotate 指向的这个 Component。

## <a name="import"></a>引用模块

除了 Fireball-x 提供的接口，所有用户定义的模块都需要使用 **require** 来访问。
```js
var Rotate = require('rotate');
```
调用 require 时传入的字符串就是模块的**文件名**，这个名字不包含路径也不包含后缀，而且大小写敏感。require 返回的就是模块内定义的 module.exports 对象。

我们可以使用 Rotate 派生一个子类，新建一个脚本 `sinRotate.js`：
```js
var Rotate = require('rotate');

var SinRotate = Fire.define('SinRotate', Rotate);
SinRotate.prototype.update = function () {
    this.transform.rotation += this.speed * Math.sin(Fire.Time.time);
};

module.exports = SinRotate;
```
这里我们定义了一个新的 Component 叫 SinRotate，它继承自 Rotate，并对 update 方法进行了重写。当然，最后我们还是可以通过 `module.exports` 将 SinRotate 再次导出给其它模块使用。

备注：
  - require 可以在脚本的任何地方任意时刻进行调用。
  - 单个模块不论被 require 几次，始终都只有一份。也就是说多个脚本不论调用多少次 require，同个模块名总是返回相同模块。
  - 可以随时在 Developer Tools 中 require 任意模块。

## <a name="example"></a>示例

### <a name="exports"></a>导出变量

- module.exports 可以直接用来增加新的字段，不一定要提前赋值。

	```js
	// foobar.js:
	module.exports.foo = function () {
    	Fire.log("foo");
    };
    module.exports.bar = function () {
    	Fire.log("bar");
    };
    // test.js:
    var foobar = require("foobar");
    foobar.foo();	// "foo"
    foobar.bar();	// "bar"
	```
- module.exports 能直接导出任意 JavaScript 对象。

	```js
	// foobar.js:
	module.exports = {
    	FOO: function () {
            this.type = "foo";
        },
        bar: "bar"
    };
    // test.js:
    var foobar = require("foobar");
    var foo = new foobar.FOO();
    Fire.log(foo.type);		// "foo"
    Fire.log(foobar.bar);	// "bar"
	```

### <a name="private"></a>封装私有变量

由于每个模块都是一个单独的作用域，在模块内使用 **var** 定义的局部变量，将无法被模块外部访问。我们就可以这样来封装模块内的私有变量。
```js
// foobar.js:
var dirty = false;
module.exports = {
	setDirty: function () {
        dirty = true;
	},
};
// test.js:
var foo = require("foobar");
Fire.log(typeof foo.dirty);		// "undefined"
```

**警告：定义变量前一定要在前面加上 var**，否则将会变成全局变量！在 Fireball-x 中禁止使用全局变量。

```js
// foobar.js:
dirty = false;		// 这是错的，dirty 会变成全局变量！前面应该加上 var ！
module.exports = {
	setDirty: function () {
        dirty = true;
	},
};
```
