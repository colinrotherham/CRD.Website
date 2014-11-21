module.exports = function(grunt) {

	'use strict';

	// Configure
	grunt.initConfig({

		sass: {

			live: {
				options: {
					style: 'compressed',
					sourcemap: 'none'
				},

				files: {
					'app/public/assets/css/combined.min.css': 'app/public/assets/scss/base.scss'
				}
			}
		},

		uglify : {

			options: {
				mangle : true,
				preserveComments: false
			},

			live: {
				files : {
					'app/public/assets/js/combined.min.js' : [
						'app/public/assets/js/partials/launcher.js'
					]
				}
			}
		},

		smushit: {
			live: {
				src: [
					'app/public/assets/img/{,*/}*.{png,jpg,gif}'
				]
			}
		},

		watch: {

			sass: {
				files: ['app/public/assets/scss/{,*/}{,*/}{,*/}*.scss'],
				tasks: ['sass:live']
			},

			js: {
				files: ['app/public/assets/js/partials/*.js', 'app/public/assets/js/lib/*.js'],
				tasks: ['uglify:live'],

				options: {
					livereload: true
				}
			},

			css: {
				files: ['app/public/assets/css/*.css', '!app/public/assets/css/*.min.css'],

				options: {
					livereload: true
				}
			}
		},

		browserSync: {

			bsFiles: {
				src : ['app/public/assets/js/**/*.js', 'app/public/assets/css/**/*.css'],
			},

			options: {
				proxy: "localhost:4000",
				watchTask: true
			}
		}
	});

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['sass:live', 'uglify:live']);
	grunt.registerTask('images', ['smushit:live']);
	grunt.registerTask('dev', ['default', 'browserSync', 'watch']);
};