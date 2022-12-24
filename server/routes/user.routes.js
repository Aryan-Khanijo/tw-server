'use strict';

const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/user.controller');
const UserCRUD = new UserController();
const AuthMiddleware = require('../middlewares/auth.middleware');
const FollowingController = require('../controllers/following.controller');
const FollowerController = require('../controllers/follower.controller');
const FollowingCRUD = new FollowingController();
const FollowerCRUD = new FollowerController();

routes.get('/:id', AuthMiddleware.verifyToken, async (req, res) => {
	await UserCRUD.getUser(req, res);
});

routes.get('/:id/followers', AuthMiddleware.verifyToken, async (req, res) => {
	await FollowerCRUD.getFollowers(req, res);
});


routes.get('/:id/following', AuthMiddleware.verifyToken, async (req, res) => {
	await FollowingCRUD.getFollowing(req, res);
});

module.exports = routes;