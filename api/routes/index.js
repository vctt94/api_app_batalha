
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

const userController = require('../controllers/UserController')

/**
 * Routes 
 */
server.post('/user/create-user',               userController.createUser)
server.get('/user/get-all-users',              userController.getAllUsers)
server.get('/user/get-user-by-id/:user_id',    userController.getUserById)
server.put('/user/update-user-by-id/:user_id', userController.updateUserById)
server.del('/user/delete-user-by-id/:user_id', userController.deleteUserById)
