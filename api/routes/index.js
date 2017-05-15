
'use strict'

/**
 * Module Dependencies
 */
const _      = require('lodash'),
      errors = require('restify-errors')


/**
 * Model Schema
 */
const User = require('../models/User'),
      Group = require('../models/Group') 



/**
 * Controllers
 */

const userController  = require('../controllers/UserController'),
	  groupController = require('../controllers/GroupController'),
	  mapController	  = require('../controllers/MapController')

/*
 * user
 */ 
server.post('api/user/create-user',               userController.createUser)
server.get('api/user/get-all-users',              userController.getAllUsers)
server.get('api/user/get-user-by-id/:user_id',    userController.getUserById)
server.put('api/user/update-user-by-id/:user_id', userController.updateUserById)
server.del('api/user/delete-user-by-id/:user_id', userController.deleteUserById)

/*
 * groups
 */

server.post('api/group/create-group',                groupController.createGroup)
server.get('api/group/get-all-groups',               groupController.getAllGroups)
server.get('api/group/get-group-by-id/:group_id',    groupController.getGroupById)
server.put('api/group/update-group-by-id/:group_id', groupController.updateGroupById)
server.del('api/group/delete-group-by-id/:group_id', groupController.deleteGroupById)