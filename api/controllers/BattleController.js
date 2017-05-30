'use strict';


const controller     = require('./Controller'),
      mongoose       = require('mongoose'),
      BattleService = require('../services/BattleService')


const battleController = {

	makeBattle(req, res, next) {
	    let t = BattleService.createBattle()
		res.send(t)
		next()
	}

}


module.exports = battleController
