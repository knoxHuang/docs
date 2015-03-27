# Fireball-x Documentation

![Circle CI](https://circleci.com/gh/fireball-x/docs.svg?style=svg&circle-token=943e84c36e9a8e6cdeaf15cca651c526a687b0e9)

This is the documentation site for Fireball-x Engine. [Fireball Documentation](http://fireball-x.github.io/docs)

## Getting Started

This documentation site is powered by [Hexo](http://hexo.io), it's a Node.js based static site generator. You can either add or modify markdown file directly in Github or [Prose](http://prose.io) if you have the author access. Or you can clone the repo and setup Hexo on your local machine to modify the content, structure or functionality of the site.

## Start Writing on the Fly

Simply click the link "Edit This Page" on the bottom of each article to jump to the [Prose.io](http://prose.io) editor of the current page. You can also just go around in github web interface and add/delete/modify any markdown files you want.

**Note:** you will need author access to the repo and also you need to give access to prose.io github app.

### Create New File/Folder

To create a file. Open up [project page in Prose.io](http://prose.io/#fireball-x/docs) and click `New File` button in the right folder.

<img src="/source/media/prose_new_file.png" alt="Prose add new file" width="300">

Edit the path field of the file so it presents the destination of the file on this repo exactly:

<img src="/source/media/prose_set_path_and_front_matter.png" alt="prose_set_path_and_front_matter" width="300">

To add file link to navigation sidebar, simple click the "Edit Navigation" link at the bottom of the sidebar. This will open up `themes/hexo/_config.yml`. See section **Menu And Sidebar** below for more details.

<img src="/source/media/prose_edit_navigation.png" alt="prose_edit_navigation" width="150">

### Add Image File

Click the "Insert Image" button in Prose.io editor. You will see a dialog like this:

<img src="/source/media/insert_image_in_prose.png" alt="Insert Image in Prose.io" width="300">

You can browse image files from your local folder. Once you select an image to upload, make sure you change the "Image URL" text field so it saves image to `/source/media` folder. You can also specify subfolder if you have a lot image to upload.

Then you can click "Insert" button, this will trigger a commit and push to the `master` branch with the image file uploaded.

Once the upload is done, you will see your image link inserted into the text. Currently there's a bug dealing with the link of uploaded image. So you need to modify the link manually so it looks like `/docs/media/image-name` (file name must have extension).

**Note** Do not drag-n-drop image into Prose.io editor. It's currently buggy with this project.

### Auto Deployment

Once you done with your changes, simple commit your changes to github's `master` branch. You don't need to worry about the deployment at all. Continuous Integration service will watch for `master` branch changes and deploy it automatically to github pages.

Although the build and deploy process may take a couple of minutes to complete. So you may have to wait a while before seeing your changes go live.

If build or deployment failed. You will see a red badge on top of this readme file. Ask the owner of this repo for help.

## Setting Up Hexo

### Requirements

- [Node.js](http://nodejs.org/) 0.10.*
- [Git](http://git-scm.com/)

### Install Hexo

`npm install -g hexo@2.8.3`

**For Mac users**

You may encounter some problems when compiling. Please install Xcode from App Store first. After Xcode is installed, open Xcode and go to Preferences -> Download -> Command Line Tools -> Install to install command line tools.

### Setup

Clone this repo:

``` bash
git clone git@github.com:fireball-x/docs.git <repo folder>
cd <repo folder>
npm install
```

## Usage

### Preview

`hexo server`

This will start a server at `localhost:4000` with watch.

### Create A New Page

Name your page file `page-name.md` and put it into `source` folder. Do not use hexo command line to create new page.

Because the documentation is multi-language and we put all doc pages into `source/en` and `source/zh` folder. You may want to add the page manually by your text editor or file system so you can specify the folder correctly.

### Front-matter

Every page must start with a block wrapped with `---` in front of the file. Like this:

``` yaml
title: Page Title
permalink: page-link
---
```

### Code Highlighting

<pre>
``` [language] [title] [url] [link text]
code snippet
```
</pre>

## Menu And Sidebar

To modify top menu and sidebar menu, all you need to do is modify the `themes/hexo3/_config.yml` YAML file.

``` yaml
menu:
    Home: http://fireball-x.com
    Docs: /docs/
    API: /docs/api
    中文: /docs/zh

doc_sidebar:
    Getting Started:
        Overview: index.html
        Setup: en/setup
        Help: en/help
doc_sidebar_zh:
    新手上路:
        简介: zh/index.html
        设置: zh/setup
        帮助: zh/help
```

Keys in root level represents different menu. Keys with indention are menu categories and menu items. Menu items has value as the link url. You only need to write the relative path to `/docs`.

### Multi-language

The site is built with English and Chinese language. All documentation markdown files are put into `en` and `zh` folder respectively to their written language. As of menu, we created different menus for different language. See `doc_sidebar` and `doc_sidebar_zh`. They have different keys as their display text in the menu and different links to their respective language version.

## Deployment

Just commit your changes in `master` branch and push it to github. The CI service we use will handle the deployment automatically.

## Help

Any problem, create an issue or send a mail to `nantas@gmail.com`

## Hexo Tips

### Url Related Variables

In [Hexo Documentation Variable Section](http://hexo.io/docs/variables.html) there're several url related variables, which the documentation didn't give clear examples. And in case of a doc page of Fireball documentation site (front-matter defined permalink: `/zh/dev/editor/share`), each variables output following result:

- page.path: `/zh/dev/editor/share/index.html`
- page.permalink: `http://fireball-x.com/docs//zh/dev/editor/share/index.html`
- url_for(page.path): `/docs/zh/dev/editor/share/index.html`
