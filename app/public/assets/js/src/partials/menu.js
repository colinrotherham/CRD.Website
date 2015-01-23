/*
	Menu
	----------------------------------- */

	define(['jquery'], function($) {

		'use strict';

		function init() {
			// Do something
		}

		// Find menu + button
		var menu = $('.menu'),
			button = menu.children('.menu__toggle');

		// On this page?
		if (menu.length && button.length)
			init();
	});