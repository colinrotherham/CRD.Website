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
	Shared options
	----------------------------------- */

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
		},

		uglify: {

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

			config: {
				outSourceMap: true,
				compress: false
			}
		},

		closureCompiler: {

			compilerPath: './bower_components/closure-compiler/compiler.jar',

			compilerFlags: {
				compilation_level: 'ADVANCED_OPTIMIZATIONS',
				warning_level: 'QUIET'
			}
		},

		browserSync: {
			proxy: 'localhost:4000'
		}
	};


/*
	Sass to CSS
	----------------------------------- */

	gulp.task('sass', function() {

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

		gulp.src(options.uglify.input)
			.pipe(uglify(options.uglify.output.filename, options.uglify.config))
			.pipe(gulp.dest(options.uglify.output.directory))
			.pipe(filter('**/*.js'))
			.pipe(browserSync.reload({ stream: true }));
	});


/*
	Closure compiler
	----------------------------------- */

	gulp.task('closure', function() {

		// Build from Uglify options
		options.closureCompiler.fileName = options.uglify.output.filename;

		gulp.src(options.uglify.input)
			.pipe(closureCompiler(options.closureCompiler))
			.pipe(gulp.dest(options.uglify.output.directory));
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
		browserSync(options.browserSync);
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
	gulp.task('live', ['sass', 'closure']);

	// Optimise images
	gulp.task('images', ['smushit']);