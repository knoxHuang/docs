title: Editor启动流程
permalink: zh/dev/editor/editor
---

## 流程

### Editor Core 初始化

通过 main.js 初始化 Editor 内核.

 - 解析 arguments
 - 在 App.ready 时
   - 注册 Protocol ( `fire://`, `library://`, `uuid://`)
   - 初始化 FireApp, 读取 core, editor-share 模块
   - 读取 userProfile ( `fire-app://profile.json` )
 - 如果没有在 arguments 中提供 project 则进入 Dashboard, 否则进入 Fireball

### Fireball 启动流程

 - 实例化 AssetDB, Selection 等模块
 - 检查项目文件夹是否健全
 - 初始化 MainMenu
 - 新建窗口并读取 `fire://static/fireball.html`
 - 等待 ipc 消息 `project:init`

### fireball.html 页面启动流程

 - 加载 `fire://launch.js` 进行页面的基本初始化操作
 - 在 `fireball.html` 的 body 部分, 依次加载
   - 第三方依赖库
   - core, engine, editor-share, editor
   - polymer, editor-ui 以及最终加载 main-window

### main-window 初始化流程

 - 在 domReady 中发送 ipc 消息 `project:init`
   - Editor Core 中初始化 AssetDB
   - 调用 `AssetDB.refreshAll()` 扫描并更新资源
 - 等待 ipc 消息 `project:ready`
   - Import 最基本的 plugins
   - 调用 Plugin 的 `init` 函数完成插件初始化并设置窗口布局
   - 初始化 Fire.Engine
   - 初始化 game view 和 scene view 的 RenderContenxt
   - 完成启动流程
