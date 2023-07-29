const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

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

const minifyJS = () =>
  gulp.src(SOURCES.scripts).pipe(uglify()).pipe(gulp.dest(DESTINATIONS.assets));

function postCss() {
  return new Promise((res, rej) => {
    res(gulp.src(SOURCES.scss));
  }).then((value) => {
    value.pipe(postcss([autoprefixer()])).pipe(gulp.dest(DESTINATIONS.assets));
  });
}

exports.default = gulp.series(gulp.parallel(compileSass, minifyJS, postCss));
