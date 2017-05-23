
'use strict';


const controller = require('./Controller'),
	  _ 	     = require('lodash'),
	  mongoose   = require('mongoose'),
  	  Group 	 = mongoose.model('Group')


const groupController = {

	createGroup : function(req, res, next) {
	    let data = req.body || {}

	    let groupName 	= data.name
	    let groupMember = data.members

		let group = {
	    	name : groupName
		}
		group = new Group(group)
		console.log(group)
		// next(201)
	    controller.create(group, req, res, next)
	},

	getAllGroups : function(req, res, next) {
	    controller.getAll(Group, req, res, next)
	},
	getGroupById : function(req, res, next) {

		const id = req.params.group_id
		controller.getById(Group, id, req, res, next)

	},
	updateGroupById : function(req, res, next) {

	    let data = req.body || {}
	    let id   = req.params.group_id

	    controller.updateById(Group, id, data, req, res, next)

	},
	deleteGroupById : function(req, res, next) {

		let id = req.params.group_id
		controller.deleteById(Group, id, req, res, next)

	},
}

module.exports = groupController