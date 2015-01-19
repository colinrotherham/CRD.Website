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

	// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
	if (!Function.prototype.bind) {

		Function.prototype.bind = function (oThis) {

			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5
				// internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function () {},
				fBound = function () {
					return fToBind.apply(this instanceof fNOP && oThis
						? this
						: oThis,
						aArgs.concat(Array.prototype.slice.call(arguments)));
				};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
	}