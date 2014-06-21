module.exports = function(grunt) {

	'use strict';

	// Configure
	grunt.initConfig({

		sass: {

			live: {
				options: {
					style: 'compressed',
					sourcemap: true
				},

				files: {
					'app/assets/css/combined.min.css': 'app/assets/scss/base.scss'
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
					'app/assets/js/combined.min.js' : [
						'app/assets/js/partials/launcher.js'
					]
				}
			}
		},

		smushit: {
			live: {
				src: [
					'app/assets/img/{,*/}*.{png,jpg,gif}'
				]
			}
		},

		watch: {

			sass: {
				files: ['app/assets/scss/{,*/}{,*/}{,*/}*.scss'],
				tasks: ['sass:live']
			},

			js: {
				files: ['app/assets/js/partials/*.js', 'app/assets/js/lib/*.js'],
				tasks: ['uglify:live'],

				options: {
					livereload: true
				}
			},

			css: {
				files: ['app/assets/css/*.css', '!assets/css/*.min.css'],

				options: {
					livereload: true
				}
			}
		}
	});

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['sass:live', 'uglify:live']);
	grunt.registerTask('images', ['smushit:live']);
};