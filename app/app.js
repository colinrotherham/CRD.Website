var express = require('express'),
	expressHandlebars = require('express-handlebars'),
	path = require('path');

var routes = require('./routes/index');
var app = express();
var server = app.listen(4000);

// Set up Handlebars
var handlebars = expressHandlebars.create({

	extname: 'hbs',
	helpers: {

		is: function (value, test, options) {

			if (value === test)
				return options.fn(this);

			else return options.inverse(this);
		}
	},
	options: {
		cache: true
	}
});

// Set default layout
app.locals.layout = path.join(__dirname, 'views/layouts/main.hbs');

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.engine('hbs', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Default router
app.use('/', routes);

module.exports = app;