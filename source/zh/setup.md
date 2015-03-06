title: 配置开发环境
permalink: zh/dev/setup
toc: false
---

## 环境配置

### 准备工作

在配置 Fireball 开发环境之前，需要先安装 [node.js](http://nodejs.org/) v0.10.+

 - [node.js 下载](http://nodejs.org/)

你还需要安装 [git](http://git-scm.com/)。

> 如果你使用 **Windows** 操作系统，安装 git 时请选择 **Use Git from the Windows Command Prompt**， 安装之后请重新启动所有打开的命令行窗口和文件资源浏览窗口。

 - [git 下载](http://git-scm.com/download/win)

之后你还需要安装一些全局的 npm 命令行工具（windows 用户请使用有管理员权限的命令行来安装）：

```bash
npm install -g gulp
npm install -g bower
```

接下来 clone 本仓库，然后在命令行窗口中进入你 clone 好的 `dev` 文件夹，并执行下面的命令来安装 gulp 任务的依赖：

```bash
node gulp-setup.js
```

### 初始化项目

执行下面的命令来设置项目的开发环境：
```bash
gulp bootstrap
```

这个 gulp 任务会按顺序执行下面的操作：

- 根据`common.json`中的定义，添加和初始化所有 submodule 子模块
  - `git submodule add` 新增所有 submodule
  - `git submodule init` 初始化所有 submodule
  - `git submodule update` 完成 submodules 的 clone
- 经用户许可，将所有 submodule checkout 到 master 分支（如果你在 submodule 的其他分支上工作，请先提交自己的工作再进行更新）
- 对每个子模块和根目录执行`git pull`更新到 master 分支的最新提交
- 运行 `node config.js` 来根据每个 submodule 的依赖生成 `package.json` 和 `bower.json` 文件
- 安装 bower 依赖到`bin/ext`文件夹下
- 安装 npm 依赖到`bin/node_modules`目录下（不包括 native module）
- 在根目录运行`npm install`安装构建任务依赖
- 使用`gulp build`构建 fireball 项目
- 从国内镜像下载最新的 fire-shell 可执行文件到 `bin/fire-shell` 文件夹
- 从国内镜像下载对应版本的 native modules 到 `bin/node_modules` 文件夹

### 运行 Fireball

```bash
gulp run
```
这个命令会启动 Fireball 编辑器的 Dashboard 界面，你可以在此界面新建项目或打开已有项目。

关于运行 Fireball 的技术细节，请参考：

 - [Atom Shell: How to run apps](https://github.com/atom/atom-shell/blob/master/docs/tutorial/quick-start.md#run-your-app)


### 更新 Fireball

```bash
gulp update
```

这个命令除了不会对 submodule 进行添加和初始化操作以外，其他功能和`gulp bootstrap`是一样的，所以 **如果项目中新添加了 submodule，请使用`gulp bootstrap`来进行更新** 。

有些时候 gulpfile 的结构和依赖会发生变更，如果运行 gulp 命令出现缺少依赖的情况，请先执行：
```bash
node gulp-setup.js
```

### 构建项目

初始化或更新项目后，脚本会自动帮你构建项目，如果你想要手动构建，请使用下面的命令：

```bash
gulp build
```

这个命令的操作：
- 在每个 submodule 的文件夹下执行`gulp dev`构建开发版文件
- 将每个 submodule 的`bin`文件夹中构建好的文件拷贝到根目录的`bin`下


### Forked Repo 注意事项

使用`gulp bootstrap`或`gulp update`更新项目时，会在根目录执行`git pull git@github.com:fireball-x/dev.git`，也就是说对于 forked repo 来说，执行这些命令会自动同步主repo的更新。

**如果你不希望合并主 repo 的更新，请使用下面的命令来获取更新：**
```bash
gulp pull-sub
git pull someOrigin
```
其中`someOrigin`可以是你自己的 forked repo，也可以是其他人的 fork，详细解释见[工作流程指南中Fork同步方法](https://github.com/fireball-x/dev/blob/master/CONTRIBUTING.md#%E5%90%8C%E6%AD%A5%E6%96%B9%E6%B3%95)。

之后用下面的命令来完成依赖构建和项目构建
```bash
gulp rebuild-dependency
gulp build
```

### 开发时自动构建和 Debug

开发过程中执行下面的命令:

```bash
gulp watch
```

这个命令会 watch 源代码的变化并随时运行相应的构建命令，让你的修改随时体现在运行中的编辑器上。

关于 Debug 方法，请参考:

 - [Debugging browser process](https://github.com/atom/atom-shell/blob/master/docs/tutorial/debugging-browser-process.md)
 - [Node Inspector](https://github.com/node-inspector/node-inspector)
 - [Chrome DevTools Overview](https://developer.chrome.com/devtools)
 - [Using the Console](https://developer.chrome.com/devtools/docs/console)


### 开发 `module/` 文件夹下的 npm module

如果你在开发`module`文件夹下的 node module，你可以执行下面的脚本来链接本地开发中的 module 到`bin/node_modules`下，避免在本地反复进行`npm publish`和`npm install`的操作：

```bash
sh utils/npm/link.sh
```

不过链接的文件要求你事先进行手动编译，流程参考如下：

```bash
cd module/${your.module}
export npm_config_disturl=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist
export npm_config_target=${fire.shell.version}
export npm_config_arch=ia64
HOME=~/.atom-shell-gyp npm install .
```

### 切换 Fire-shell 和 Atom-shell 可执行文件

[Fire-shell](https://github.com/fireball-x/atom-shell) 是 [Atom-shell](https://github.com/atom/atom-shell) 的 fork，Fireball 项目使用 fire-shell 作为可执行文件来运行。Fire-shell 的版本号是跟随 Atom-shell 的，一般会落后若干版本。

如果你需要测试 atom-shell 的最新版本和功能，首先 **修改`gulpfile.js`中的`atomVersion`变量**，设置一个你要获取的 atom-shell 版本号，然后执行下面的命令：

```bash
gulp del-native-module
gulp update-atom-shell
gulp update-atom-native-module
gulp run-atom
```

这一组命令会依次：
- 删除`bin/node_modules`文件夹下的 native module
- 下载 atom-shell 并放进`bin/atom-shell`文件夹
- 执行`node config.js true`，把 native modules 加入到 `bin/package.json`
- 在`bin`下执行`export ATOM_NODE_VERSION=${your.version.number}`
- 在`bin`下执行`apm install`，安装并根据 atom-shell 版本号重新编译 native modules

如果要切换回 fire-shell，请执行：
```bash
gulp del-native-module
gulp update-fire-shell-china
gulp update-fire-native-module-china
gulp run
```

### 选择下载 Fire-shell 和 Native module 的镜像

#### 从国内镜像下载

默认的`gulp bootstrap`任务会自动从国内镜像服务器上下载 fire-shell 和 native module 的最新版本。

你也可以用以下命令手动下载：

```bash
gulp update-fire-shell-china
```
```bash
gulp update-fire-native-module-china
```

#### 从 Github 下载

如果你在墙外，你可以使用下面的初始化命令和下载命令，这些命令会从 github 上下载 fire-shell 和 native module。

初始化：

```bash
gulp bootstrap-freeworld
```

手动下载：

```bash
gulp update-fire-shell
```
```bash
gulp update-fire-native-module
```

### 添加新模块流程

Fireball 使用的模块包括 `src`, `builtin`, `module`三类，在其中任何一个文件夹下新增 submodule 的时候，请

- 在`common.json`文件夹的对应变量中增加子模块的名称
- 运行`gulp checkout`测试是否能将新增的子模块检出到`master`分支
- 运行`gulp build`和`gulp build-min`测试能否正常 build 新增子模块的内容到`bin`目录下


## Gulp 任务列表

下面列出其他还没有介绍过的 gulp 任务，一般情况下开发者不需要执行这些任务，但如果你使用标准流程时遇到了问题（比如网络链接问题、运行环境错误等），使用这些分解任务可以帮你从这些中间状态里走出来。

#### copy

从 `src/bin` 中拷贝子模块的构建文件到根目录的 `bin`.

#### clean

删除`copy`任务中拷贝的文件，让你重新开始。

#### init

对刚 clone 出的项目添加和初始化 submodule，并检出`master`分支。

#### checkout

对每个 submodule 检出`master`分支。

#### pull

对每个 submodule 执行`git pull`，最后在根目录执行`git pull git@github.com:fireball-x/dev.git`从主版本拉取更新。

#### pull-sub

对每个 submodule 执行`git pull`，不在根目录下进行更新。

#### add-all-submodule

如果项目更新包括新增未初始化的 submodule，可以执行此命令来添加 submodule。

#### del-native-module

删除`bin/node_modules`下的所有native module，避免运行`npm install`时会对已有 native module 进行编译。

#### config-dependency

执行`node config.js`来根据所有 submodule 的依赖生成`bin`目录下的`package.json`和`bower.json`。

#### apm-install

在 `bin` 文件夹下根据 `bin/package.json` 安装 npm 依赖。（不包括 native module）

#### bower-install

在`bin`文件夹下根据 `bin/bower.json` 按照 bower 依赖。

#### dev-dependency

在根目录下执行`npm install`，来安装 gulp 构建任务依赖。

#### make-dist

在 `dist` 文件夹下构建一个 Fireball 发布版本。

#### run-dist

运行`dist`文件夹下的 Fireball 发布版。

#### run-default

快速打开位于 `bin/projects/default` 的默认项目，如果该项目不存在，这个任务会自动创建一个。

#### clear-cached-downloads

从用户的缓存文件夹中删除 fire-shell 和 native module。如果之前下载的文件有误，就可以执行这个命令来清除缓存。

## Fork 工作流程

请仔细阅读[开发工作流程指南中的 Fork 流程和规范](https://github.com/fireball-x/dev/blob/master/CONTRIBUTING.md#fork%E6%B5%81%E7%A8%8B%E5%92%8C%E8%A7%84%E8%8C%83)。

## Troubleshooting

#### 在 watch 整个 project 时出现 FSEventStream Error

Mac 下 `gulp watch` 整个项目时可能会出现以下错误：
```bash
FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-21)
```

这是一个 nodejs bug https://github.com/joyent/node/issues/5463 . 你可以切换到 nodejs v0.11+ 来修复这个问题。Windows 用户不会受到该 bug 的影响。

#### Please try running this command again as root/Administrator

在 Mac 上如果执行任意任务时出现 `Please try running this command again as root/Administrator` 错误，请参考 [使用NVM重新安装 node](http://stackoverflow.com/a/24404451)。

#### Error: Attempt to unlock someNpmPacakge, which hasn't been locked

在执行包括 `npm install` 的任务时可能会发生。

通常是由于你有其他程序在访问或使用`node_modules`文件夹造成的，你可以检查后台进程，关闭可能引起问题的命令行窗口和文本编辑器。

#### Cannot find module '**/gulp/node_modules/v8flags/cache/*.*.*.flags.json'

这个错误会在切换过 nodejs 版本后使用 gulp 时发生，你应该先卸载 gulp： `npm rm -g gulp` ，在关闭当前命令行窗口后运行 `npm install -g gulp`重新安装 gulp。

#### 'bin/fire-shell/Fireball.app/Contents/MacOS/Fireball': No such file or directory

这个错误是由于你的程序损坏或丢失引起的。你可以运行 'gulp clear-cached-downloads' 和 'gulp update-fire-shell-china' 来重装 fire-shell。

#### 获取 fire-shell 下载时出现 TypeError: Object #<Download> has no method 'use' 或 undefined is not a function

由于 download 插件作者更新版本导致的 [bug](https://github.com/kevva/download/issues/45) 请更新gulp-download-fire-shell 到最新版本。
```bash
npm install gulp-download-fire-shell
```

#### gulp update-xxxx-shell 时报错：Error: getaddrinfo ENOTFOUND xxx.xxx.xx.xx.xxxx.com

可能是网络不稳定，请重试几次

