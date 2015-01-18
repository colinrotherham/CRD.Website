/*
	Node.js app setup
	----------------------------------- */

	// Main dependencies
	var cluster = require('cluster'),
		express = require('express'),
		http = require('http'),
		os = require('os'),
		path = require('path'),
		handlebars = require('express-handlebars');

	// Set up new Handlebars environment
	handlebars = handlebars.create({
		extname: 'hbs',
		helpers: require('./lib/helpers'),
		options: { cache: true },
		layoutsDir: path.join(__dirname, '/views/layouts'),
		partialsDir: path.join(__dirname, '/views/partials')
	});

	// Express framework
	var app = express();
	app.listen(4000);

	// Set view engine
	app.engine('hbs', handlebars.engine)
		.set('views', path.join(__dirname, 'views'))
		.set('view engine', 'hbs')

		// Set up static file serving, add router
		.use(express.static(path.join(__dirname, 'public')))
		.use('/', require('./routes/index'));

	// Exit when quit
	process.on('SIGINT', function() {
		process.exit();
	});