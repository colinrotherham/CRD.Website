
	var CRD = CRD || {};


/*
	Plugins
	------------------------------- */

	/* CRD Email Obfuscator */
	CRD.email={scramble:function(b){for(var c=[],a=b.length;a--;)c[a]=b.charCodeAt(a),0<a&&(c[a]+=b.charCodeAt(a-1));return c},unscramble:function(b){var c=[],a,d=b.length;for(a=0;a<d;a++)0<a&&(b[a]-=b[a-1]),c[a]=String.fromCharCode(b[a]);return c.join("")}};


/*
	Colin Rotherham Design
	----------------------------------- */

	(function(namespace)
	{
		'use strict';

		// Inject font stylesheet
		CRD.loadCSS('//fast.fonts.net/cssapi/2574e37c-f574-44e0-b64f-13d9bbeb7570.css')

		// Inject dependencies + init
		new namespace.Menu('.menu');

	})(CRD);


/*
	Google Analytics
	----------------------------------- */

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-2204911-2', 'auto');
	ga('send', 'pageview');