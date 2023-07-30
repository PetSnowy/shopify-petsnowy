const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");

const SOURCES = {
  scss: "styles/**/*.scss",
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

const watch = () => gulp.watch(SOURCES.scss, gulp.series(compileSass));

const deleteFiles = () =>
  gulp
    .src(DESTINATIONS.assets, { read: false, allowEmpty: true })
    .pipe(clean());

const minifyJS = () =>
  gulp.src(SOURCES.scripts).pipe(uglify()).pipe(gulp.dest(DESTINATIONS.assets));

exports.default = gulp.series(
  deleteFiles,
  gulp.parallel(compileSass, minifyJS),
  watch
);
