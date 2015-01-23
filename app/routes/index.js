/*
	Node.js app setup
	----------------------------------- */

	var async = require('async'),
		express = require('express'),
		fs = require('fs'),
		path = require('path');

	var router = express.Router();

	// Default view data
	var viewData = {
		layout: 'main',
		includeCSS: '',
		pageClass: ''
	};

	function readFile(file, callback) {
		fs.readFile(file, 'utf8', callback);
	}

	// Map assets, render
	async.map([path.join(__dirname, '../public/assets/css/starter.min.css')], readFile, function(err, results) {

		viewData.includeCSS = results[0];
	});

	// Home page
	router.get('/', function(req, res) {

		viewData.title = 'Interaction design and web development';
		viewData.pageClass = 'page page--home';

		res.render('index', viewData);
	});

	// 404 page
	router.get('*', function(req, res) {

		viewData.title = 'Interaction design and web development';
		viewData.pageClass = 'page page--error';

		res.render('404', viewData);
	});

	module.exports = router;