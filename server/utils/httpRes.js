'use strict';

/**
 * 
 * @param {*} res 
 * @param {*} status 
 * @param {*} message 
 * @param {*} data 
 * @description This function is to return a response to the client
 * @returns {Object} res
 */
const httpResponse = (res, status, message, data) => {
	return res.status(status).json({
		message,
		data
	});
}

module.exports = {
	httpResponse
}