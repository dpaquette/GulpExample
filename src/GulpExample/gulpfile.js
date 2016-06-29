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
    plumber = require("gulp-plumber"),
    mainBowerFiles = require("main-bower-files"),
    filter = require('gulp-filter'),
    project = require("./project.json");

var paths = {
    webroot: "./wwwroot/"
};

//Application Javascript
paths.jsSrc = "scripts/**/*.js";
paths.jsDest = paths.webroot + "js";

gulp.task("clean:appjs", function () {
    return del([paths.jsDest + "/**/*.*",
                "!" + paths.jsVendorDest + "/**/*.*"]);
});

gulp.task("appjs", ["clean:appjs"], function () {
    return gulp.src([paths.jsSrc])
        .pipe(gulp.dest(paths.jsDest))
        .pipe(concat("site.js"))
        .pipe(gulp.dest(paths.jsDest))
        .pipe(uglify())
        .pipe(rename("site.min.js"))
        .pipe(gulp.dest(paths.jsDest));
});



//Stylesheets
paths.lessSrc = "styles/site.less";
paths.cssDest = paths.webroot + "css";

gulp.task("clean:css", function () {
    return del([paths.cssDest + "/site*.css"]);
});

gulp.task("less", ["clean:css"], function () {
    return gulp.src([paths.lessSrc])        
         .pipe(less())
         .pipe(rename("site.css"))
         .pipe(gulp.dest(paths.cssDest))
         .pipe(cssmin())
         .pipe(rename("site.min.css"))
         .pipe(gulp.dest(paths.cssDest));
});


//Optimize Images
paths.imagesDest = paths.webroot + "images/";
paths.imagesSrc = "images/**/*.png";

gulp.task("images", function () {
    return gulp.src(paths.imagesSrc)
        .pipe(newer(paths.imagesDest))
        .pipe(imagemin())
    .pipe(gulp.dest(paths.imagesDest));
});


//Third-Party and Vendor Packages
paths.jsVendorDest = paths.jsDest + "/vendor";
paths.vendorFontsDest = paths.webroot + "fonts";

gulp.task("clean:vendorfiles", function () {
    return del([paths.jsVendorDest + "/**/*.*",
               paths.vendorFontsDest,
               paths.cssDest + "/**/!(site)*.css"]);
});

gulp.task("bower", ["clean:vendorfiles"], function () {
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
        .pipe(gulp.dest(paths.jsVendorDest))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(debug())
        .pipe(gulp.dest(paths.webroot + "css/"))
        .pipe(cssFilter.restore)
        .pipe(fontsFilter)
        .pipe(debug())
        .pipe(gulp.dest(paths.webroot + "fonts/"));
});

gulp.task("default", ["bower", "appjs", "less", "images"]);












//.pipe(plumber({ errorHandler: handleError }))

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
