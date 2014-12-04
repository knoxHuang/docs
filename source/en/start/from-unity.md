title: Unity Developer Readme
permalink: en/start/from-unity
---

虽然 Fireball-x 和 [Unity®](http://unity3d.com/cn/public-relations/brand) 有很多不同之处，但他们都是基于组件进行设计，有一些相似的使用体验。所以 Unity 的相关经验对入门 Fireball-x 有一定帮助，如果你了解过 Unity，那么这篇短文就是为你准备的。  
本文并不从头介绍 Fireball-x，也不完整列举 Fireball-x 和 Unity 的所有不同点。

## 设计上的区别

- Fireball-x 的屏幕坐标(Viewport和Screen)都以左上角做为(0, 0)点。(Unity是以左下角)
- Fireball-x 的 NonSerialize 的字段也**可以**显示在 Inspector 中。(Unity不会)
- Fireball-x **可以**在 Inspector 中访问由 getter/setter 定义的属性。(Unity不行)

## API上的区别

- Fireball-x 的方法在命名上都以小写字母开头。
- Fireball-x 对象的基类是 Fire.FObject。（Unity是UnityEngine.Object）
- Fireball-x 销毁对象时不是调用 Object.Destroy(obj)，而是直接 **obj.destroy()**。
- Fireball-x 判断物体是否已被destroy，不能直接写 if (obj) ...，而要写 if (obj.isValid) 或 **Fire.isValid(obj)**。obj.isValid 只适用于 obj 的引用不为空的情况。
- Fireball-x 使用 **Entity** 来命名场景实体。（Unity叫做GameObject）
- Fireball-x 使用 **Entity.active** 来读取和设置 entity 自己的激活状态。（Unity使用activeSelf）
- Fireball-x 的组件只有 Component <del>和 Behaviour</del>，没有 MonoBehaviour。
- Fireball-x 如果要添加一个类型为 Camera 的 Component，用的是 entity.addComponent(Camera)。
- Fireball-x 由 Entity 来维护父子关系，而 Unity 由 Transform 来维护。Fireball-x 直接通过 **Entity.parent** 来获得和修改父物体，并且 children 和 sibling 等有关接口也直接通过 Entity 来访问。
- Fireball-x 的 **Transform.position** 是相对父物体的本地坐标，不是世界坐标。同理，rotation 和 scale 也均是本地坐