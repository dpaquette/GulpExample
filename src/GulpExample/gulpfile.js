/// <binding Clean='clean' />

var gulp = require("gulp"),
    rename = require("gulp-rename"),
    del = require("del"),
    debug = require("gulp-debug"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    less = require("gulp-less"),
    mainBowerFiles = require("main-bower-files"),
    filter = require('gulp-filter'),
    project = require("./project.json");

var paths = {
    webroot: "./" + project.webroot + "/"
};

paths.jsDest = paths.webroot + "js";
paths.jsSrc = "scripts/**/*.js";
paths.lessSrc = "styles/site.less";
paths.css = paths.webroot + "css/site.css"
paths.minCss = paths.webroot + "css/site.min.css";
paths.concatJsDest = paths.webroot + "js/site.js";
paths.minJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.vendor = paths.webroot + "vendor/";
paths.imagesDest = paths.webroot + "images/";
paths.imagesSrc = "images/**/*.png";

gulp.task("clean:js", function () {
    return del(paths.jsDest + "/**/*.*");
});

gulp.task("clean:css", function () {
    return del([paths.css, paths.minCss]);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", ["clean:js"], function () {
    return gulp.src([paths.jsSrc])
        .pipe(gulp.dest(paths.jsDest))
        .pipe(concat(paths.concatJsDest))
        .pipe(gulp.dest("."))
        .pipe(uglify())
        .pipe(rename(paths.minJsDest))
        .pipe(gulp.dest("."));
});

gulp.task("less", ["clean:css"], function () {
    return gulp.src([paths.lessSrc])
         .pipe(less())
         .pipe(rename(paths.css))
         .pipe(gulp.dest("."))
         .pipe(cssmin())
         .pipe(rename(paths.minCss))
         .pipe(gulp.dest("."));
});

gulp.task("images", function () {

    return gulp.src(paths.imagesSrc)
        .pipe(newer(paths.imagesDest))
        .pipe(imagemin())
    .pipe(gulp.dest(paths.imagesDest));
});

gulp.task("bower", function () {

    var filterByExtension = function (extension) {
        return filter(function (file) {
            return file.path.match(new RegExp('.' + extension + '$'));
        });
    };

    var mainFiles = mainBowerFiles({
        overrides: {
            "bootstrap": {
                "main": "dist/**/*.*"
            }
        }
    });

    var jsFilter = filter('**/*.js', { restore: true });
    var cssFilter = filter('**/*.css', { restore: true });
    var fontsFilter = filter(['**/*.woff*', '**/*.ttf', '**/*.svg' , '**/*.eot'], { restore: true });

    return gulp.src(mainFiles)
        .pipe(jsFilter)
        .pipe(debug())
        .pipe(gulp.dest(paths.webroot + "js/"))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(debug())
        .pipe(gulp.dest(paths.webroot + "css/"))
        .pipe(cssFilter.restore)
        .pipe(fontsFilter)
        .pipe(debug())
        .pipe(gulp.dest(paths.webroot + "fonts/"));
});

gulp.task("min", ["min:js", "min:css"]);
