/*
	RequireJS config
	------------------------------- */

	require.config({

		// Partials
		baseUrl: './app/public/assets/js/src/partials/',

		// Dependencies
		paths: {

			// 3rd party not via npm
			'loadCSS': './app/public/assets/js/src/lib/loadCSS',
			'loadJS': './app/public/assets/js/src/lib/loadJS',

			// App bootstrap
			'main': './app/public/assets/js/src/main'
		},

		shim: {
			'webfont': {
				exports: 'WebFont'
			}
		}
	});