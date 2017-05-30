const mongoose = require('mongoose'),
	  Bracket  = mongoose.model('Bracket'),
      Battle   = mongoose.model('Battle')
      BracketService = require('../services/BracketService')

const BattleService = {
    createBattle() {

        firstStage = BracketService.firstStage()

        battle = new Battle({'brackets': firstStage})

        return battle
    }
}

module.exports = BattleService

