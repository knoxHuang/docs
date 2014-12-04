title: 配置开发环境
permalink: zh/dev/setup
---

## 在 Window 上开发

### 准备

Before working on fireball-x, you need to install [node.js](http://nodejs.org/) v0.10.+
and [atom-shell](https://github.com/atom/atom-shell) latest version.  

- [node.js downloads](http://nodejs.org/dist/)
- [atom-shell downloads](https://github.com/atom/atom-shell/releases)

You also need to install [git for windows](http://msysgit.github.io/) or
[Git Extensions](http://code.google.com/p/gitextensions/), and select **Use Git from the Windows Command Prompt** during the installation,
after installation, remember to reopen all the corresponding explorer windows.

- [git for windows downloads](http://msysgit.github.io/)
- [Git Extensions downloads](http://code.google.com/p/gitextensions/)

After that, you need to install several node tools globally (run with administrator privileges):

```bash
npm install -g gulp
npm install -g bower
```

### 初始化项目仓库

Go to win-utils directory and execute `setup.bat` in it.

The setup.bat will:

- copy batch files to dev
- execute utils/init.sh
- bin\npm install
- bin\bower install
- npm install

###  更新子模块

Make sure your submodules have been checkout to the correct branch. Execute `_git-pull.bat`.
The shell script will:

- go to each submodules and run `git pull` in it.
- Run `node config.js` after all.

### 构建项目

Execute `_gulp.bat`.

### 开发中自动检测文件变化

Execute `_watch.bat`.

See also:

- [Debugging browser process](https://github.com/atom/atom-shell/blob/master/docs/tutorial/debugging-browser-process.md)
- [Node Inspector](https://github.com/node-inspector/node-inspector)
- [Chrome DevTools Overview](https://developer.chrome.com/devtools)
- [Using the Console](https://developer.chrome.com/devtools/docs/console)

### 运行 Fireball

Edit `_fire-editor.bat`, change the `AS_PATH` to the path of your atom-shell.  
You can also change the `PROJ_PATH` to the path of your fireball project.  
Then execute `_fire-editor.bat`.  

**NOTE:**

In dev mode, the foo/bar/foobar.fireball will be created under your `bin/` directory
not relative with your launch path. This is because atom-shell didn't provide
launch path, and process.env.PWD can only work in MacOS/Linux.  

See Also:

- [Atom Shell: How to run apps](https://github.com/atom/atom-shell/blob/master/docs/tutorial/quick-start.md#run-your-app)

## 在 Mac/Unix 上开发

### 准备

Before working on fireball-x, you need to install [node.js](http://nodejs.org/) v0.11.+
and [atom-shell](https://github.com/atom/atom-shell) latest version.

- [node.js downloads](http://nodejs.org/dist/)
- [atom-shell downloads](https://github.com/atom/atom-shell/releases) Download links with "symbols" are for debug purposes.

You also need to install several node tools globally:

```bash
npm install -g gulp
npm install -g bower
```

### 初始化项目仓库

When you clone the repository to your local directory at first time, run the shell script below to init submodules:

```bash
sh utils/init.sh

# go to bin/ directory and run
cd bin/
npm install
bower install
```

The utils/init.sh script will:

- Init submodules
- Update submodules
- Checkout submodules to the master branch
- Run `node config.js` to generate package.json and bower.json from submodules

### 更新子模块

Make sure your submodules have been checkout to the correct branch. Run:

```bash
sh utils/git/pull.sh
```

The shell script will:

- go to each submodules and run `git pull` in it.
- Run `node config.js` after all.

### 构建项目

Run the shell script below will build the project.

```bash
# install gulp dependencies if you are first time get the project
npm install

sh utils/gulp.sh
```

### 开发中检测文件变化

When developing, you can watch the file changes and doing auto build by
run the script:

```bash
sh utils/watch.sh
```

- [Debugging browser process](https://github.com/atom/atom-shell/blob/master/docs/tutorial/debugging-browser-process.md)
- [Node Inspector](https://github.com/node-inspector/node-inspector)
- [Chrome DevTools Overview](https://developer.chrome.com/devtools)
- [Using the Console](https://developer.chrome.com/devtools/docs/console)

### 运行 Fireball

To save typing, we provide simple shell script to run dev version.

```bash
sh utils/fire.sh
```

This will bring up a dashboard for Fireball. You can open existing project or create new Fireball project.

To open your existing project, you can also use command line:

```bash
sh utils/fire.sh path/to/project
```

**NOTE:** You must alias your atom-shell first. To do it, edit your ~/.bash_profile:

```bash
alias atomshell="/Applications/Atom.app/Contents/MacOS/Atom"
```

See Also:

- [Atom Shell: How to run apps](https://github.com/atom/atom-shell/blob/master/docs/tutorial/quick-start.md#run-your-app)
