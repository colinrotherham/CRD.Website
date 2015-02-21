/*
	Dependencies
	----------------------------------- */

	var gulp = require('gulp'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglifyjs'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		watch = require('gulp-watch'),
		filter = require('gulp-filter'),
		prefix = require('gulp-autoprefixer'),
		minifyCSS = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		nodemon = require('gulp-nodemon'),
		eventStream = require('event-stream'),
		amdOptimize = require('amd-optimize'),
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

		requireJS: {

			dependencies: [
				'./node_modules/almond/almond.js'
			],

			modules: [

				// 3rd party via npm
				'./node_modules/components-webfontloader/webfont.js',
				'./node_modules/jquery/dist/jquery.js',

				// Actual modules
				'./app/public/assets/js/src/lib/*.js',
				'./app/public/assets/js/src/partials/*.js'
			],

			config: {
				configFile: './app/public/assets/js/src/config.js',
				findNestedDependencies: true
			}
		},

		uglify: {

			output: {
				filename: 'base.min.js',
				directory: './app/public/assets/js'
			},

			config: {
				outSourceMap: true,
				compress: false
			}
		},

		browserSync: {
			proxy: 'localhost:4000',
			browser: 'google chrome',
			notify: false
		},

		nodemon: {
			script: 'app/app.js',
			ext: 'js hbs css',
			ignore: ['gulpfile.js', 'app/public/**.js']
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

		// Merge two glob streams
		eventStream.merge(

			// Dependencies
			gulp.src(options.requireJS.dependencies),

			// RequireJS modules
			gulp.src(options.requireJS.modules)
				.pipe(amdOptimize('main', options.requireJS.config))
			)

			// Combine and uglify
			.pipe(uglify(options.uglify.output.filename, options.uglify.config))
			.pipe(gulp.dest(options.uglify.output.directory))
			.pipe(filter('**/*.js'))
			.pipe(browserSync.reload({ stream: true }));
	});


/*
	Optimise images
	----------------------------------- */

	gulp.task('imagemin', function () {

		gulp.src('./app/public/assets/img/{,*/}*.{png,jpg,gif}')
			.pipe(imagemin({
				progressive: true,
				use: [pngquant()]
			}))
			.pipe(gulp.dest('./app/public/assets/img'));
	});


/*
	BrowserSync
	----------------------------------- */

	gulp.task('browser-sync', function() {
		browserSync(options.browserSync);

		// Watch for Sass and JS changes
		gulp.watch('./app/public/assets/scss/{,*/}{,*/}{,*/}*.scss', ['sass']);
		gulp.watch(['./app/public/assets/js/src/{,*/}{,*/}{,*/}*.js'], ['uglify']);
	});


/*
	Start Node.js
	----------------------------------- */

	gulp.task('serve', function() {
		nodemon(options.nodemon);
	});


/*
	Define tasks
	----------------------------------- */

	// Default
	gulp.task('default', ['dev']);

	// Development and Live tasks
	gulp.task('dev', ['sass', 'uglify', 'browser-sync', 'serve']);
	gulp.task('live', ['sass', 'uglify', 'serve']);

	// Optimise images
	gulp.task('images', ['imagemin']);