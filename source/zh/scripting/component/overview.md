title: Component 编写
permalink: /zh/scripting/component
---
Fireball 的很多功能都是以 Component(组件) 的形式提供的，Component 就是 Fireball 调用脚本的入口。Component 可以用来实现各类游戏逻辑(gameplay)，像是控制 Entity(实体)、发送事件、修改属性、响应玩家输入等。

Fireball 运行于 JavaScript 之上，Component 也不例外，JavaScript 入门非常简单，你可以在(TODO)获得帮助。此外，很多其它语言像是 CoffeeScript 和 TypeScript 都能很好的编译为 JavaScript，Fireball 默许你在内部使用任何语言。

## 新建脚本

不同于其它资源，脚本一般是在 Fireball 中直接创建的。你可以在 Assets 面板中点击右键菜单或者点击它左上角的创建按钮，选择 `Create > New Script` 来创建。

请注意：
- Component 的类名将自动设置成脚本的文件名，而且脚本相互引用时也需要用到文件名，所以建议你在创建好后立刻对脚本重命名。
- 脚本的文件名在项目中不能重复。

## 脚本简介

在 Fireball 中双击脚本时，默认会使用内置的代码编辑器打开。我们新建一个脚本 Player.js，初始的代码看起来就像这样：

```js
// Player.js

var Comp = Fire.extend(Fire.Component);

// use onStart for initialiization
Comp.prototype.onStart = function () {
    // ...
};

// update is called once per frame
Comp.prototype.update = function () {
    // ...
};

module.exports = Comp;
```

脚本和 Fireball 关联的方式是通过继承 **Fire.Component** 实现的，Fire.Component 是所有 Component 的基类。当你定义了继承自 Fire.Component 的新类时，你就相当于创建了一个新的 Component 模板。每当你将脚本附加到 Entity 上，这份模板就会用于创建新的 Component 实例。

## Component简介

`Fire.extend(Fire.Component)`用于声明一个继承自 Fire.Component 的类。由于 Component 的类名获取自所在的脚本文件名，这里脚本是 Player.js，所以类名是 "Player"。

`var Comp`定义了一个变量，我们将它赋值为 Fire.extend 返回的类。"Comp" 仅仅是这个类的一个引用，是一个普通的 JavaScript 局部变量，变量名可以是任意的，和真正的类名 "Player" 没有关联。

`Comp.prototype.update = function () {...};` 定义了 **update** 回调方法，update 方法将由 Fireball 在游戏的每一帧渲染之前调用。你可以在 update 中进行诸如触发行为、响应操作等持续性的游戏逻辑。

`Comp.prototype.onStart = function () {...};` 定义了 **onStart** 回调方法，onStart 将由 Fireball 在 update 第一次执行之前调用，你可以在 onStart 中编写任意的初始化代码。

`module.exports = Comp;`  用于导出这个 Component，这样其它脚本就能通过 require 的方式使用它。导出操作的详细内容可以查看[模块化](/zh/scripting/module)。

请注意：
- 我们将使用 Fire.extend 声明的类型统称为 **FireClass**，Component 和普通的 FireClass 的区别仅仅在于它们的类名不用手工声明。你可以通过阅读[类型定义](/zh/dev/core/class)来进一步了解 FireClass。
- 对有经验的用户来说，Component 虽然可以定义构造函数，但我们建议将逻辑操作尽可能的放到 onStart 等 Fireball 的回调中进行，而构造函数仅仅用于声明成员变量。

## 添加到Entity

就像上面提到的，脚本只是用于定义 Component 的模板，所以 Component 内的任何代码都不会被执行，除非你在某个 Entity 上创建了模板的实例对象。要完成这个操作，你可以将脚本从 Assets 中拖动到 Hierarchy 上的某个 Entity，或者拖动到 Entity 的 Inspector 上。同时在 Inspector 上还有一个下拉子菜单，里面的 `Scripts` 子菜单就包含了项目里的所有已经创建的 Component 脚本。你的 Component 添加到 Entity 上之后，看起来和 Fireball 内置的其它 Component 是一样的。 

接着当你点击 Play 运行游戏，这个 Component 的脚本就会开始执行了。你可以在上面的 onStart 中加入代码来验证这点：
```js
// use onStart for initialiization
Comp.prototype.onStart = function () {
    Fire.log('Hello Fireball!');
};
```
Fire.log 是一个很常用的方法，用于将调试信息显示到 Fireball 的 Console(控制台) 面板。现在你再运行游戏的话，就会在 Console 中看到`Hello Fireball!`了。

## 在Inspector中显示属性

Fireball 能够在 Inspector 面板中实时查看和编辑 Component 的属性，包括你新建的 Component。

```js
// Player.js

var Comp = Fire.extend(Fire.Component);

Comp.prop('playerName', '');

// use onStart for initialiization
Comp.prototype.onStart = function () {
    Fire.log("My name is", this.playerName);
};

// update is called once per frame
Comp.prototype.update = function () {
    // ...
};

module.exports = Comp;
```

这个脚本将会在 Inspector 中显示一个输入控件，控件标题是 "Player Name"。  

![player-name-in-inspector](img/player-name-in-inspector.png)

如果你编辑了 Player Name 并且按下播放，你就会看到输出了 "My name is Duang Duang"。事实上，Fireball 还允许你在游戏运行的任意时刻实时更改这些属性，这对游戏的调试非常方便。当游戏停止，属性值将会被重置回播放之前的状态。这样你就可以放心的在运行时任意修改并测试场景对象，而不用担心临时的修改被保存。

## 用脚本控制

