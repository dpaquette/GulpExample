/// <binding Clean='clean' />

var gulp = require("gulp"),
    rename = require("gulp-rename"),
    del = require("del"),
    debug = require("gulp-debug"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    image = require("gulp-image"),
    project = require("./project.json");

var paths = {
    webroot: "./" + project.webroot + "/"
};

paths.jsDest = paths.webroot + "js";
paths.jsSrc = "scripts/**/*.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.js";
paths.minJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

paths.imagesDest = paths.webroot + "images/";
paths.pngImagesSrc = "images/**/*.png";


gulp.task("clean:images", function () {
    return del(paths.imagesDest + "/**/*.*");
});
gulp.task("clean:js", function () {
    return del(paths.jsDest + "/**/*.*");
});

gulp.task("clean:css", function () {
    return dell(paths.concatCssDest);
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

gulp.task("min:css", function () {
   return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("images", ["clean:images"], function () {
    return gulp.src(paths.pngImagesSrc)
            .pipe(debug())
            .pipe(image())
            .pipe(gulp.dest(paths.imagesDest));
});

gulp.task("min", ["min:js", "min:css"]);
