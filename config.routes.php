<?php

/*
	Routing table
	----------------------------------- */

	namespace CRD\Core;

	// Start router
	$app->router = new Router($app, $path);

	// Home
	$app->router->add('home', '/', array('view' => 'view-home'), function($view)
	{
		$view->template = new Template($view->app, 'template-page', 'page-home');
	});

	// 404 route
	$app->router->add(':404:', null, array('view' => 'view-error-404'), function($view)
	{
		$view->template = new Template($view->app, 'template-page', 'page-error');
	});

	// Check request matches a route
	$app->router->check();
?>