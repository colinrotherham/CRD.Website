/*
	App launcher
	------------------------------- */

	define('app', ['jquery', 'loadCSS'], function($, loadCSS) {

		'use strict';

		// Inject font stylesheet
		loadCSS('//fast.fonts.net/cssapi/2574e37c-f574-44e0-b64f-13d9bbeb7570.css');

		// App stub
		var app = {
			menu: require(['menu']),
			analytics: require(['analytics'])
		};

		return app;
	});