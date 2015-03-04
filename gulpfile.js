/*
	Dependencies
	----------------------------------- */

	var gulp = require('gulp'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
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
			browsers: ['> 2%', 'IE 9', 'IE 10'],
			cascade: false,
			remove: true
		},

		minifyCSS: {
			keepSpecialComments: false
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

		browserSync: {
			proxy: 'localhost:4000',
			browser: 'google chrome',
			notify: false
		},

		nodemon: {
			script: 'app/app.js',
			watch: 'app/',
			ext: 'js hbs css',
			ignore: ['app/public/**']
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
			.pipe(rename({ suffix: '.min' }))
			.pipe(sourcemaps.write('.', { sourceRoot: '/assets/scss/', sourceMappingURLPrefix: '/assets/css/' }))
			.pipe(gulp.dest('./app/public/assets/css'))
			.pipe(filter('**/*.css'))
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
				.pipe(sourcemaps.init())
				.pipe(amdOptimize('main', options.requireJS.config))
				.pipe(sourcemaps.write()))

			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
			.pipe(concat('base.min.js'))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./app/public/assets/js'))
			.pipe(filter('**/*.js'))
			.pipe(browserSync.reload({ stream: true }))
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
	gulp.task('default', ['sass', 'uglify']);

	// Development and Live tasks
	gulp.task('dev', ['default', 'browser-sync', 'serve']);
	gulp.task('live', ['default', 'serve']);

	// Optimise images
	gulp.task('images', ['imagemin']);