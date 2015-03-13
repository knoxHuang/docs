/**
 * Created by nantas on 15/2/15.
 */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var spawn = require('child_process').spawn;
var fs = require('fs');
var gulpSrcFiles = require('gulp-src-files');

gulp.task('generate', function(cb) {
    var child = spawn('hexo', ['generate'], {stdio: 'inherit'});
    child.on('exit', function(){
        return cb();
    });
});

gulp.task('run', function(cb) {
    var child = spawn('hexo', ['server'], {stdio: 'inherit'});
    child.on('exit', function(){
        return cb();
    });
});

gulp.task('open', function(cb) {
    setTimeout(function() {
        var child = spawn('open', ['http://localhost:4000'], {stdio:'inherit'});
        child.on('exit', function(){
            return cb();
        });
    }, 2500);
});

gulp.task('rebuild', gulpSequence('generate', ['run', 'open']));

gulp.task('gen-feed', function(cb) {
    var files = gulpSrcFiles([
        'public/api/**/*.html'
    ]);
    files.map(function(file) {
        var data = fs.readFileSync(file);
        var result = /<title>(.*)<\/title>/ig.exec(data);
        var title = result[1];
        result = /<link\srel="canonical"\shref="(.*?)">/ig.exec(data);
        var link = result[1];
        result = /<meta\sname="description"\scontent="(.*?)">/ig.exec(data);
        var content = result ? result[1] : "content";
        var xml = fs.readFileSync('public/atom.xml', { encoding: 'utf8'});
        var added = '<entry><title><![CDATA[' + title + ']]></title><link href="' + link + '"/><id>' + link + '</id><published>2015-03-12T09:36:51.000Z</published><updated>2015-03-12T09:36:51.000Z</updated><content type="html"><![CDATA[' + content + ']]></content><summary type="html"><![CDATA[' + content + ']]></summary></entry></feed>';
        //console.log(xml);
        xml = xml.replace(/<\/feed>/ig, added);
        fs.writeFileSync('public/atom.xml', xml);
    });
    cb();
});