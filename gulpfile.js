///// Plugin Includes /////
var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		plumber = require('gulp-plumber'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		prefix = require('gulp-autoprefixer'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		sass = require('gulp-sass');

///// Compile/Validate JS /////
gulp.task('js', function () {
	return gulp.src('./js/app.js')
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default', { verbose: true }))
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./js/dist/'))
});

///// Compile Sass /////
gulp.task('sass', function () {
	return gulp.src('./style.css')
	.pipe(plumber())
	.pipe(sass().on('error', sass.logError))
	.pipe(prefix('last 2 versions'))
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.stream())
});

///// Get HTML /////
gulp.task('html', function () {
	return gulp.src('./*.html')
	.pipe(gulp.dest('./'))
});

///// Browser Sync /////
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
            baseDir: "./"
        },
		notify: false
	});
	gulp.watch('./script.js', ['js']).on('change', browserSync.reload);
	gulp.watch('./style.css', ['sass']).on('change', browserSync.reload);
	gulp.watch('./*.html', ['html']).on('change', browserSync.reload);
	gulp.watch('./scss/**/*.scss', ['sass']);
});

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['browser-sync']);
