const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

const SOURCES = {
  scss: "styles/**/*.scss",
  css: "styles/**/*.css",
  scripts: "script/**/*.js",
};

const DESTINATIONS = {
  assets: "assets",
};

const compileSass = () =>
  gulp
    .src(SOURCES.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(DESTINATIONS.assets));

const watch = () => gulp.watch(SOURCES.styles, gulp.series(compileSass));

const minifyCSS = () =>
  gulp.src(SOURCES.css).pipe(cleanCSS()).pipe(gulp.dest(DESTINATIONS.assets));

const minifyJS = () =>
  gulp.src(SOURCES.scripts).pipe(uglify()).pipe(gulp.dest(DESTINATIONS.assets));

exports.default = gulp.series(gulp.parallel(minifyCSS, minifyJS));
