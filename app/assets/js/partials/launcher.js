
	var CRD = CRD || {};


/*
	Plugins
	------------------------------- */

	/* HeadJS 0.99 */
	(function(f,w){function m(){}function g(a,b){if(a){"object"===typeof a&&(a=[].slice.call(a));for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)}}function v(a,b){var c=Object.prototype.toString.call(b).slice(8,-1);return b!==w&&null!==b&&c===a}function k(a){return v("Function",a)}function h(a){a=a||m;a._done||(a(),a._done=1)}function n(a){var b={};if("object"===typeof a)for(var c in a)a[c]&&(b={name:c,url:a[c]});else b=a.split("/"),b=b[b.length-1],c=b.indexOf("?"),b={name:-1!==c?b.substring(0,c):b,url:a};return(a=p[b.name])&&a.url===b.url?a:p[b.name]=b}function q(a){var a=a||p,b;for(b in a)if(a.hasOwnProperty(b)&&a[b].state!==r)return!1;return!0}function s(a,b){b=b||m;a.state===r?b():a.state===x?d.ready(a.name,b):a.state===y?a.onpreload.push(function(){s(a,b)}):(a.state=x,z(a,function(){a.state=r;b();g(l[a.name],function(a){h(a)});j&&q()&&g(l.ALL,function(a){h(a)})}))}function z(a,b){var b=b||m,c;/\.css[^\.]*$/.test(a.url)?(c=e.createElement("link"),c.type="text/"+(a.type||"css"),c.rel="stylesheet",c.href=a.url):(c=e.createElement("script"),c.type="text/"+(a.type||"javascript"),c.src=a.url);c.onload=c.onreadystatechange=function(a){a=a||f.event;if("load"===a.type||/loaded|complete/.test(c.readyState)&&(!e.documentMode||9>e.documentMode))c.onload=c.onreadystatechange=c.onerror=null,b()};c.onerror=function(){c.onload=c.onreadystatechange=c.onerror=null;b()};c.async=!1;c.defer=!1;var d=e.head||e.getElementsByTagName("head")[0];d.insertBefore(c,d.lastChild)}function i(){e.body?j||(j=!0,g(A,function(a){h(a)})):(f.clearTimeout(d.readyTimeout),d.readyTimeout=f.setTimeout(i,50))}function t(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",t,!1),i()):"complete"===e.readyState&&(e.detachEvent("onreadystatechange",t),i())}var e=f.document,A=[],B=[],l={},p={},E="async"in e.createElement("script")||"MozAppearance"in e.documentElement.style||f.opera,C,j,D=f.head_conf&&f.head_conf.head||"head",d=f[D]=f[D]||function(){d.ready.apply(null,arguments)},y=1,x=3,r=4;d.load=E?function(){var a=arguments,b=a[a.length-1],c={};k(b)||(b=null);g(a,function(d,e){d!==b&&(d=n(d),c[d.name]=d,s(d,b&&e===a.length-2?function(){q(c)&&h(b)}:null))});return d}:function(){var a=arguments,b=[].slice.call(a,1),c=b[0];if(!C)return B.push(function(){d.load.apply(null,a)}),d;c?(g(b,function(a){if(!k(a)){var b=n(a);b.state===w&&(b.state=y,b.onpreload=[],z({url:b.url,type:"cache"},function(){b.state=2;g(b.onpreload,function(a){a.call()})}))}}),s(n(a[0]),k(c)?c:function(){d.load.apply(null,b)})):s(n(a[0]));return d};d.js=d.load;d.test=function(a,b,c,e){a="object"===typeof a?a:{test:a,success:b?v("Array",b)?b:[b]:!1,failure:c?v("Array",c)?c:[c]:!1,callback:e||m};(b=!!a.test)&&a.success?(a.success.push(a.callback),d.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),d.load.apply(null,a.failure)):e();return d};d.ready=function(a,b){if(a===e)return j?h(b):A.push(b),d;k(a)&&(b=a,a="ALL");if("string"!==typeof a||!k(b))return d;var c=p[a];if(c&&c.state===r||"ALL"===a&&q()&&j)return h(b),d;(c=l[a])?c.push(b):l[a]=[b];return d};d.ready(e,function(){q()&&g(l.ALL,function(a){h(a)});d.feature&&d.feature("domloaded",!0)});if("complete"===e.readyState)i();else if(e.addEventListener)e.addEventListener("DOMContentLoaded",t,!1),f.addEventListener("load",i,!1);else{e.attachEvent("onreadystatechange",t);f.attachEvent("onload",i);var u=!1;try{u=null==f.frameElement&&e.documentElement}catch(F){}u&&u.doScroll&&function b(){if(!j){try{u.doScroll("left")}catch(c){f.clearTimeout(d.readyTimeout);d.readyTimeout=f.setTimeout(b,50);return}i()}}()}setTimeout(function(){C=!0;g(B,function(b){b()})},300)})(window);

	/* CRD TypeKit Loader */
	CRD.typekit={init:function(a){this.config=a;this.Timer=setTimeout(this.error,5E3);head.js("//use.typekit.com/"+this.config.kitId+".js",this.complete)},complete:function(){try{Typekit.load(this.config),clearTimeout(this.Timer)}catch(a){this.error()}},error:function(){var a=document.documentElement;a.className=a.className.replace(/(\s|^)wf-loading(\s|$)/g,"")}};

	/* CRD Email Obfuscator */
	CRD.email={scramble:function(b){for(var c=[],a=b.length;a--;)c[a]=b.charCodeAt(a),0<a&&(c[a]+=b.charCodeAt(a-1));return c},unscramble:function(b){var c=[],a,d=b.length;for(a=0;a<d;a++)0<a&&(b[a]-=b[a-1]),c[a]=String.fromCharCode(b[a]);return c.join("")}};


/*
	Colin Rotherham Design
	----------------------------------- */

	// Website namespace
	CRD.website = {};

	(function(namespace)
	{
		'use strict';

		// Navigation menu
		namespace.Menu = function(menu, container, focus)
		{
			var self = this;

			function open()
			{
				container.addClass(classToggle);
			}

			function close(event)
			{
				if (event && event.which && event.which !== 27) return;

				// Stop email receiving focus until ready
				focus.attr('tabindex', '-1');

				container.removeClass(classToggle);
				if (event) button.focus();
			}

			function toggle(event)
			{
				event.preventDefault();

				if (container.hasClass(classToggle)) close();
				else open();
			}

			var classToggle = 'toggle';
			var button = menu.children('button');

			// Toggle when clicked, listen for escape key
			button.on('click touchend', toggle);
			$(document).on('keyup', close);

			close();
		};

		namespace.hasTransitions = (function()
		{
			// Transition prefixes + default
			var prefixes = ['ms', 'O', 'Moz', 'Webkit', ''], prefix = prefixes[prefixes.length],
				css = document.body.style, i = prefixes.length, hasTransitions = false;

			// Check vendor prefixes
			while (i--) { if (typeof css[prefixes[i] + 'Transition'] === 'string') { hasTransitions = true; break; } }

			// Add to HTML tag
			if (hasTransitions) document.documentElement.className += ' transitions';

			return hasTransitions;
		})();

		namespace.EmailUnscramble = function(email, scrambled)
		{
			// Unscramble email
			var unscrambled = CRD.email.unscramble(scrambled);

			// Update link
			email.attr('href', 'mailto:' + unscrambled).html(unscrambled);
		};

		// Start fonts loading immediately
		CRD.typekit.init({ kitId: 'enr8jug' });

		// Inject dependencies + init
		head.js('/assets/js/lib/jquery-1.11.1.min.js', function()
		{
			var nav = $('#nav'),
				container = $('#container'),
				email = $('#email');

			// Ready… steady… go…
			new namespace.Menu(nav, container, email);
			new namespace.EmailUnscramble(email, [101, 211, 223, 230, 222, 219, 219, 206, 216, 179, 163, 210, 219, 213, 215, 224, 160, 145, 210, 220]);
		});

	})(CRD.website);


/*
	Google Analytics
	----------------------------------- */

	// set up account
	var _gaq = [['_setAccount', 'UA-2204911-2']];

	// track page view
	_gaq.push(['_trackPageview']);

	(function()
	{
		var ga = document.createElement('script');
		ga.async = true; ga.src = "//www.google-analytics.com/ga.js";

		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();