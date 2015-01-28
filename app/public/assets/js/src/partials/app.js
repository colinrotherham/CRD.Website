/*
	App launcher
	------------------------------- */

	define('app', function() {

		'use strict';

		// App stub
		var app = {
			menu: require(['menu']),
			analytics: require(['analytics'])
		};

		// Inject fonts
		require(['fonts']);

		return app;
	});