# 类型定义(Class Definition)

Fireball-x 的数据类型(Class)使用 **FIRE.define** 进行定义，以便简化继承、支持序列化、定义属性等。为了方便，这些类简称**FireClass**。

## 定义FireClass

调用 FIRE.define 来定义FireClass，传入的类名用于反序列化。
```javascript
var Sprite = FIRE.define('Sprite');
```
（返回的Sprite就是普通的 javascript 构造函数，只不过包含了额外的接口和数据。）  
  
如果要定义**成员变量**，可以在define时传入一个构造函数，在构造函数中添加成员变量。
```javascript
var Sprite = FIRE.define('Sprite', function () {
    this.url = 'img/fb.png';
});
```

如果要添加**实例方法**，可以接着定义
```javascript
Sprite.prototype.load = function () {
    // load this.url
};
```

**实例化**时采用
```js
var sprite = new Sprite();
sprite.url = 'www/' + sprite.url;
sprite.load();
```

## 继承

调用 FIRE.define 时，第二个参数如果是一个 FireClass，而不是普通 javascript 方法，将从 FireClass 派生出一个子类。

```js
var Node = FIRE.define('Node');
var Sprite = FIRE.define('Sprite', Node);    // Inherit
var sprite = new Sprite();    // test
console.log(sprite instanceof Node);    // true
```

## 成员

## 属性

## 序列化

## 反注册
