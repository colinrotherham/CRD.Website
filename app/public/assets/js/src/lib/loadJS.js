/*
	LoadJS (Filament Group, Inc)
	------------------------------- */

	define('loadCSS', function() {

		'use strict';

		return function(src, cb) {

			var ref = window.document.getElementsByTagName('script')[0];
			var script = window.document.createElement('script');

			script.src = src;
			script.async = true;

			ref.parentNode.insertBefore(script, ref);

			if (cb && typeof(cb) === 'function')
				script.onload = cb;

			return script;
		};
	});