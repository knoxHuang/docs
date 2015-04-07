var gulp = require('gulp');
var spawn = require('child_process').spawn;

gulp.task('generate', function(cb) {
    var child = spawn('hexo', ['generate']);
    child.on('data', function(data) {
        console.log(data.toString());
    });
    child.on('exit', function() {
        var stream = gulp.src('source/_api/**/*')
                        .pipe(gulp.dest('public/api'));
        stream.on('exit', function() {
            return cb();
        });
    });
});
