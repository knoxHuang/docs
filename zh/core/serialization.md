# 序列化机制(Serialization)

`本文档相关代码是 core/src/serialize.js 和 core/src/deserialize.js`

Fireball 拥有一套序列化(和反序列化)机制，用于资源的存储和加载。这些操作由编辑器自动完成，因此本教程不介绍 API，只谈一些使用上的事项。

本文索引：
- [序列化做了什么](#intro)
- [循环引用](#reference)
- [自定义序列化内容](#customization)
- [注册类型](#type)

## <a name="intro"></a>序列化做了什么

Fireball 的序列化可以用来储存和读取任意的 JavaScript 对象，甚至是一整个游戏场景，但用户最关心的一般是序列化自定义的 **Component**。比起 JavaScript 原生的 **JSON**，Fireball 的序列化支持**保存类型、循环引用、引用其它资源、用户定义序列化内容**等操作。

## <a name="intro"></a>循环引用




