'use strict';
const express = require('express');
const routes = express.Router();
const TweetController = require('../controllers/tweet.controller');
const TweetCRUD = new TweetController();
const AuthMiddleware = require('../middlewares/auth.middleware');

/**
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof TweetRoutes
 * @async
 * @description Get all tweets
 */
routes.get('/', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.getTweets(req, res);
});

/**
 * @description Create a tweet
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof TweetRoutes
 * @async
 */
routes.post('/', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.createTweet(req, res);
});

/**
 * @description Get user's feed
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof TweetRoutes
 * @async
 */

routes.get('/feed', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.getFeed(req, res);
});

/**
 * @description Get a tweet
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof TweetRoutes
 * @async
 * @param {string} tId
 */
routes.get('/:tId', AuthMiddleware.verifyToken, async (req, res) => {
	await TweetCRUD.getTweet(req, res);
});




module.exports = routes;