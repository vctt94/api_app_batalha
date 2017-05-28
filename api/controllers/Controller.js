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

	returnResposeNotFound(err,next){
		console.log(err)
		return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
	},

	create : function(type, req, res, next) {
		const scope = this
		type.save(function(err) {
			if (err)
        scope.returnResposeError(err,next)

      scope.returnResponseSuccess(res,{},'Created with Success')

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

		const scope = this

		type.findOne({ _id: id }, function(err, doc) {

			if (err)
        scope.returnResposeError(err,next)

      scope.returnResponseSuccess(res,doc)

		})

	},

	updateById : function(type, id, data, req, res, next) {

		const scope = this
		type.findOneAndUpdate({ _id: id }, data, function(err, doc) {

			if (err)
				scope.returnResposeError(err,next)
			else if (!doc)
				scope.returnResposeNotFound(err,next)


			scope.returnResponseSuccess(res,data)

		})

	},

	deleteById : function(type, id, req, res, next) {

		const scope = this
		type.remove({ _id: id }, function(err) {

			if (err)
				scope.returnResposeError(err,next)

			scope.returnResponseSuccess(res,[],'deleted with success')


		})

	},

}

module.exports = Controller
