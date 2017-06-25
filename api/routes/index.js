
'use strict'

/**
 * Module Dependencies
 */
const _    = require('lodash'),
  errors   = require('restify-errors')


/**
 * Model Schema
 */
const User    = require('../models/User'),
      Group   = require('../models/Group'),
      Bracket = require('../models/Bracket'),
      Round   = require('../models/Round'),
      Battle  = require('../models/Battle')



/**
 * Controllers
 */

const userController    = require('../controllers/UserController'),
      groupController   = require('../controllers/GroupController'),
      bracketController = require('../controllers/BracketController'),
      roundController   = require('../controllers/RoundController'),
      battleController  = require('../controllers/BattleController')


 /**
  * Routes
  */

 /*
  * rounds
  */

server.get('/round/get-rounds',                   roundController._getAllRounds)
server.get('/round/get-round-by-id/:round_id',    roundController._getRoundById)

/*
 * battles
 */
server.get('/battle/get-latest-battle',            battleController.getLastestBattle)
server.get('/battle/get-battles',                  battleController.getAllBattles)
server.get('/battle/get-battle-by-id/:battle_id',  battleController._getBattleById)
server.get('/battle/delete-all-battles',           battleController.deleteAllBattles)
server.post('/battle/update-battle',               battleController.updateBattle)
server.post('/battle/make-battle',                 battleController.createBattle)
server.put('/battle/end-battle',                   battleController.endBattle)

/*
 * brackets
 */

server.get('/bracket/get-bracket-by-id/:bracket_id',  bracketController._getBracketById)
server.get('/bracket/get-brackets',                   bracketController._getAllBrackets)

/*
 * user
 */

server.post('/user/create-user',               userController.createUser)
server.post('/user/search-user-by-name',       userController.searchUserByName)
server.get('/user/get-all-users',              userController.getAllUsers)
server.get('/user/get-user-by-id/:user_id',    userController._getUserById)
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
