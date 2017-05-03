
'use strict'

/**
 * Module Dependencies
 */
const _      = require('lodash'),
      errors = require('restify-errors')


/**
 * Model Schema
 */
const User = require('../models/User')


/**
 * Controllers
 */

const UserController = require('../controllers/UserController')

/**
 * Routes 
 */

server.post('user/create-user',  UserController.createUser)
server.get ('user/get-all-users', UserController.getAllUsers)



/**
 * GET
 */
server.get('/User/:user_id', function(req, res, next) {

    User.findOne({ _id: req.params.todo_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()

    })

})


/**
 * UPDATE
 */
server.put('/users/:user_id', function(req, res, next) {

    let data = req.body || {}

    if (!data._id) {
		_.extend(data, {
			_id: req.params.user_id
		})
	}

    User.findOne({ _id: req.params.user_id }, function(err, doc) {

		if (err) {
			log.error(err)
			return next(new errors.InvalidContentError(err.errors.name.message))
		} else if (!doc) {
			return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
		}

		User.update({ _id: data._id }, data, function(err) {


			if (err) {
				log.error(err)
				return next(new errors.InvalidContentError(err.errors.name.message))
			}


			res.send(200, data)
            next()

		})

	})

})

/**
 * DELETE
 */
server.del('/users/:user_id', function(req, res, next) {

    User.remove({ _id: req.params.todo_id }, function(err) {

		if (err) {
			log.error(err)
			return next(new errors.InvalidContentError(err.errors.name.message))
		}

		res.send(204)
        next()

	})

})
