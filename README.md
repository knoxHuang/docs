# Fireball-x Documentation

![Circle CI](https://circleci.com/gh/fireball-x/docs.svg?style=svg&circle-token=943e84c36e9a8e6cdeaf15cca651c526a687b0e9)

This is the documentation site for Fireball-x Engine.

## Getting Started

This documentation site is powered by [Hexo](http://hexo.io), it's a Node.js based static site generator. You can either add or modify markdown file directly in Github or [Prose](http://prose.io) if you have the author access. Or you can clone the repo and setup Hexo on your local machine to modify the content, structure or functionality of the site.

## Start Writing on the Fly

Simply click the link "Edit This Page" on the bottom of each article to jump to the [Prose.io](http://prose.io) editor of the current page. You can also just go around in github web interface and add/delete/modify any markdown files you want.

**Note:** you will need author access to the repo and also you need to give access to prose.io github app.

### Create New File/Folder

To create a file. Open up [project page in Prose.io](http://prose.io/#fireball-x/docs) and click `New File` button in the right folder.

To create a new folder, you have to go back to [project page on Github](https://github.com/fireball-x/docs) and click the `+` besides the branch selection control:

![Add folder in Github](/source/media/add_folder_github.png)

### Add Image File

Click the "Insert Image" button in Prose.io editor. You will see a dialog like this:

![Insert Image in Prose.io](/source/media/insert_image_in_prose.png)

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

Name your page file `page-name.md` and put it into `source` folder. Do not use hexo command line to create new page.

Because the documentation is multi-language and we put all doc pages into `source/en` and `source/zh` folder. You may want to add the page manually by your text editor or file system so you can specify the folder correctly.

### Front-matter

Every page must start with a block wrapped with `---` in front of the file. Like this:

``` yaml
---
title: Page Title
permalink: /page-link
---
```



### Code Highlighting

<pre>
``` [language] [title] [url] [link text]
code snippet
```
</pre>


## Deployment

Just commit your changes in `master` branch and push it to github. The CI service we use will handle the deployment automatically.

## Help

Any problem, create an issue or send a mail to `nantas@gmail.com`
