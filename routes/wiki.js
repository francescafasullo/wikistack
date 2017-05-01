const express = require('express');
const wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', function(req, res, next){
	res.redirect('/');
})

wikiRouter.post('/', function(req, res, next){
	User.findOrCreate({
		where: {
			name: req.body.authorName,
			email: req.body.authorEmail
		}
	})
	.then(function(thatUser){
		var user = thatUser[0]; //returns the user and true or false based on if it created the user or found it, the user instance is the first item in the array

		var page = Page.build({
			title: req.body.title,
			content: req.body.content
		});

		return page.save().then(function(page){
			return page.setAuthor(user);
		});

	})
	.then(function(page){
		res.redirect(page.route);
	})
	.catch(next);
});


wikiRouter.get('/add', function(req, res, next){
	res.render('addpage');
});


wikiRouter.get('/:urlTitle', function(req, res, next){
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(function(foundPage){
		res.render('wikipage', {pageTitle: foundPage.title, pageContent: foundPage.content});
	})
	.catch(next);
});


module.exports = wikiRouter;
