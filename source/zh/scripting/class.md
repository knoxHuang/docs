title: 类型定义
permalink: zh/scripting/class
---

```
所有“备注”都属于进阶内容，初学者不需要了解。
```

**Fire.Class** 是一个很常用的 API，它用来声明 Fireball 中的类，为了方便区分，我们把使用 Fire.Class 声明的类叫做 **FireClass**。想比其它 JavaScript 的类型系统，FireClass 的特别之处在于扩展性强，能够定义丰富的元数据。

## 概述

- 创建Fire.Class

调用 **Fire.Class** 方法，传入一个包含类型定义的字面量对象，就能创建出所需的类。

```js
    var Sprite = Fire.Class({
        name: 'Sprite'
    });
```

这里将创建好的类赋值给了 Sprite 变量。另外可以提供 `name` 参数来作为类名，类名将会用于[序列化](zh/dev/core/serialization#register)。

- 创建对象

由于 FireClass 本身就是一个 JavaScript 构造函数，使用 new 就可以创建对象：

```js
    var obj = new Sprite();
```

- 构造函数

FireClass 还允许你提供 `constructor` 参数来定制你的**构造函数**，构造函数将在每个实例的创建过程中调用，FireClass 的构造函数**不允许定义构造参数**。

```js
    var Sprite = Fire.Class({
        constructor: function () {
            console.log(this instanceof Sprite);    // true
        }
    });
    var obj = new Sprite();
```

- 判断类型

`instanceof` 可以用来判断对象的类型：

```js
    console.log(obj instanceof Sprite);     // true
```

- 备注：
  - 如果不需要序列化，类名可以省略。类名可以是任意字符串，但不允许重复。可以使用 Fire.getClassName 来获得类名，使用 Fire.getClassByName 来查找对应的类。
  - 专业开发者如果确实需要使用构造参数，可以在 constructor 的 arguments 里获取。但如果这个类需要序列化，必须保证构造参数都缺省的情况下仍然能 new 出对象。

## 成员

- **实例变量**请统一在构造函数中声明：

```js
    var Sprite = Fire.Class({
        constructor: function () {
            // 声明实例变量并赋默认值
            this.url = "";
            this.id = 0;
        }
    });
    var obj = new Sprite();
    // 赋值
    obj.url = 'img/fb.png';
    obj.id = 1;
```

- **实例方法**直接像构造函数那样设置：

```js
    var Sprite = Fire.Class({
        constructor: function () {
            // ...
        },
        load: function () {
            // load this.url
        };
    });
    var obj = new Sprite();
    // 调用
    obj.load();
```

- **类变量**或**类方法**请直接添加到 FireClass：

```js
    var Sprite = Fire.Class({...});
    // 类变量
    Sprite.count = 0;
    // 类方法
    Sprite.getBounds = function (spriteList) {
        // ...
    };
```

- 完整代码如下
```js
    var Sprite = Fire.Class({
        name: 'Sprite',
        constructor: function () {
            // 声明实例变量并赋默认值
            this.url = "";
            this.id = 0;
        },
        // 实例方法
        load: function () {
            // load this.url
        };
    });
    // 实例化
    var obj = new Sprite();
    // 访问实例变量
    obj.url = 'sprite.png';
    // 调用实例方法
    obj.load();

    // 声明类变量
    Sprite.count = 0;
    // 声明类方法
    Sprite.getBounds = function (spriteList) {
        // ...
    };

    // 调用类方法
    Sprite.getBounds([obj]);
```

- 备注：
  - 所有实例和类成员都将被子类继承。
  - 如果不希望类成员被子类继承，可以用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 声明：
  ```js
    Object.defineProperty(Sprite, 'getBounds', {
        value: function (spriteList) {
            // do get bounds ...
        },
        enumerable: false
    });
  ```
  - 如果是**私有**成员，建议在成员命名前面加上下划线"_"。
  ```js
    var Sprite = Fire.Class({
        name: 'Sprite',
        constructor: function () {
            // 私有实例变量
            this._myData = 0;
        },
        // 私有实例方法
        _load: function () {
            // ...
        };
    });
    // 私有静态变量
    Sprite._list = [];
  ```
  - 如果是**私有**静态成员，也可以用闭包(Closure)实现。
  ```js
    // 私有静态方法
    var doLoad = function (sprite) {
        // do load ...
    };
    // 私有静态变量
    var url = 'foo.png';

    var Sprite = Fire.Class({
        load: function () {
            // 调用局部作用域内的方法
            doLoad(this, url);
        };
    });
  ```
  - 这里所说的`实例成员`(instance member)包含了`实例变量`(member variable)和`实例方法`(instance method)。
  - 这里所说的`类成员`(static member)包含了`类变量`(static variable)和`类方法`(static method)。

## 继承

- 继承时请将 **extends** 参数设置为父类：

```js
    // define base class
    var Node = Fire.Class();

    // define sub class
    var Sprite = Fire.Class({
        extends: Node
    });

    // test
    var obj = new Sprite();
```

`instanceof` 也可以用来判断对象所在的类型是否继承自某个父类：

```js
    var sub = new Sprite();
    console.log(sub instanceof Node);       // true
    var base = new Node();
    console.log(base instanceof Sprite);    // false
```

- 父构造函数

请注意，不论子类的构造函数是否提供，子类实例化前父类的构造函数都会先被自动调用。

```js
    var Node = Fire.Class({
        constructor: function () {
            this.name = "node";
        }
    });
    var Sprite = Fire.Class({
        extends: Node,
        constructor: function () {
            // 子构造函数被调用前，父构造函数已经被调用过，所以 this.name 已经被初始化过了
            console.log(this.name);    // "node"
            // 重新设置 this.name
            this.name = "sprite";
        }
    });
    var obj = new Sprite();
    console.log(obj.name);    // "sprite"
```

- 重载

  - 所有实例方法都是虚方法，子类方法可以直接重载父类方法：

    ```js
        var Node = Fire.Class({
            getName: function () {
                return "node";
            }
        });
        var Sprite = Fire.Class({
            getName: function () {
                return "sprite";
            }
        });
        var obj = new Sprite();
        console.log(obj.getName());    // "sprite"
    ```

  - 如果想要调用父类方法，必须直接通过父类的 prototype，并且以 call 或 apply 的形式调用：

    ```js
        var Node = Fire.Class({
            getName: function () {
                return "node";
            }
        });
        var Sprite = Fire.Class({
            getName: function () {
                var baseName = Node.prototype.getName.call(this);
                return baseName + ">sprite";
            }
        });
        var obj = new Sprite();
        console.log(obj.getName());    // "node>sprite"
    ```

- 使用 `Fire.isChildClassOf` 来判断两个类的继承关系：

```js
    var Texture = Fire.Class();
    var Texture2D = Fire.Class({
        extends: Texture
    });
    console.log(Fire.isChildClassOf(Texture2D, Texture));   // true
```

请注意，两个传入参数都必须是类的构造函数，而不是类的对象实例。如果传入的两个类相等，`isChildClassOf` 也会返回 true。

- 备注：
  - 可以通过子类的静态变量 `$super` 来访问父类。
  - 如果你想实现原生的 JavaScript 继承，也就是说你的父类和子类都不是 FireClass，那你可以通过 Fire.JS.extend 方法来继承。

## 属性(Property)

FireClass 提供了 **prop** 方法用于声明属性(property)。属性是特殊的成员变量，能够显示在 Inspector 中，也能被[序列化](serialization.md#custom)。
- prop 需要两个参数，一是属性变量名，二是属性的默认值，默认值可以是任意类型。  
```js
    var Sprite = Fire.define('Sprite');
    Sprite.prop('width', 128);
```
以上代码定义了 width 属性，width 将显示在 Inspector，保存时也将被序列化。

- FireClass 在实例化前将自动添加属性到成员变量，可以在包括构造函数在内的代码里直接访问。
```js
    var Sprite = Fire.define('Sprite', function () {
        console.log(this.width);    // 128
    });
    Sprite.prop('width', 128);
    Sprite.prototype.getWidth = function () {
        return this.width;
    };
```

- 每个属性可附带任意多个**参数**(Attribute)，用于指定在 Inspector 中的显示方式、序列化方式等。详细的属性列表，请查阅有关文档(TODO)。
```js
    Sprite.prop('width', 128, Fire.Integer, Fire.Tooltip('The width of sprite'));
```
以上代码规定了 width 在 Inspector 里只能输入整数，并且当鼠标移到参数上时，显示对应说明。

- 属性默认情况下都会被序列化，**也会**在 Inspector 中显示。
  - 如果只想序列化，但不想显示在 Inspector，可以添加 `Fire.HideInInspector` 参数。  
    `Sprite.prop('id', 0, Fire.HideInInspector);`
  - 如果不想序列化，只想显示在 Inspector，可以添加 `Fire.NonSerialized` 参数。  
    `Sprite.prop('url', 0, Fire.NonSerialized);`
  - 如果不想序列化，也不想显示在 Inspector，可以同时传入 Fire.NonSerialized 和 Fire.HideInInspector。也可以干脆不用属性，直接在构造函数里定义的变量即可。

- 属性都能被继承，但子类和父类的属性不能重名。

- 备注：
  - 如果属性的默认值需要调用其它方法才能获得，可以在构造函数里重新赋值。
  ```js
    var Sprite = Fire.define('Sprite', function () {
        this.img = LoadImage();
    });
    Sprite.prop('img', null);
  ```
  - FireClass 的所有接口都支持链式调用：
  ```js
    var Sprite = Fire.extend('Sprite', Node, function () {
                          this.id = 0;
                      })
                     .prop('width', 128, Fire.Integer, Fire.Tooltip('The width of sprite'))
                     .prop('img', null)
                     .get('color', function () {
                          return this._color;
                      });
  ```
  - 实际上如果要显示在 Inspector，需要定义的是 Component，并且添加到 Entity 上。

## <a name="accessor"></a>访问器

访问器(Accessor)就是 **getter** 或 **setter**。在 JavaScript 中，可以用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 声明访问器。  

FireClass 另外封装了定义访问器的接口，这些接口和`prop`类似，用于在 Inspector 中显示指定值，但这些值不会被序列化。

- FireClass 提供了 **get** 方法用于声明一个 getter。  
它的第一个参数是变量名，第二个是获取时调用的方法，该方法可以返回任意类型的值。  
```js
    var Sprite = Fire.define('Sprite');
    Sprite.get('width', function () {
        return 128;
    });
```  
以上代码定义了 width 的 getter，getter 可以在包括构造函数在内的代码里直接访问：
```js
    var Sprite = Fire.define('Sprite', function () {
        this._width = 128;
        console.log(this.width);    // 128
    });
    Sprite.get('width', function () {
        return this._width;
    });
    var obj = new Sprite();
    console.log(obj.width);    // 128
```
和 `prop` 一样，get 可附加任意多个参数，用于指定在 Inspector 中的显示方式。
```js
    Sprite.get('width', function () {
        return this._width;
    }, Fire.Integer, Fire.Tooltip('The width of sprite'));
```
以上代码规定了 width 在 Inspector 里只能输入整数(如果有 setter 的话)，并且当鼠标移到参数上时，显示对应说明。  

- **set**  
set 方法和 get 类似，它的第一个参数是变量名，第二个是设置时调用的方法，该方法可以传入一个任意类型的参数。  
set 方法不能附加任何参数，如果需要，请把参数加到相应的 get 方法。如果没有对应的 get，则不在 Inspector 中显示。
```js
    var Sprite = Fire.define('Sprite', ...);
    Sprite.get('width', function () {
        return this._width;
    }, Fire.Integer);
    Sprite.set('width', function (value) {
        this._width = value;
    });
```

- **getset**  
可使用 getset 简化 get 和 set 调用
```js
    var Sprite = Fire.define('Sprite', ...);
    Sprite.getset('width',
        function () {
            return this._width;
        },
        function (value) {
            this._width = value;
        },
        Fire.Integer);
```

- 访问器不能和属性(prop)重名。

- 访问器都能被继承，但子类和父类的访问器不能重名。

- 备注：
  - 如果访问器附带了`Fire.HideInInspector`参数，则不在 Inspector 中显示，但仍然能从代码访问。
  - 如果一个 getter 没有相应的 setter，则在 Inspector 中是只读的，但它如果是对象或数组，内部的字段仍然可修改。


