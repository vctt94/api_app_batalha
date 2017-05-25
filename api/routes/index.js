
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

const userController    = require('../controllers/UserController'),
  groupController   = require('../controllers/GroupController'),
  bracketController = require('../controllers/BracketController')

/**
 * Routes
 */

/*
 * brackets
 */

server.get('/bracket/info',                      bracketController.teste)

/*
 * user
 */

server.post('/user/create-user',               userController.createUser)
server.post('/user/search-user-by-name',       userController.searchUserByName)
server.get('/user/get-all-users',              userController.getAllUsers)
server.get('/user/get-user-by-id/:user_id',    userController.getUserById)
server.put('/user/update-user-by-id/:user_id', userController.updateUserById)
server.del('/user/delete-user-by-id/:user_id', userController.deleteUserById)

/*
 * groups
 */

server.post('/group/create-group',                groupController.createGroup)
server.get('/group/get-all-groups',               groupController.getAllGroups)
server.get('/group/get-group-by-id/:group_id',    groupController.getGroupById)
server.put('/group/update-group-by-id/:group_id', groupController.updateGroupById)
server.del('/group/delete-group-by-id/:group_id', groupController.deleteGroupById)
