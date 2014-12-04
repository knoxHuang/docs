title: Quick Window 初始化流程
permalink: zh/dev/editor/init-quick-window
---

当你点击 FObject 控件的浏览按钮时, 会触发并打开 quick-assets 窗口. 那么 Main Window 是如何初始化 quick-assets 窗口并建立通讯的, 本文主要就是介绍整个 quick-window 的初始化流程.

## 快速浏览资源窗口的初始化流程

 - editor-ui/fobject 中点击触发 browseAction, 调用 Fire.browseObject
 - editor/editor.js 中的 Fire.browseObject 调用 Fire.command( 'window:open' ) 向 editor-core 发出窗口开启请求, 并传入开启窗口的 url, 以及将重要的 typename 信息以 query 的形式传入
 - editor-core/fireball.js 中出入 window:open 请求, 并将 typename 放入新开窗口的 url:query 中
 - 新开窗口读入 main/static/quick-assets.html, 并读入 <quick-assets> 标签. 该标签定义位于 editor/quick-assets/ 中
 - editor/quick-assets/quick-assets.js  中, 在 domReady 时, 解析 url:qurey, 得到 typname 并向 editor-core 发起 'asset-db:query' + typename 的请求. 
 - 等待 'asset-db:query-results' 消息
