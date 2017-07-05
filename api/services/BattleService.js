const mongoose = require('mongoose'),
	  Bracket  = mongoose.model('Bracket'),
      Battle   = mongoose.model('Battle')
      BracketService = require('../services/BracketService')

const BattleService = {
    instantiateBattle(data) {

        bracket = BracketService.firstStage(data.usersSubscribed)

        battle  = new Battle({
			'name': data.name,
			'description': data.description,
			'brackets': bracket
		})

        return battle
    }
}

module.exports = BattleService
