var	express = require('express'),
	handlebars = require('express-handlebars').create({ defaultLayout:'main'});

var	app = express();

var fortunes = [
	"Conquer your fears or they will conquer you.", 
	"Rivers need springs.", 
	"Do not fear what you don't know.", 
	"You will have a pleasant surprise.", 
	"Whenever possible, keep it simple.", 
]; 

// Handlebars config
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set the port either to the value of process.env.PORT, or to 3000 if it doesnt exist
app.set('port', process.env.PORT || 3000); 

//set the static rout
app.use(express.static(__dirname + '/public'));

// app.get defines routes. Basicall it says "GET this resource based on the inputs to the app.get() function"
// the callback is a function of the style function(req, res)
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {fortune: randomFortune});
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
	res.render('500')
});

app.listen(app.get('port'), function () {
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});