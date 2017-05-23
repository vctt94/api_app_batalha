
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

            // for(let member of groupMembers) {
            //     User.findOne({_id: member._id},function (err, user) {
            //         user._group = group._id
            //         user.save(function (err) {
            //             if (err) return handleError(err);
            //             // thats it!
            //         })
            //         console.log(user)
            //         console.log(group)
            //     })
            // }

            res.json({success:true})
            next()
		})

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