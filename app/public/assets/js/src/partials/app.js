/*
	App launcher
	------------------------------- */

	define('app', ['jquery', 'loadCSS', 'loadJS'], function($, loadCSS, loadJS) {

		'use strict';

		// Inject main course stylesheet
		loadCSS('/assets/css/main.min.css');

		// Font tracking code
		window.MTIProjectId = '3a81c737-a761-4ff9-87a5-bb67c7c3bed0';
		loadJS('//fast.fonts.net/t/trackingCode.js');

		// App stub
		var app = {
			menu: require(['menu']),
			analytics: require(['analytics'])
		};

		return app;
	});