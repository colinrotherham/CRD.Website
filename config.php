<?php

/*
	Application config
	----------------------------------- */

	namespace CRD\Core;

	// Default timezone
	date_default_timezone_set('Europe/London');

	// Start the app
	$app = new App($path);

	// App name, also cache prefix
	$app->name = 'Colin Rotherham Design';
	
	// Set app version string
	$app->version = '1.1';

	// Page templates
	$app->templates = array
	(
		'page'			=> '/templates/template-page.php'
	);
	
	// Page partials
	$app->partials = array
	(
		'navigation'	=> '/views/partials/navigation.php'
	);
?>