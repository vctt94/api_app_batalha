const mongoose = require('mongoose'),
	  Bracket  = mongoose.model('Bracket'),
      Battle   = mongoose.model('Battle')
      BracketService = require('../services/BracketService')

const BattleService = {
    instantiateBattle() {

        bracket = BracketService.firstStage()

        battle = new Battle({'brackets': bracket})

        return battle
    }
}

module.exports = BattleService

