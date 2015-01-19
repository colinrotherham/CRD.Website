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
		closureCompiler = require('gulp-closure-compiler'),
		nodemon = require('gulp-nodemon'),
		browserSync = require('browser-sync');

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
			},

			rename: {
				suffix: '.min'
			}
		};

		gulp.src('./app/public/assets/scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass(options.sass))
			.pipe(prefix(options.prefix))
			.pipe(minifyCSS(options.minifyCSS))
			.pipe(rename(options.rename))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./app/public/assets/css'))
			.pipe(browserSync.reload({ stream: true }));
	});


/*
	Minify JS
	----------------------------------- */

	gulp.task('uglify', function() {

		var options = {

			input: [
				'./bower_components/jquery/dist/jquery.js',
				'./app/public/assets/js/partials/utilities.js',
				'./app/public/assets/js/partials/menu.js',
				'./app/public/assets/js/partials/launcher.js'
			],

			output: {
				filename: 'base.min.js',
				directory: './app/public/assets/js/'
			},

			uglify: {
				outSourceMap: true
			}
		};

		gulp.src(options.input)
			.pipe(uglify(options.output.filename, options.uglify))
			.pipe(gulp.dest(options.output.directory))
			.pipe(filter('**/*.js'))
			.pipe(browserSync.reload({ stream: true }));
	});


/*
	Closure compiler
	----------------------------------- */

	gulp.task('closure', function() {

		var options = {

			input: [
				'./app/public/assets/js/base.min.js',
			],

			output: {
				filename: 'base.min.js',
				directory: './app/public/assets/js/'
			},

			closureCompiler: {
				compilerPath: './bower_components/closure-compiler/compiler.jar'
			}
		};

		gulp.src(options.input)
			.pipe(closureCompiler(options.closureCompiler))
			.pipe(gulp.dest(options.output.directory));
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
	gulp.task('dev', ['default', 'browser-sync'], function() {

		// Start web server
		nodemon({
			script: 'app/app.js', ext: 'js hbs css'
		});

		// Watch for Sass and JS changes
		gulp.watch('./app/public/assets/scss/{,*/}{,*/}{,*/}*.scss', ['sass']);
		gulp.watch(['./app/public/assets/js/partials/*.js', './app/public/assets/js/lib/*.js'], ['uglify']);
	});

	// Live
	gulp.task('live', ['default'], function() {
		gulp.watch('./app/public/assets/js/base.min.js', ['closure']);
	});

	// Optimise images
	gulp.task('images', ['smushit']);