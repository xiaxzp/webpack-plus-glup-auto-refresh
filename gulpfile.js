var gulp = require("gulp");

gulp.task('default',function(){
    console.log('gulp启动成功');//测试gulp是否启动
})
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('webpack/*.html')
    .pipe(htmlmin({
        removeComments: true,//清除HTML注释//
        collapseWhitespace: true,//压缩HTML//
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    }))
    //最后把你建立的html文件压缩到自动创建的dist文件里;
    .pipe(gulp.dest('dist'))
})
//var scss = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
//因为我用的是scss,所以这里注册任务写成了scss;
gulp.task('css',function(){
    gulp.src('*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
});
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
gulp.task('image',function(){
    gulp.src('img/*.{jpg,pnp,gif}')//要处理的图片目录为img目录下的所有的.jpg .png .gif 格式的图片;
    .pipe(cache(imagemin({
        progressive : true,//是否渐进的优化
        svgoPlugins : [{removeViewBox:false}],//svgo插件是否删除幻灯片
        interlaced : true //是否各行扫描
    })))
    .pipe(gulp.dest('dist/img'))
});
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream')
var webpackConfig = require('./webpack.config.js')
gulp.task('js',function(){
    gulp.src('webpack/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

var plumber = require('gulp-plumber');
gulp.task('ant_js', function(){
    gulp.src('src/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                this.error('end')
            }
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})

var connect = require('gulp-connect');
gulp.task('ant_connect', function() {
    connect.server({
        livereload: true,
        root: 'dist/',
        port: 8888
    })
})
var rev =  require('gulp-rev-append');
gulp.task('ant_html', function(){
    gulp.src('webpack/index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})
gulp.task('watch',['css','js','html','image','ant_connect','ant_html'],function(){
    gulp.watch('*.css',['css']);
    gulp.watch('webpack/*.js',['js','ant_html']);
    gulp.watch('js/*.js',['js','ant_html']);
    gulp.watch('img/*.*',['image']);
    gulp.watch('webpack/*.html',['html','ant_html']);
})