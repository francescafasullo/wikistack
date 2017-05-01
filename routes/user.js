const express = require('express');
const userRouter = express.Router();

var models = require('../models');
var User = models.User;
var Page = models.Page;

userRouter.get('/', function(req, res, next){
	User.findAll()
	.then(function(result){
		res.render('users', {users: result});
	})
})

userRouter.get('/:id', function(req, res, next){
	User.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(function(user){

		Page.findAll({
			where: {
				authorId: user.id
			}
		}).then(function(pages){
			console.log("user id", user.id);
			res.render("userPageList", {authorName: user.name, pages: pages})

		})


	}).catch(next);
	
})

module.exports = userRouter;



// wikiRouter.get('/:urlTitle', function(req, res, next){
// 	Page.findOne({
// 		where: {
// 			urlTitle: req.params.urlTitle
// 		}
// 	})
// 	.then(function(foundPage){
// 		res.render('wikipage', {pageTitle: foundPage.title, pageContent: foundPage.content});
// 	})
// 	.catch(next);
// });