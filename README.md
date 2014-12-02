# Fireball-x Documentation

[ ![Codeship Status for fireball-x/docs](https://codeship.com/projects/ccff76b0-59bb-0132-c1ec-123ab8314f17/status)](https://codeship.com/projects/50304)

This is the documentation site for Fireball-x Engine.

## Getting Started

This documentation site is powered by [Hexo](http://hexo.io), it's a Node.js based static site generator. You can either add or modify markdown file directly in Github or [Prose](http://prose.io) if you have the author access. Or you can clone the repo and setup Hexo on your local machine to modify the content, structure or functionality of the site.

## Setting Up Hexo

### Requirements

- [Node.js](http://nodejs.org/)
- [Git](http://git-scm.com/)

### Install Hexo

`npm install -g hexo`

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

`hexo new <page name>`

This will add a new page at `source/<page name>/index.md`

Because the documentation is multi-language and we put all doc pages into `source/en` and `source/zh` folder. You may want to add the page manually by your text editor or file system so you can specify the folder correctly.

### Front-matter

Every page must start with a block wrapped with `---` in front of the file. Like this:

``` yaml
title: Page Title
permalink: /page-link
---
```

### Editing Via Prose.io

Simply click the link "Edit This Page" on the bottom of each article to jump to the [Prose.io](http://prose.io) editor of the current page. **Note:** you will need author access to the repo and also you need to give access to prose.io github app.

### Code Highlighting

<pre>
``` [language] [title] [url] [link text]
code snippet
```
</pre>


## Deployment



## Contents

 - [Chinese (Simple)](zh)
 - [Engilish](en)
