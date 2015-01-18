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
		layout: path.join(__dirname, '../views/layouts/main.hbs'),
		includeCSS: '',
		includeJS: '',
		pageClass: ''
	};

	var assets = [
		path.join(__dirname, '../public/assets/css/base.css'),
		path.join(__dirname, '../public/assets/js/base.min.js')
	];

	function readFile(file, callback) {
		fs.readFile(file, 'utf8', callback);
	}

	// Map assets, render
	async.map(assets, readFile, function(err, results) {

		viewData.includeCSS = results[0];
		viewData.includeJS = results[1];
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