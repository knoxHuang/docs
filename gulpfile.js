/**
 * Created by nantas on 15/2/15.
 */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var spawn = require('child_process').spawn;

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