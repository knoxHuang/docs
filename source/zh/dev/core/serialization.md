title: 序列化机制
permalink: /zh/dev/core/serialization
---

```
本文档相关代码是 core/src/serialize.js 和 core/src/deserialize.js
所有“备注”都属于进阶内容，初学者不需要了解。
```

Fireball 拥有一套序列化(和反序列化)机制，用于资源的存储和加载。这些操作由编辑器自动完成，本教程只谈一些注意事项。

本文索引：
- [序列化做了什么](#intro)
- [类型注册](#register)
- [自定义序列化内容](#custom)
- [引用](#reference)
- [其它注意事项](#note)

## <a name="intro"></a>序列化做了什么

**序列化**指的是将内存中对象转换成数据(字符串或二进制代码)的过程，**反序列化**则是从保存好的数据重建出原先的对象。  

Fireball 的序列化可以用来储存和读取**任意的** JavaScript 对象，甚至是一整个游戏场景，但用户最关心的一般是序列化自定义的 **Component**。比起 JavaScript 原生的 **JSON**，Fireball 的序列化支持**保存类型、循环引用、引用其它资源、自定义序列化内容**等操作。

## <a name="register"></a>类型注册

Fireball 在序列化时，需要保存数据的**类型名**，该类型可以是任意**全局唯一**的字符串，以便重建对象时查找出对应的构造函数。

- 对 [FireClass](class.md) 而言，就是 define 时传入的第一个参数：
```js
  var Sprite = Fire.define('Company.Sprite');
```
- 对其它 JavaScript 构造函数，可以使用 `Fire.registerClass` 注册类型：
```js
  var Sprite = function () {};
  Fire.registerClass('Company.Sprite', Sprite);
```

- 备注：
    - 如果类型名经过修改，之前已序列化好的内容将无法再加载。
    - 如果某个类型永远不再使用，需要调用`Fire.unregisterClass`进行反注册，否则类型不会被GC。

## <a name="custom"></a>自定义序列化内容

如果只要序列化对象的其中一部分数据，则类型需要声明为 [FireClass](class.md)。  
在 FireClass 中，只有用 [prop](class.md#property) 声明的，并且不指定`Fire.NonSerialized`参数的属性，才会被序列化。  
  反之，**不**序列化的情况有：
  - 所有构造函数中定义的成员变量不序列化。
  - `get` 和 `set` 声明的属性不序列化。
  - `prop` 声明的属性但指定了 `Fire.NonSerialized` 参数的不序列化。

例如，定义一个 Component，它的 `_width` 属性虽然会被序列化，但不在 Inspector 中显示。Inspector 中显示的是 `width`，但其实 `width` 并没保存。
```js
    var Sprite = Fire.define('Sprite', Fire.Component);
    Sprite.prop('_width', 128, Fire.HideInInspector);
    Sprite.getset('width',
        function () {
            return this._width;
        },
        function (value) {
            this._width = value;
            console.log('width changed');
        });
```

- 备注：
	- 如果只想在编辑器下序列化，打包时不序列化，可以在属性上添加 `Fire.EditorOnly` 参数。这个选项用于指定一些只在开发过程中需要保存的属性，当构建项目的发布版本时，这些属性将被剔除以节省体积。

## <a name="reference"></a>引用

- 循环引用

    循环引用指的是，两个或更多对象之间相互引用，形成了引用闭环。Fireball 能完全解决这个问题，循环引用在反序列化后仍然保留，用户不需要关心。

- 重复引用

	- **重复引用问题**  
      如果对同一个 JavaScript object 拥有多处引用，Fireball 在反序列化后将会为每个引用单独创建一个重复的 object。例如：
      ```js
      var array = [1];
      var data = {
          array1: array,
          array2: array,
      };
      ```
      在序列化之前 data.array1 和 data.array2 是同一个数组，对其中一个进行修改另一个也会发生变化。
      ```js
      data.array1.push(2);
      data.array2[1] == 2;	// true
      ```
      但在反序列化 data 之后，将变成：
      ```js
      var data = {
          array1: [1],
          array2: [1],
      };
      ```
      此时 data.array1 和 data.array2 变成了不同的数组，对其中一个进行修改，另一个并不会变化。

	- **解决方法**  
      在 Fireball 里，当用户需要确保某些 object 的引用保持唯一时，只要将它们继承自 **FObject** 即可。（这个问题在同类引擎中普遍存在，但通常很少需要用户关注。）

- 序列化能自动处理所有直接对 Asset 的引用。

- 备注：
	- 对 HTML 节点的引用将被序列化为 null。
    - Fireball 常用的 Entity、Component、Asset 等类型都继承自 FObject。但所有值类型，例如 Fire.Vec2，并没有继承自 FObject。

## <a name="note"></a>其它注意事项

- 对所有需要序列化的对象，例如 Component，**不推荐**声明构造函数。实在有必要，构造函数也只应该作用于初始化**不**序列化的变量。

- 备注：
	- 在反序列化过程中，`Fire._isDeserializing` 将会为 true。
	- 定义原生 JavaScript 的类型时，如果使用[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，则只有 enumerable 为 true 的字段才会被序列化。
