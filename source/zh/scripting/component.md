title: Component 编写
permalink: /zh/scripting/component
---
Fireball 的很多功能都是以 Component(组件) 的形式提供的，Component 就是 Fireball 调用脚本的入口。Component 可以用来实现各类游戏逻辑(gameplay)，像是控制 Entity(实体)、发送事件、修改属性、响应玩家输入等。

Fireball 运行于 JavaScript 之上，Component 也不例外，JavaScript 入门非常简单，你可以在(TODO)获得帮助。此外，很多其它语言像是 CoffeeScript 和 TypeScript 都能很好的编译为 JavaScript，Fireball 默许你在内部使用任何语言。

### 创建脚本

不同于其它资源，脚本一般是在 Fireball 中直接创建的。你可以在 Assets 面板中点击右键菜单或者点击它左上角的创建按钮，选择 `Create > New Script` 来创建。

请注意：
- Component 的类名将自动设置成脚本的文件名，而且脚本相互引用时也需要用到文件名，所以建议你在创建好后立刻对脚本重命名。
- 脚本的文件名在项目中不能重复。

### 脚本简介

在 Fireball 中双击脚本时，默认会使用内置的代码编辑器打开。初始的代码看起来就像：

```js
// NewScript.js:

var component = Fire.extend(Fire.Component);

// use start for initialiization
component.prototype.onStart = function () {
    // ...
};

// update is called once per frame
component.prototype.update = function () {
    // ...
};

module.exports = component;
```

脚本和 Fireball 关联的方式是通过继承 Fire.Component 实现的，Fire.Component 是所有 Component 的基类。当你定义了继承自 Fire.Component 的新类时，你就相当于创建了一个新的 Component 模板。每当你将脚本附加到 Entity 上，这份模板就会用于创建新的 Component 实例。




