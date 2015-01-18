/*
	Dependencies
	----------------------------------- */

	var gulp = require('gulp'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglifyjs'),
		smushit = require('gulp-smushit'),
		watch = require('gulp-watch'),
		filter = require('gulp-filter'),
		prefix = require('gulp-autoprefixer'),
		minifyCSS = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		browserSync = require('browser-sync'),
		nodemon = require('gulp-nodemon');

/*
	Sass to CSS
	----------------------------------- */

	gulp.task('sass', function() {

		var options = {

			sass: {
				style: 'compressed',
				errLogToConsole: true
			},

			prefix: {
				browsers: ['> 2%', 'IE 8'],
				cascade: false,
				remove: true
			},

			minifyCSS: {
				keepSpecialComments: false
			}
		};

		gulp.src('./app/public/assets/scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass(options.sass))
			.pipe(prefix(options.prefix))
			.pipe(minifyCSS(options.minifyCSS))
			.pipe(rename({suffix: '.min'}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./app/public/assets/css'))
			.pipe(browserSync.reload({ stream: true }));
	});


/*
	Minify JS
	----------------------------------- */

	gulp.task('uglify', function() {

		var options = {
			outSourceMap: true
		};

		gulp.src('./app/public/assets/js/partials/launcher.js')
			.pipe(uglify('base.min.js', options))
			.pipe(gulp.dest('./app/public/assets/js/'))
			.pipe(filter('**/*.js'))
			.pipe(browserSync.reload({ stream: true }));
	});


/*
	Optimise images
	----------------------------------- */

	gulp.task('smushit', function() {

		gulp.src('./app/public/assets/img/{,*/}*.{png,jpg,gif}')
			.pipe(smushit())
			.pipe(gulp.dest('./app/public/assets/img'));
	});


/*
	BrowserSync
	----------------------------------- */

	gulp.task('browser-sync', function() {

		var options = {
			proxy: 'localhost:4000'
		};

		browserSync(options);
	});


/*
	Define tasks
	----------------------------------- */

	// Default
	gulp.task('default', ['sass', 'uglify']);

	// Development
	gulp.task('dev', ['default', 'browser-sync'], function () {

		// Start web server
		nodemon({
			script: 'app/app.js', ext: 'js hbs css'
		});

		// Watch for Sass and JS changes
		gulp.watch('./app/public/assets/scss/{,*/}{,*/}{,*/}*.scss', ['sass']);
		gulp.watch(['./app/public/assets/js/partials/*.js', './app/public/assets/js/lib/*.js'], ['uglify']);
	});

	// Optimise images
	gulp.task('images', ['smushit']);