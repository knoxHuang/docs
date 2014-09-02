# 类型定义(Class Definition)

## Intro

Fireball-x 的数据类型(Class)有一套自己的定义方式，用于支持和简化继承、序列化、属性定义等功能。
定义出来的类就是常规的 javascript 构造函数，只不过包含了额外的配置信息。

## 定义

定义一个新类的方法如下

```javascript
var Sprite = FIRE.define('Sprite');
```

如果要定义成员变量，可以在define时传入一个构造函数

```javascript
var Sprite = FIRE.define('Sprite', function () {
    this.url = 'img/fb.png';
});
```

如果要添加实例方法，可以

```javascript
var Sprite = FIRE.define(...);    // 同上
Sprite.prototype.load = function () {
    // load this.url
};
```

实例化时采用

```javascript
var sprite = new Sprite();
sprite.url = 'www/' + sprite.url;
sprite.load();
```

## 继承

## 成员

## 属性

## 序列化

## 反注册
