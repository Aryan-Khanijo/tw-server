'use strict';
const express = require('express');
const routes = express.Router();
const TweetController = require('../controllers/tweet.controller');
const TweetCRUD = new TweetController();
const AuthMiddleware = require('../middlewares/auth.middleware');

routes.get('/', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.getTweets(req, res);
});

routes.post('/', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.createTweet(req, res);
});

routes.get('/feed', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.getFeed(req, res);
});

routes.get('/:tId', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.getTweet(req, res);
});




module.exports = routes;