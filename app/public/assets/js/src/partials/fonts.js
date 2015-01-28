/*
	Fonts
	----------------------------------- */

	define(['jquery', 'loadCSS', 'loadJS', 'webfont'], function($, loadCSS, loadJS, WebFont) {

		'use strict';

		// Inject main course stylesheet
		loadCSS('/assets/css/main.min.css', false, false, function() {

			// Font tracking code
			window.MTIProjectId = '';
			loadJS('//fast.fonts.net/t/trackingCode.js');
		});

		// Monitor font load progress
		WebFont.load({
			custom: {
				families: ['Adelle W01', 'Avenir Next W01']
			}
		});
	});