在 Inspector 面板，你可以对各个 Component 进行修改。当你修改了 Transform 的 Position，就等于设置了 Entity 的 Position。你也可以通过修改 SpriteRenderer 的 Color，来改变 Entity 的渲染颜色。但更多的，Component 的属性也能用脚本进行修改，两者区别在于，脚本能够在一段时间内连续地修改属性、过渡属性，实现渐变效果。脚本也能够响应玩家输入，能够修改、创建和销毁 Component 或 Entity，来实现各种各样的游戏逻辑。

## 访问Component

你的脚本经常需要访问同一个 Entity 上的其它 Component，这是最简单最常用的操作。如前面所说，一个 Component 只是类的一个实例对象，因此你要做的第一件事就是获得这个对象的引用。你要调用的接口是 Entity 的 **getComponent** ，它会返回当前 Entity 的指定类型的 Component 实例，通常你会定义一个变量来保存这个引用。然后你就能通过这个变量直接访问 Component 里的任何属性了。

```js
Comp.prototype.onStart = function () {
    var sr = this.getComponent(Fire.SpriteRenderer);

    // Change the color of the sprite's renderer
    sr.color = Fire.Color.red;
};
```

Fire.SpriteRenderer 是 Fireball 内置的 Component，你也可以为 getComponent 传入一个字符串形式的类名。

```js
Comp.prototype.onStart = function () {
    var sr = this.getComponent("Fire.SpriteRenderer");

    // ...
};
```

你还能调用 Component 的方法：

```js
Comp.prototype.onStart = function () {
    var transform = this.getComponent(Fire.Transform);

    // Rotate the transform around world position (10, 10)
    transform.rotateAround(Fire.v2(10, 10), 90);
};
```

Transform 用来控制一个 Entity 在游戏场景中的方位和缩放，是最常用的一个 Component。你可以使用 Entity.transform 或 Component.transform 来快速获取 Transform。于是上面的代码还可以优化成：

```js
Comp.prototype.onStart = function () {
    this.transform.rotateAround(Fire.v2(10, 10), 90);
};
```

如果在 Entity 上并没有你要的 Component，getComponent 将返回 null，如果你尝试访问 null 的值，将会在运行时抛出 'TypeError' 这个错误。

## 访问其它对象

仅仅能访问 Entity 自己的 Component 还往往不够，脚本通常还需要进行多个物体之间的互操作。例如，一门自动瞄准玩家的大炮，就需要不断获取玩家的最新位置。Fireball 提供了几种不同的方法用来访问其它对象：

### 使用Inspector设置

最常用的方式就是直接在 Inspector 中预先设置你需要的对象。这只需要在脚本中声明一个 Entity 类型的属性：

```js
// Cannon.js

var Comp = Fire.extend(Fire.Component);

Comp.prop('player', null, Fire.ObjectType(Fire.Entity));
```

这段代码使用 **prop** 声明一个 "player" 属性，默认值为 null，并且指定它的对象类型为 Entity。就像是C#里面的 `public Fire.Entity player = null;`。属性在 Inspector 中看起来是这样的：

![player-in-inspector-null](img/player-in-inspector-null.png)

接着你就可以将 Hierarchy 上的任意一个 Entity 拖到 Inspector 的这个属性中。于是这个 Component 实例的 player 属性就会被设置成这个 Entity。

![player-in-inspector](img/player-in-inspector.png)

你的代码可以写成这样：

```js
var Comp = Fire.extend(Fire.Component);

Comp.prop('player', null, Fire.ObjectType(Fire.Entity));

Comp.prototype.onStart = function () {
    Fire.log(this.player.name);
    // ...
};
```

更棒的是，如果你将属性声明为 Component 类型，当你拖动 Entity 到 Inspector，Entity 上指定类型的 Component 将会被设置给属性。这样就能直接获得你需要的  Component 而不仅仅是 Entity。

```js
var Comp = Fire.extend(Fire.Component);

Comp.prop('targetTransform', null, Fire.ObjectType(Fire.Transform));
```

当你要设置一些对象的关联，使用属性是最方便的。你甚至可以将属性的默认值由 `null` 改为数组`[]`，这样你就能在 Inspector 中关联任意多个对象。如果需要在运行时动态获取其它对象，就需要用到下面介绍的查找方法。

### 查找子物体

有时候，游戏场景中会有很多个相同类型的对象，像是炮塔、敌人和特效，它们通常都有一个全局的脚本来统一管理。如果用 Inspector 来一个一个将它们关联到这个脚本上，那么工作将很繁冗乏味。为了更好地统一管理这些对象，我们一般会把它们放到一个单独的父物体下，然后通过父物体来获得所有的子物体。

```js
// CannonManager.js
var Comp = Fire.extend(Fire.Component, function () {
    this.cannons = [];
});

Comp.prototype.onStart = function () {
    this.cannons = this.entity.getChildren();
};
```

**getChildren** 是 Entity 提供的一个方法，可以获得一个包含所有子 Entity 的数组。还可以使用 Entity 的名字来直接获取对应的子物体，只需要在 Entity 的实例上调用 **find** 方法：

```js
this.entity.find('Main Cannon');
```

### 全局名字查找

通过 Fire.Entity.find 这个静态方法就能在整个场景中查找指定的 Entity：

```js
// CannonManager.js
var Comp = Fire.extend(Fire.Component, function () {
    this.player = null;
});

Comp.prototype.onStart = function () {
    this.player = Fire.Entity.find('/Main Player');
};
```

请注意：
- find 既有对象上的实例方法又有类型上的静态方法，两者作用不同，实例方法用于查找子物体，静态方法用于从场景的最上层开始查找全局物体。  
  查找子物体时路径不能以'/'开头，相反的查找全局物体时路径必须以'/'开头。












