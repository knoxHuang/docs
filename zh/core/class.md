# 类型定义(Class Definition)

`本文档对应源代码在 core\src\class.js`

Fireball-x 的数据类型(Class)使用 **FIRE.define** 进行定义，以便简化继承、支持序列化、定义属性等。为了方便区分，这些类叫做**FireClass**。  

本文索引：
- [定义FireClass](#define)
- [成员](#member)
- [继承](#inherit)
- [属性(Property)](#property)
- [访问器](#accessor)
- [反注册](#unregister)

## <a name="define"></a>定义FireClass

- 调用 FIRE.define 来定义FireClass，传入的类名将用于反序列化。
```js
    var Sprite = FIRE.define('Sprite');
```
以上代码定义了 Sprite 这个 FireClass，FireClass 其实就是一个 javascript 构造函数，只不过包含了额外的接口和数据。

- **实例化**时采用
```js
    var obj = new Sprite();  // 和 javascript 一样
```

## <a name="member"></a>成员

- 如果要定义**成员变量**，可以在define时传入一个构造函数，在构造函数中添加成员变量。
```js
    var Sprite = FIRE.define('Sprite', function (url) {
        // 添加成员变量
        this.url = url;
        this.id = -1;
    });
    // 测试
    var obj = new Sprite('img/fb.png');
    obj.url = 'www/' + obj.url;
```

- 如果要添加**实例方法**，做法和javascript一样。
```js
    // 实例方法
    Sprite.prototype.load = function () {
        // load this.url
    };
```

- 如果要添加**静态变量**或**静态方法**，做法和javascript一样。
```js
    // 静态变量
    Sprite.count = 0;
    // 静态方法
    Sprite.getBounds = function (spriteList) {
        // do get bounds ...
    };
```

- 完整代码如下
```js
    var Sprite = FIRE.define('Sprite', function (url) {
        this.url = url;    // 声明成员变量
        this.id = Sprite.count;    // 访问静态变量
        ++Sprite.count;
    });

    // 静态变量
    Sprite.count = 0;

    // 静态方法
    Sprite.getBounds = function (spriteList) {
        // do get bounds ...
    };

    // 实例方法
    Sprite.prototype.load = function () {
        // do load this.url
    };

    // 实例化
    var obj = new Sprite('img/fb.png');
    // 访问成员变量
    obj.url = 'www/' + obj.url;
    // 调用实例方法
    obj.load();
    // 调用静态方法
    obj.getBounds([obj]);
```

- 备注：
  - 这样定义的所有实例和静态成员都将被子类继承。
  - 如果不希望静态成员被子类继承，可以用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 声明静态成员：
  ```js
    Object.defineProperty(Sprite, 'getBounds', {
        value: function (spriteList) {
            // do get bounds ...
        },
        writable: true,
        enumerable: false
    });
  ```
  - 如果要定义**私有**成员，不建议在Sprite上声明，建议用闭包(Closure)实现。
  ```js
    // 私有实例方法
    var _loadSprite = function (self) {
        // do load ...
    };
    Sprite.prototype.load = function () {
        _loadSprite(this);
    };
    
    // 私有静态变量
    var _debug = false;
    
    // 私有静态方法
    var _getBound = function (spriteList) {
        // do get bound...
    };
    Sprite.getBounds = function (spriteList) {
        if (_debug) {
            _getBound(spriteList);
        }
    };
  ```
  - 这里所说的`实例成员`(instance member)包含了`成员变量`(member variable)和`实例方法`(instance method)。
  - 这里所说的`静态成员`(static member)包含了`静态变量`(static variable)和`静态方法`(static method)。

## <a name="inherit"></a>继承

- 调用 FIRE.define 时，第二个参数如果传入的是 FireClass，将从 FireClass 派生出一个子类。
```js
    var Node = FIRE.define('Node');
    var Sprite = FIRE.define('Sprite', Node);    // Inherit
    var obj = new Sprite();    // test
    console.log(sprite instanceof Node);    // true
```

- 还可以将构造函数作为第三个参数传入，此时第二个参数可以不必是 FireClass，只要是任意 javascript 构造函数。
```js
    var Sprite = FIRE.define('Sprite', Node, function (url) {
        this.url = url;
    });
```

- 调用父类的构造函数

  - 如果你省略了子类的构造函数，实例化时父类的构造函数将被自动调用。参数将一并传给父构造函数。
  ```js
    var Node = FIRE.define('Node', function (name, id) {
        this.name = name;
        this.id = id;
    });
    var Sprite = FIRE.define('Sprite', Node);
    var obj = new Sprite('player', 250);
    console.log(obj.name);    // player
    console.log(obj.id);      // 250
  ```

  - 如果子类有自己的构造函数，则父类的构造函数需要子类显式调用。
  ```js
    var Sprite = FIRE.define('Sprite', Node, function (id) {
        Node.call(this, 'player', id);
    });
    var obj = new Sprite(250);
    console.log(obj.name);    // player
    console.log(obj.id);      // 250
  ```

- FireClass 提供了 `$super` 这个静态变量，保存了对父类的引用。因此父类也可以用 $super 代替：
```js
    var Sprite = FIRE.define('Sprite', Node, function (id) {
        Sprite.$super.call(this, 'player', id);
    });
    Sprite.prototype.draw = function () {
        console.log('before draw');
        Sprite.$super.prototype.draw.call(this);
        console.log('after draw');
    };
```

- FIRE 提供了 `superof` 和 `childof` 两个函数用于类关系检查。

**注意**: 类关系检查的传入参数是类constructor本身而不是实例。请不要和 `instanceof` 搞混。
例如我们定义了:

```js
var Texture = FIRE.define('Texture');
var Texture2D = FIRE.define('Texture2D', Texture);
```

可以通过以下代码得到两个类定义之间的关系:

```js
var result1 = FIRE.childof( Texture2D, Texture );
var result2 = FIRE.superof( Texture, Texture2D );
```

而他们的实例，则需用用以下代码来检查关系:

```js
var tex = new Texture2D();
var result = tex instanceof Texture;
```

**注意2**: `childof` 和 `superof` 不会检查同级关系。当你以下代码时，返回结果是 false:

```js
FIRE.childof( Texture2D, Texture2D );
```

`childof` 和 `superof` 通常用于你将某个 constructor 作为变量存储，在运行时调用这个 constructor
变量实例化时进行的一些类型检查。比如实例化前，希望判断以下这个 constructor 是否继承自某个class，
以防止我们将不必要的类型实例化。

- 备注：
  - 当省略第三个参数时，如果第二个参数传入的是一个普通的 javascript 构造函数，就是定义新类而不是继承。
  - 当你的基类不是 FireClass 时，如果你希望派生的子类是 FireClass，则必须提供第三个参数，如果你想省略构造函数，可以传入`null`。
  - 当你希望子类仅仅是原始的 javascript 构造函数，而不是 FireClass 时，你应该调用的是 FIRE.extend 而不是 FIRE.define。FIRE.extend 更加底层，只是实现最基本的继承，详细用法请查看相关 api。

## <a name="property"></a>属性(Property)

FireClass 提供了 **prop** 方法用于声明属性(property)。属性是特殊的成员变量，能够显示在 Inspector 中，也能被**序列化**。
- prop方法的第一个参数是属性映射到代码里的成员变量名，第二个是属性的默认值，默认值可以是任意类型。  
```js
    var Sprite = FIRE.define('Sprite');
    Sprite.prop('width', 128);
```
以上代码定义了 width 属性，width 将显示在 Inspector，保存时也将被序列化。

- FireClass 在实例化前将自动添加属性到成员变量，可以在包括构造函数在内的代码里直接访问。
```js
    var Sprite = FIRE.define('Sprite', function () {
        console.log(this.width);    // 128
    });
    Sprite.prop('width', 128);
    Sprite.prototype.getWidth = function () {
        return this.width;
    };
```

- 每个属性可附加任意多个**参数**(Attribute)，用于指定在Inspector中的显示方式、序列化方式等。详细的属性列表，请查阅有关文档(TODO)。
```js
    Sprite.prop('width', 128, FIRE.Integer, FIRE.Tooltip('The width of sprite'));
```
以上代码规定了 width 在 Inspector 里只能输入整数，并且当鼠标移到参数上时，弹出对应的介绍。

- 属性默认情况下都会被序列化，也会在inspector中显示。
  - 如果只想序列化，但不想显示在 Inspector，可以指定 `FIRE.HideInInspector` 参数。  
    `Sprite.prop('id', 0, FIRE.HideInInspector);`
  - 如果不想序列化，只想显示在 Inspector，可以指定 `FIRE.NonSerialized` 参数。  
    `Sprite.prop('url', 0, FIRE.NonSerialized);`
  - 如果不想序列化，也不想显示在 Inspector，那可以同时传入 FIRE.NonSerialized 和 FIRE.HideInInspector。  
    (但这就和直接把变量定义在构造函数里没区别，不使用属性也可以。)
  - 如果只想在编辑器下序列化，打包时不序列化，可以指定 `FIRE.EditorOnly` 参数。这个选项用于指定一些只在开发过程中需要保存的属性，当构建项目的发布版本时，这些属性将被跳过以节省包的大小。

- 属性都能被继承，但子类和父类的属性不能重名。

- 备注：
  - 如果属性的默认值需要调用其它方法才能获得，可以在构造函数里重新赋值。
  ```js
    var Sprite = FIRE.define('Sprite', function () {
        this.img = LoadImage();
    });
    Sprite.prop('img', null);
  ```
  - FireClass 的接口都支持链式调用，即
  ```js
    var Sprite = FIRE.define('Sprite', Component, function () {
                          this.id = 0;
                      })
                     .prop('width', 128, FIRE.Integer, FIRE.Tooltip('The width of sprite'))
                     .prop('img', null)
                     .get('color', function () {
                          return this._color;
                      });
  ```
  - 如果要显示在 Inspector，实际上 Sprite 还需要继承自 Component，然后添加到 Entity 上。

## <a name="accessor"></a>访问器

访问器(Accessor)就是 **getter** 或 **setter**。在 javascript 中，可以用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 声明访问器。  

FireClass 封装了定义访问器的接口，这些接口和`prop`类似。访问器定义的值默认将显示在 Inspector 中，但它们不能也不会被序列化。

- FireClass提供了 **get** 方法用于声明一个 getter。  
它的第一个参数是访问器的变量名，第二个是用于获取值的方法，该方法可以返回任意类型的值。  
```js
    var Sprite = FIRE.define('Sprite');
    Sprite.get('width', function () {
        return 128;
    });
```  
以上代码定义了 width 的 getter，getter 可以在包括构造函数在内的代码里直接访问，例如：
```js
    var Sprite = FIRE.define('Sprite', function () {
        this._width = 128;
        console.log(this.width);    // 128
    });
    Sprite.get('width', function () {
        return this._width;
    });
    var obj = new Sprite();
    console.log(obj.width);    // 128
```
和 `prop` 一样，get 可附加任意多个参数(Attribute)，用于指定在 Inspector 中的显示方式。
```js
    Sprite.get('width', function () {
        return this._width;
    }, FIRE.Integer, FIRE.Tooltip('The width of sprite'));
```
以上代码规定了 width 在 Inspector 里只能输入整数，并且当鼠标移到参数上时，弹出对应的介绍。  

- **set**  
set 方法和 get 类似，它的第一个参数是访问器的变量名，第二个是用于设置值的方法，该方法可以传入一个任意类型的参数。  
set 方法不能附加任何参数(Attribute)，如果需要，请由相应的 get 方法传入参数。如果没有对应的 get，则不在 Inspector 中显示。
```js
    var Sprite = FIRE.define('Sprite');
    Sprite.get('width', function () {
        return this._width;
    }, FIRE.Integer);
    Sprite.set('width', function (value) {
        this._width = value;
        this._changed = true;
    });
```

- **getset**  
可使用 getset 合并 get 和 set 调用
```js
    var Sprite = FIRE.define('Sprite');
    Sprite.getset('width',
        function () {
            return this._width;
        },
        function (value) {
            this._width = value;
            this._changed = true;
        },
        FIRE.Integer);
```

- 访问器不能和属性(prop)重名。

- 访问器都能被继承，但子类和父类的访问器不能重名。

- 备注：
  - 如果访问器附带了`FIRE.HideInInspector`参数，则不在 Inspector 中显示，但仍然能从代码访问。
  - 如果一个 getter 没有相应的 setter，则在 Inspector 中是只读的，但它如果是对象或数组，内部的字段仍然可修改。

## <a name="unregister"></a>反注册
(TODO)
