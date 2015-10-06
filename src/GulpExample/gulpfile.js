/// <binding Clean='clean' />

var gulp = require("gulp"),
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

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

paths.imagesDest = paths.webroot + "images/";
paths.pngImagesSrc = "images/**/*.png";


gulp.task("clean:images", function () {
    return del(paths.imagesDest + "/**/*.*");
});
gulp.task("clean:js", function () {
    return del(paths.concatJsDest);
});

gulp.task("clean:css", function () {
    return dell(paths.concatCssDest);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
   return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
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
