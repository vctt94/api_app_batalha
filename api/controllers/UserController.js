
'use strict';


const controller = require('./Controller'),
	  _ 	     = require('lodash'),
	  mongoose   = require('mongoose'),
  	  User 	     = mongoose.model('User')


const userController = {

	createUser : function(req, res, next) {
	    let data = req.body || {}

	    let user = new User(data)
	    controller.create(user, req, res, next)
	},

	getAllUsers : function(req, res, next) {
	    controller.getAll(User, req, res, next)
	},
	getUserById : function(req, res, next) {

		const id = req.params.user_id
		controller.getById(User, id, req, res, next)

	},
	updateUserById : function(req, res, next) {

	    let data = req.body || {}
	    let id   = req.params.user_id

	    controller.updateById(User, id, data, req, res, next)

	},
	deleteUserById : function(req, res, next) {

		let id = req.params.user_id

		controller.deleteById(User, id, req, res, next)

	}
}

module.exports = userController