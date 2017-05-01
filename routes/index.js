const express = require('express');
const router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');
var models = require('../models');
var Page = models.Page;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function(req, res, next){
	Page.findAll()
	.then(function(result){
		res.render('index', {pages: result});
	})
})

module.exports = router

