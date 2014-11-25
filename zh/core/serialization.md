# 序列化机制(Serialization)

`本文档相关代码是 core/src/serialize.js 和 core/src/deserialize.js`

Fireball 拥有一套序列化(和反序列化)机制，用于资源的存储和加载。这些操作由编辑器自动完成，因此本教程不介绍 API，只谈一些使用上的事项。

本文索引：
- [序列化做了什么](#intro)
- [引用](#reference)
- [自定义序列化内容](#custom)
- [注册类型](#type)

## <a name="intro"></a>序列化做了什么

Fireball 的序列化可以用来储存和读取任意的 JavaScript 对象，甚至是一整个游戏场景，但用户最关心的一般是序列化自定义的 **Component**。比起 JavaScript 原生的 **JSON**，Fireball 的序列化支持**保存类型、循环引用、引用其它资源、用户定义序列化内容**等操作。

## <a name="intro"></a>引用

- 循环引用
	
    循环引用指的是，两个或更多对象之间相互引用，形成了引用闭环。<del>在同类引擎中，这会导致序列化操作陷入死循环，往往导致很严重的性能问题。</del>Fireball 能完全解决这个问题，用户不需要关心。
    <del>
    以下代码在 a, b, c 之间产生了循环引用。
    var a = {};
    var b = {a: a};
    var c = {b: b};
    a.c = c;
    </del>
    
- 重复引用

	- 重复引用问题
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
      
	- 解决方案
      这个问题在同类引擎中普遍存在，但通常很少需要用户关注。在 Fireball 里，当用户需要确保某些 object 在项目中的引用保持唯一时，只要将它们继承自 **FObject** 即可。
    
- 所有对 Asset 的引用都直接支持，用户无需做任何声明。

- 备注：
	- 对 HTML 节点的引用将被序列化为 null。
    - Fireball 自带的值类型，例如 Fire.Vec2，并没有继承自 FObject。


