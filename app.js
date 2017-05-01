var express = require('express');
const app = express();
var morgan = require('morgan');
var sequelize = require('sequelize');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require('./models');
var routes = require('./routes');
var routsWiki = require('./routes/wiki.js');


//logging middleware
app.use(morgan('dev'));

//static middleware
app.use(express.static('public'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when res.render works with html files, have it use nunjucks to do so

app.use('/', routes);

app.get('/', function(req, res, next){
	res.render('index');
})

//create the tables
models.db.sync({}) //syncs all the tables in the database, force: true will drop the table first and re-create it afterwards, good for if we make changes to a model definition
	.then(function(){
		app.listen(3000, () => {
			console.log('server is listening on port 3000!'); //cannot be 5432 because it will interfere with the database
		})
	})
	.catch(console.error);








