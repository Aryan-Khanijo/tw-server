'use strict';

const BaseController = require('./base.controller');
const TweetService = require('../service/tweet.service');
const { tweetModel } = require('../schema/models/tweet.model');
const FollowerService = require('../service/follower.service');
const { options } = require('../routes/tweet.routes');

module.exports = class TweetController extends BaseController {
	constructor() {
		super(TweetService, tweetModel, 'tweets');
		this.followerService = new FollowerService();
	}

	async getFeed(req, res) {
		try	{
			if (!this._validateRequest(req, res))
				return;
			const user_id = req.user.user_id;
			const page = req.query.$page || 1;
			const limit = (req.query.$limit<20 && req.query.$limit) || 10;
			const follower_ids = await this.followerService.getFollowers(user_id);
			let tweets = [];
			if (follower_ids.length > 0)
				tweets = await this.service.getFeed(follower_ids, page, limit);
			if (tweets.length === 0) {
				return this.httpResponse(res, 204, 'success', 'No tweets found');
			}
			return this.httpResponse(res, 200, 'Tweets found', tweets);
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

	async getTweets(req, res) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const user_id = req.user.user_id;
			const options = {
				page: 1,
				limit: 10,
				order: '-created_at',
				conditions: [
					{ column: 'user_id', values: [user_id] }
				]
			}
			const tweets = await this.getAll(options);
			if (tweets.length === 0) {
				return this.httpResponse(res, 204, 'success', 'No tweets found');
			}
			return this.httpResponse(res, 200, 'Tweets found', tweets);
		}
		catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

	async createTweet(req, res) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const tweet = this.model(req.body.tweet, req.body.user_id);
			const result = await this.create(tweet);
			if(!result)
				return this.httpResponse(res, 400, 'error', 'Unable to create tweet');
			return this.httpResponse(res, 201, 'Tweet created', result);
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

	async getTweet(req, res) {
		try {
			
			if (!this._validateRequest(req, res))
				return;
			const options = {
				conditions: [
					{ 'column': 'id', 'values': [req.params.tId] }
				]};
			const tweet = await this.getSingle(options);
			if (!tweet) {
				return this.httpResponse(res, 404, 'Not Found', 'Tweet Does not exist');
			}
			return this.httpResponse(res, 200, 'Tweet found', tweet);
		}
		catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}
}