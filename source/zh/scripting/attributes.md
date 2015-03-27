title: 属性参数
permalink: zh/scripting/attributes
---

## Inspector 相关属性

这些属性允许用于 get 方法

参数名 | 说明 | 类型 | 默认值
--- | --- |:---:|:---:
[type](/zh/scripting/class#type) | 限定属性的数据类型 | (Any) | undefined
hideInInspector  | 不在 Inspector 面板中显示该属性 | boolean | false
displayName  | 在 Inspector 面板中显示为另一个名字 | string | undefined
tooltip | 在 Inspector 面板中添加属性的 Tooltip | string | undefined
multiline | 在 Inspector 面板中使用多行文本框 | boolean | false
readOnly | 在 Inspector 面板中只读 | boolean | false
nullable | 在该属性的控件前附加一个单选框 | { propName: string, default: boolean } | undefined
watch | 监听其它属性的状态，来刷新本控件 | { "prop names": function (this, uiCtrl) {} } | undefined
range | 以滑动条的形式限定数值的最大最小值 | [min, max] | undefined

## 序列化相关属性

这些属性不能用于 get 方法

参数名 | 说明 | 类型 | 默认值
--- | --- |:---:|:---:
serializable | 不序列化该属性 | boolean | true
editorOnly | 在导出项目前剔除该属性 | boolean | false
rawType | 该属性的类型是宿主平台上的原生对象 | string | undefined
