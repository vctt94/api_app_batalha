
'use strict';


const controller = require('./Controller'),
	  _ 	     = require('lodash'),
	  mongoose   = require('mongoose'),
  	  Group 	 = mongoose.model('Group')


const groupController = {

	createGroup : function(req, res, next) {
	    let data = req.body || {}

	    let group = new Group(data)
	    controller.create(group, req, res, next)

	},

	getAllGroups : function(req, res, next) {
	    controller.getAll(Group, req, res, next)
	},
	getGroupById : function(req, res, next) {

	    Group.findOne({ _id: req.params.group_id }, function(err, doc) {

	        if (err) {
	            log.error(err)
	            return next(new errors.InvalidContentError(err.errors.name.message))
	        }

	        res.send(doc)
	        next()

	    })

	},
	updateGroupById : function(req, res, next) {

	    let data = req.body || {}

	    console.log(data)

	    if (!data._id) {
			_.extend(data, {
				_id: req.params.group_id
			})
		}

	    Group.findOne({ _id: req.params.group_id }, function(err, doc) {

			if (err) {
				log.error(err)
				return next(new errors.InvalidContentError(err.errors.name.message))
			} else if (!doc) {
				return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
			}

			Group.update({ _id: data._id }, data, function(err) {


				if (err) {
					log.error(err)
					return next(new errors.InvalidContentError(err.errors.name.message))
				}


				res.send(200, data)
	            next()

			})

		})

	},
	deleteGroupById : function(req, res, next) {

	    Group.remove({ _id: req.params.group_id }, function(err) {

			if (err) {
				log.error(err)
				return next(new errors.InvalidContentError(err.errors.name.message))
			}

			res.send(204)
	        next()

		})

	}
}

module.exports = groupController