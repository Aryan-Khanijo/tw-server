'use strict';

const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/user.controller');
const UserCRUD = new UserController();
const AuthMiddleware = require('../middlewares/auth.middleware');
const FollowingController = require('../controllers/following.controller');
const FollowerController = require('../controllers/follower.controller');
const tweetRoutes = require('./tweet.routes');
const FollowingCRUD = new FollowingController();
const FollowerCRUD = new FollowerController();

/**
 * @description Reditect to tweets route
 * @param {string} path
 */

routes.use('/:id/tweets', tweetRoutes);

/**
 * @description Get users
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof UserRoutes
 * @async
 * @param {string} id
 */

routes.get('/:id', AuthMiddleware.verifyToken, async (req, res) => {
	await UserCRUD.getUser(req, res);
});

routes.get('/', AuthMiddleware.verifyToken, async (req, res) => {
	await UserCRUD.getUserByName(req, res);
});


/**
 * @description Get Followers
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof UserRoutes
 * @async
 * @param {string} id
 */

routes.get('/:id/followers', AuthMiddleware.verifyToken, async (req, res) => {
	await FollowerCRUD.getFollower(req, res);
});

/**
 * @description Get Following
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof UserRoutes
 * @async
 * @param {string} id
 */
routes.get('/:id/following', AuthMiddleware.verifyToken, async (req, res) => {
	await FollowingCRUD.getFollowing(req, res);
});

/**
 * @description Follow a user
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof UserRoutes
 * @async
 * @param {string} id
 */

routes.post('/:id/follow', AuthMiddleware.verifyUser, async (req, res) => {
	await FollowerCRUD.addFollower(req, res);
});

/**
 * @description Unfollow a user
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof UserRoutes
 * @async
 * @param {string} id
 */

routes.post('/:id/unfollow', AuthMiddleware.verifyUser, async (req, res) => {
	await FollowerCRUD.deleteFollower(req, res);
});

module.exports = routes;