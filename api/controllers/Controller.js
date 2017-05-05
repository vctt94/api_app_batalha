'use strict';


const _ 	   = require('lodash'),
	  mongoose = require('mongoose')


const Controller = {

	create : function(type, req, res, next) {
	    type.save(function(err) {
	        if (err) {
	            log.error(err)
	            return next(new errors.InternalError(err.message))
	            next()
	        }

	        res.send(201)
	        next()

	    })
	},

	getAll : function(type, req, res, next) {
	    type.apiQuery(req.params, function(err, docs) {

	        if (err) {
	            log.error(err)
	            return next(new errors.InvalidContentError(err.errors.name.message))
	        }

	        res.send(docs)
	        next()

	    })
	},

	getById : function(type, id, req, res, next) {

	    type.findOne({ _id: id }, function(err, doc) {

	        if (err) {
	            log.error(err)
	            return next(new errors.InvalidContentError(err.errors.name.message))
	        }

	        res.send(doc)
	        next()

	    })

	},

	updateById : function(type, id, data, req, res, next) {

	    type.findOne({ _id: id }, function(err, doc) {

			if (err) {
				log.error(err)
				return next(new errors.InvalidContentError(err.errors.name.message))
			} else if (!doc) {
				return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
			}

			console.log(doc)
			type.update({ _id: doc._id }, data, function(err) {

				if (err) {
					log.error(err)
					return next(new errors.InvalidContentError(err.errors.name.message))
				}
				
				res.send(200, data)
	            next()

			})

		})

	},

	deleteById : function(type, id, req, res, next) {

	    type.remove({ _id: id }, function(err) {

			if (err) {
				log.error(err)
				return next(new errors.InvalidContentError(err.errors.name.message))
			}

			res.send(204)
	        next()

		})

	},

}

module.exports = Controller