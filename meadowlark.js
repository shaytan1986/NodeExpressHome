var	express = require('express'),
	handlebars = require('express-handlebars').create({ defaultLayout:'main'}),
	fortune = require('./lib/fortune.js'),
	mocha = require('mocha');

var	app = express();


// Handlebars config
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set the port either to the value of process.env.PORT, or to 3000 if it doesnt exist
app.set('port', process.env.PORT || 3000); 

//set the static rout
app.use(express.static(__dirname + '/public'));

// set up a middleware to run mocha tests
app.use(function(req, res, next) {
	// res.locals is part of the "context" which will get passed to the views.
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'; // show tests if "test" = 1 and we're not in production
	next(); // Tells this middleware to move on to the next middleware in the stack
});

// ROUTES //
// app.get defines routes. Basicall it says "GET this resource based on the inputs to the app.get() function"
// the callback is a function of the style function(req, res)
/*
	Remember, this is a hierarchy, like a case statement. The first one that gets called will stop there
	UNLESS the next() is used.
	So in this hierarchy, if neither / or about is matched, it will fall through to 404 and 500 
*/
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about', {
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js' 
	});
});

// custom 404 page
app.use(function (req, res) {
	res.status(404);
	res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function () {
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});