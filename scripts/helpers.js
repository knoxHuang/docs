var links = {
  index: 'https://github.com/fireball-x/docs',
  warehouse: 'https://github.com/fireball-x'
};

function get_sidebar(permalink) {
    var reZh = /^zh\/|^\/zh\//;
    var reDev = /\/dev\//;
    var isZh = reZh.test(permalink);
    var isDev = reDev.test(permalink);
    if (isZh && isDev) {
        return "doc_sidebar_zh";
    } else if (isZh && !isDev) {
        return "user_sidebar_zh";
    } else if (!isZh && isDev) {
        return "doc_sidebar";
    } else {
        return "user_sidebar";
    }
}

hexo.extend.helper.register('github_link', function(data){
    //return console.log(data);
  //var match = data.file.match(/(\w+)\/lib\/(.+)/),
  //  name = match[1],
  //  path = 'lib/' + match[2];
  //
  //if (name === 'hexo') name = 'index';
  //
  //var line = data.line,
  //  version = this.site.yuidoc.findByName(name).project.version || 'master';
  //return '<a href="' + links[name] + '/blob/' + version + '/' + path + '#L' + line + '">' + path + ':' + line + '</a>';
    return '<a href="' + this.config.root + data.path + '">'+data.name + '</a>';
});

hexo.extend.helper.register('item_flags', function(data){
  var result = '';

  ['static', 'chainable', 'async', 'final'].forEach(function(i){
    if (data[i]) result += '<span class="api-item-flag ' + i + '">' + i + '</span>';
  });

  return result;
});

hexo.extend.helper.register('toggle_lang_url', function() {
    var resultLink;
    if (/(^|[\b\/])zh\//.test(this.path)) {
        if (/(^|[\b\/])zh\/+index.html/.test(this.path) || /^api\/zh\//.test(this.path) ) {
            var re = /(?:^|[\b\/])(zh\/)/ig;
            var result = re.exec(this.path);
            resultLink = this.path.replace(result[1], '/');
        } else {
            var re = /(?:^|[\b\/])(zh\/)/ig;
            var result = re.exec(this.path);
            resultLink = this.path.replace(result[1], 'en/');
        }
    } else {
        //console.log(this.path);
        if (/^en\//.test(this.path)) {
            resultLink = this.path.replace(/^en\//, 'zh/');
        } else if (/^api\//.test(this.path)) {
            var secArr = this.path.split('/');
            var apiIdx = secArr.indexOf('api');
            secArr.splice(apiIdx+1, 0, 'zh');
            resultLink = secArr.join('/');
        } else {
            resultLink = 'zh/' + this.path;
        }
    }
    return (this.config.root + resultLink).replace(/\/+/g, '/');
});

hexo.extend.helper.register('toggle_lang_title', function() {
    if (/zh\//.test(this.path)) {
        return "English";
    } else {
        return "中文";
    }
});

hexo.extend.helper.register('get_sidebar', function() {
    var permalink = this.path;
    var reZh = /^zh\/|^\/zh\//;
    var reDev = /\/dev\//;
    var isZh = reZh.test(permalink);
    var isDev = reDev.test(permalink);
    if (isZh && isDev) {
        return "doc_sidebar_zh";
    } else if (isZh && !isDev) {
        return "user_sidebar_zh";
    } else if (!isZh && isDev) {
        return "doc_sidebar";
    } else {
        return "user_sidebar";
    }
});

hexo.extend.helper.register('get_menu', function() {
    var isZh = /^zh\/|^\/zh\//.test(this.path);
    if (isZh) {
        return "menu_zh";
    } else {
        return "menu";
    }
});

hexo.extend.helper.register('show_permalink', function() {
    return '<span>' + this.page.path + '</span>';
});

hexo.extend.helper.register('page_nav', function(){

    //path = this.path.replace(/^docs\//, ''),
    var path = this.path.replace(/\/index\.html/, ''),
    list = {};
    var sidebar = this.theme[get_sidebar(path)];
    //console.log(JSON.stringify(sidebar));

  for (var i in sidebar){
    for (var j in sidebar[i]){
      list[sidebar[i][j]] = j;
      //console.log("key: " + sidebar[i][j] + ", value: " + j + '\n');
    }
  }

    var rePath = /^\//i;
    var keys = Object.keys(list),
        index = keys.indexOf(path.replace(rePath, '')),
        result = [];

    //console.log(keys);
    //console.log(path);
    //console.log(index);
    if (index > 0){
        result.push('<a href="' + /*this.config.url +*/ '/' + keys[index - 1] + '" id="page-footer-prev" title="' + list[keys[index - 1]] + '">Prev</a>');
    }

    if (index < keys.length - 1){
        result.push('<a href="' + /*this.config.url +*/ '/' + keys[index + 1] + '" id="page-footer-next" title="' + list[keys[index + 1]] + '">Next</a>');
    }

    //console.log(result.join(""));
    return result.join('');
});
