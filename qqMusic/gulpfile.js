var gulp = require('gulp');

//plugin apply流程  下载插件---->取到插件 -->应用插件

//压缩html
var htmlClean = require("gulp-htmlclean");

//inage plugin 压缩图片
var imageMin = require('gulp-imagemin');

//压缩JS插件
var uglify = require('gulp-uglify');

//去掉JS中的调试语句
var debug = require('gulp-strip-debug');

//将less转换成css
var less = require('gulp-less');

//压缩CSS
var cleanCss = require('gulp-clean-css');

//postcss autoprofixer  处理CSS的前缀-webkit-
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

//开启服务器
var connect = require('gulp-connect');
var folder = {
    src:'src/',
    dist:'dist/'
};
//判断当前环境变量 开发环境对输出的文件不压缩（方便找错）、生成环境对输出的文件进行压缩
var devMod = process.env.NODE_ENV == 'development';
//export NODE_ENV=development 设置当前环境变量

gulp.task('html', function() {
    var page = gulp.src(folder.src + 'html/*.html')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + 'html/'));
}); 
gulp.task('image', function() {
    gulp.src(folder.src + 'img/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'img/'));
});
gulp.task('css', function() {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + 'css/'));
});
gulp.task('js', function() {
    var page = gulp.src(folder.src + 'js/*.js')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        } 
        page.pipe(gulp.dest(folder.dist + 'js/'));
});
//gulp服务器的开启以及监听以及端口的配置
gulp.task('server', function() {
    connect.server({
        port:"8888",
        livereload:true
    });
})
//监听文件的变化后执行后面的任务
gulp.task('watch', function() {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
})
// 利用gulp执行后面默认的任务
gulp.task('default',['html', 'image', 'css', 'js','server','watch']);



//less----->  自动添加CSS3兼容前缀----->进行文件压缩  ---->css文件

//API
// gulp.src()
//gulp.dest()
//gulp.task()
//gulp.watch()

//gulp  ---> runner Task
//webpack   --> module bundle