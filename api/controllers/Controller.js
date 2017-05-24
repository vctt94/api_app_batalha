'use strict';


const _ 	   = require('lodash'),
	mongoose = require('mongoose')


const Controller = {

	returnResponseSuccess(res,data,msg){
		return res.json({
			success : true,
			data    : data,
			msg     : msg
		})

	},

	returnResposeError(err,next,msg){
		console.log(err)
		return next(new errors.InternalError(err.message))
	},

	create : function(type, req, res, next) {
		type.save(function(err) {
			if (err)
				this.returnResposeError(err,next)

			this.returnResponseSuccess(res,{},'Created with Success')

		})
	},

	getAll : function(type, req, res, next) {
		type.apiQuery(req.params, function(err, docs) {
			if (err)
				this.returnResposeError(err,next)

			this.returnResponseSuccess(res,docs)

		})
	},

	getById : function(type, id, req, res, next) {

		type.findOne({ _id: id }, function(err, doc) {

			if (err)
				this.returnResposeError(err,next)

			this.returnResponseSuccess(res,doc)

		})

	},

	updateById : function(type, id, data, req, res, next) {

		const scope = this
		type.findOneAndUpdate({ _id: id }, data, function(err, doc) {

			if (err)
				scope.returnResposeError(err,next)
			else if (!doc)
				return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))

			scope.returnResponseSuccess(res,data)

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
