/*
	Utilities
	------------------------------- */

	var CRD = CRD || {};

	// JS loader (Filament Group, Inc)
	CRD.loadJS = function (src, cb) {

		'use strict';

		var ref = window.document.getElementsByTagName('script')[0];
		var script = window.document.createElement('script');

		script.src = src;
		script.async = true;

		ref.parentNode.insertBefore(script, ref);

		if (cb && typeof(cb) === 'function')
			script.onload = cb;

		return script;
	};

	// CSS loader (Filament Group, Inc)
	CRD.loadCSS = function (href, before, media) {

		'use strict';

		var ss = window.document.createElement('link');
		var ref = before || window.document.getElementsByTagName('script')[0];
		var sheets = window.document.styleSheets;

		ss.rel = 'stylesheet';
		ss.href = href;
		ss.media = 'only x';

		ref.parentNode.insertBefore(ss, ref);

		function toggleMedia() {

			var defined;

			for (var i = 0; i < sheets.length; i++) {

				if (sheets[i].href && sheets[i].href.indexOf(href) > -1)
					defined = true;
			}

			if (defined)
				ss.media = media || 'all';

			else
				setTimeout(toggleMedia);
		}

		toggleMedia();
		return ss;
	};

	// Add "bind" browser support
	if (!Function.prototype.bind) {

		Function.prototype.bind = function bind(that) {
			var target = this;

			if (typeof target != "function") {
				throw new TypeError();
			}

			var args = slice.call(arguments, 1),
				bound = function () {

				if (this instanceof bound) {

					var F = function(){};
					F.prototype = target.prototype;

					var self = new F();
					var result = target.apply(self, args.concat(slice.call(arguments)));

					if (Object(result) === result) {
						return result;
					}

					return self;

				} else {
					return target.apply(that, args.concat(slice.call(arguments)));
				}
			};

			return bound;
		};
	}