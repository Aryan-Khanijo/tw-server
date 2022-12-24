'use strict';

const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/user.controller');
const UserCRUD = new UserController();
const AuthMiddleware = require('../middlewares/auth.middleware');
const FollowingController = require('../controllers/following.controller');
const FollowerController = require('../controllers/follower.controller');
const router = require('./auth.routes');
const FollowingCRUD = new FollowingController();
const FollowerCRUD = new FollowerController();

routes.get('/:id', AuthMiddleware.verifyToken, async (req, res) => {
	await UserCRUD.getUser(req, res);
});

routes.get('/:id/followers', AuthMiddleware.verifyToken, async (req, res) => {
	await FollowerCRUD.getFollower(req, res);
});


routes.get('/:id/following', AuthMiddleware.verifyToken, async (req, res) => {
	await FollowingCRUD.getFollowing(req, res);
});

routes.post('/:id/follow', AuthMiddleware.verifyUser, async (req, res) => {
	await FollowerCRUD.addFollower(req, res);
});

routes.post('/:id/unfollow', AuthMiddleware.verifyUser, async (req, res) => {
	await FollowerCRUD.deleteFollower(req, res);
});

module.exports = routes;