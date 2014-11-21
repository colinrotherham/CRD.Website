var cluster = require('cluster'),
	express = require('express'),
	http = require('http'),
	os = require('os'),
	path = require('path');

// Express framework
var app = express();
app.listen(4000);

var helpers = require('./lib/helpers');
var routes = require('./routes/index');

// Set up Handlebars
var handlebars = require('express-handlebars').create({
	extname: 'hbs',
	helpers: helpers,
	options: { cache: true }
});

// Set default layout
app.locals.layout = path.join(__dirname, 'views/layouts/main.hbs');

// Set view engine
app.engine('hbs', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Default router
app.use('/', routes);

// Exit when quit
process.on('SIGINT', function() {
	process.exit();
});