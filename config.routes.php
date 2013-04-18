<?php

/*
	Routing table
	----------------------------------- */

	namespace CRD\Core;

	// Start router
	$app->router = new Router($app, $path);

	// Home
	$app->router->add('/', array('view-home'), function($view)
	{
		$view->template = new Template($view, 'page', 'page-home');
	});

	// 404 route
	$app->router->add(':404:', array('view-error-404'), function($view)
	{
		$view->template = new Template($view, 'page', 'page-error');
	});

	// Check request matches a route
	$app->router->check();
?>