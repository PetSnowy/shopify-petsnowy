const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

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
		.pipe(postcss([autoprefixer({
			"overrideBrowserslist": [
				"defaults",
				"not ie < 11",
				"last 2 versions",
				"> 1%",
				"iOS 7",
				"last 3 iOS versions"
			]
		}), cssnano()]))
		.pipe(cleanCSS())
		.pipe(gulp.dest(DESTINATIONS.assets));

const minifyJS = () =>
	gulp.src(SOURCES.scripts).pipe(uglify()).pipe(gulp.dest(DESTINATIONS.assets));

const watch = () => {
	gulp.watch(SOURCES.scripts, gulp.series(minifyJS));
	gulp.watch(SOURCES.scss, gulp.series(compileSass));
};

exports.default = gulp.series(gulp.parallel(compileSass, minifyJS), watch);
