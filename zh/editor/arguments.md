# Editor 运行参数

## 使用方法

```
Usage: fire [path/to/project.fireball] [options] 
```

## 可选参数

### -D, --showdevtools

开启Editor时自动显示 DevTools

### -v, --version

TODO: 还没有

### -h, --help

TODO: 还没有

## 如何加入新参数

1. 注册参数 

TODO: 暂时还没有这个流程

参数注册中需要记录参数的简写(-f), 扩写(--file)，是否有参数值(--file=args)，
是否约束参数值的输入(file, directory 或者可选列表)，以及help描述。

2. 解析并使用参数

在 Editor 运行后，外部参数会被自动解析到 EditorApp.options 中。我们采用
[minimist](https://www.npmjs.org/package/minimist) 这个模块进行参数的解析。

这个过程在 Editor.init 函数的最开始完成，在 EditorApp.options 生成后，你可以在任何
地方使用你的参数。

