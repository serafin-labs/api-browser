var gulp = require('gulp');
var gulpTasks = require('./src/gulp-tasks/index.js');

gulp.task('default', ['start']);
gulp.task('dev', ['watch', 'watch-build-done', 'start']);
gulp.task('watch', ['watch-typescript', 'watch-assets']);
gulp.task('build', ['build-typescript', 'copy-assets']);
gulp.task('build-done', ['webpack', 'restart', 'test']);

var main = process.env.MAIN || 'lib/index.js';

gulpTasks.assets(gulp,
    [__dirname + '/src/**/*.+(xml|js|json|htm|html|css|ico|jpg|jpeg|png|gif|tiff|svg|webp|ttf|eot|otf|woff)', '!' + __dirname + '/src/tsconfig.json'],
    __dirname + '/lib');
gulpTasks.typescript(gulp, __dirname + '/src', __dirname + '/src/**/*.+(ts|tsx)', __dirname + '/src/tsconfig.json', __dirname + '/lib', __dirname + '/lib/typings');
gulpTasks.utils(gulp, __dirname + '/lib');
gulpTasks.runner(gulp, __dirname + '/' + main, __dirname + '/lib/build.txt', __dirname + '/lib/pid', true);
gulpTasks.test(gulp, __dirname + '/lib/**/test/*.js', __dirname + '/lib/coverage');
gulpTaskWebpack(gulp, __dirname + '/lib/app/index.js', 'bundle.js', __dirname + '/lib/app');

// To be externalized
function gulpTaskWebpack(gulp, sourcePath, bundlePath, destinationDirectory) {
    var webpack = require('gulp-webpack');

    gulp.task('webpack', function () {
        try {
            return gulp.src([sourcePath])
                .pipe(webpack({ output: { filename: bundlePath } }))
                .pipe(gulp.dest(destinationDirectory));
        } catch (e) {
            console.error(e);
        }
    });
}
