
'use strict';


const controller = require('./Controller'),
	  _ 	     = require('lodash'),
	  mongoose   = require('mongoose'),
  	  Group 	 = mongoose.model('Group'),
  	  User 	 	 = mongoose.model('User')


const groupController = {

	createGroup : function(req, res, next) {
	    let data = req.body || {}

	    let groupName 	 = data.name
	    let groupMembers = data.members


		let group = new Group({name: groupName})
		group.save(function(err){

			if(err) {
				console.log(err)
                return next(new errors.InternalError(err.message))
            }
			
            for(let member of groupMembers) {
                User.findOne({_id: member._id},function (err, user) {
                    console.log(user)

                    group._members.push(user)
					group.save(function(err) {

                        if (err)
                            return next(new errors.InternalError(err.message))
                    })

                })
            }
            console.log(group)

            res.json({success:true,group: group})
		})

	},

	getAllGroups : function(req, res, next) {
		Group.find({},function(err,groups){
			let groupMap = {}

			groups.forEach(function(group){
				groupMap[group._id] = group
			})

			res.send(groupMap)
		})
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