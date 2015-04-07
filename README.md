# Fireball中文文档

这里是Fireball游戏引擎的中文文档资源站。

## Requirements

```
npm install -g gulp
npm install -g hexo-cli
npm install
```

## 预览

```
gulp generate
hexo s
```

## Contributing

### 文档分类

文档目前分为 tutorial，manual, api 三类，分别对应`source`目录下的不同文件夹。
直接在github下的[source/_post]目录下建立表示分类的文件夹，并在里面新建md文件即可添加文档。

### Front-matter

每个文档最前面应该有一组数据定义文档的标题、链接等重要信息，像这样：

```yaml
title: 文档标题
categories: manual
permalinks: manual/group/my-doc-link
---
```

其中：
- title 表示文档标题
- categories 文档分类，在`manual`、`tutorial`、`api`中的一个
- permalinks 表示文章的链接，注意是`permalinks`结尾有s，而且链接的前后都不可以加`/`。

## Troubleshooting


 ### `[Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND'`

 Unknown reason for causing this issue. Reinstall local hexo with `no-optional` param to fix it:

 ```bash
 npm install hexo --no-optional
 ```

 参考 https://github.com/hexojs/hexo/issues/1055
