
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
				controller.returnResponseError(res,err)
			if(!users)
				controller.returnResponseNotFound(err,next)

			let userMap = {}

			users.forEach(function(user){
				userMap[user._id] = user
			})

			controller.returnResponseSuccess(res,userMap)
		})
	},

	getUserById : function(user_id) {
		return new Promise( (resolve, reject) => {

			User.findById(user_id, function(err, doc) {
				if (err) reject(err)
				resolve(doc)
			})
		})
	},

	searchUserByName : function(req, res, next){

		const name = req.params.name

		User.find({name : {$regex : name, $options: "i" } }).exec(function(err,users){
			if(err)
				controller.returnResponseError(res,err)

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
