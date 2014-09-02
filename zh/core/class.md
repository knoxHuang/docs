# 类型定义(Class Definition)

`本文档对应源代码在 core\src\class.js`

Fireball-x 的数据类型(Class)使用 **FIRE.define** 进行定义，以便简化继承、支持序列化、定义属性等。为了方便区分，这些类叫做**FireClass**。

## 定义FireClass

- 调用 FIRE.define 来定义FireClass，传入的类名将用于反序列化。
```js
var Sprite = FIRE.define('Sprite');
```
以上代码定义了 Sprite 这个 FireClass，FireClass 其实就是一个 javascript 构造函数，只不过包含了额外的接口和数据。  
  
- 如果要定义**成员变量**，可以在define时传入一个构造函数，在构造函数中添加成员变量。
```js
var Sprite = FIRE.define('Sprite', function (url) {
    this.url = url;
});
```

- 如果要添加**实例方法**，可以接着定义
```js
Sprite.prototype.load = function () {
    // load this.url
};
```

- **实例化**时采用
```js
var sprite = new Sprite('img/fb.png');
sprite.url = 'www/' + sprite.url;
sprite.load();
```

## 继承

- 调用 FIRE.define 时，第二个参数如果传入的是 FireClass，将从 FireClass 派生出一个子类。(如果传入的是一个普通的 javascript 构造函数，就是定义新类而不是继承。)
```js
var Node = FIRE.define('Node');
var Sprite = FIRE.define('Sprite', Node);    // Inherit
var sprite = new Sprite();    // test
console.log(sprite instanceof Node);    // true
```

- 还可以将构造函数作为第三个参数传入，此时第二个参数可以不必是 FireClass，只要是任意 javascript 构造函数。
```js
var Sprite = FIRE.define('Sprite', Node, function (url) {
    this.url = url;
});
```

- 备注：
  - 当你的基类不是 FireClass 时，如果你希望派生的子类是 FireClass，则必须提供第三个参数，如果你想省略构造函数，可以传入`null`。
  - 当你希望子类仅仅是原始的 javascript 构造函数，而不是 FireClass 时，你应该调用的是 FIRE.extend 而不是 FIRE.define。FIRE.extend 更加底层，只是实现最基本的继承，详细用法请查看相关 api。

## 成员

## 属性

## 序列化

## 反注册
