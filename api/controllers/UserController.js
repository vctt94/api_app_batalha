
'use strict';


const controller = require('./Controller'),
	_ 	     = require('lodash'),
	mongoose   = require('mongoose'),
	User 	     = mongoose.model('User')


const UserController = {

	createUser : function(req, res, next) {
		let data = req.body || {}

		let user = new User(data)

		controller.create(user, req, res, next)
	},

	getAllUsers : function(req, res, next) {

		User.find({}).exec(function(err,users){

			if(err)
				controller.returnResposeError(err,next)
			if(!users)
				controller.returnResposeNotFound(err,next)

			let userMap = {}

			users.forEach(function(user){
				userMap[user._id] = user
			})

			controller.returnResponseSuccess(res,userMap)
		})
	},

	getUserById : function(req, res, next) {

		const id = req.params.user_id
		controller.getById(User, id, req, res, next)

	},

	searchUserByName : function(req, res, next){

		const name = req.params.name

		User.find({name : {$regex : name, $options: "i" } }).exec(function(err,users){
			if(err)
				controller.returnResposeError(err,next)

			controller.returnResponseSuccess(res,users)
		})

	},

	updateUserById : function(req, res, next) {

		let data = req.body || {}
		let id   = req.params.user_id

		controller.updateById(User, id, data, req, res, next)

	},

	deleteUserById : function(req, res, next) {

		let id = req.params.user_id
		controller.deleteById(User, id, req, res, next)

	},
}

module.exports = UserController
