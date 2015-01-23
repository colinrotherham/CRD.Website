/*
	RequireJS config
	------------------------------- */

	require.config({

		// Partials
		baseUrl: '/assets/js/src/partials/',

		// Dependencies
		paths: {
			'loadCSS': '/assets/js/src/lib/loadCSS',
			'loadJS': '/assets/js/src/lib/loadJS'
		}
	});

	// Start app
	requirejs(['app']);