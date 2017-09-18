const mongoose = require('mongoose'),
  Bracket  = mongoose.model('Bracket'),
  Battle   = mongoose.model('Battle'),
  service  = require('./Service'),
  userService = require('../services/UserService'),
  roundService = require('../services/RoundService'),
  bracketService = require('../services/BracketService')

const BattleService = {

  getAllBattles(){
    return service.getAllPopulating(Battle,'brackets')
  },
  getBattle(id){
    return service.getByIdPopulating(Battle,id,'brackets')
  },
  deleteBattle(id){
    return service.deleteById(Battle,id)
  },
  getBracketByBattle(battle_id){

  },
  updateBattle(battle_id,round_id,user_id){

    Promise.all([
      userService.getUser(user_id),
      roundService.getRound(round_id),
      this.getBattle(battle_id)
    ]).then( result => {

      const user = result[0],
        round    = result[1],
        battle   = result[2],
        brackets = battle.brackets;

      return bracketService.updateBracket(brackets, round, user)

    })


  },
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
