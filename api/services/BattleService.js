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

    return new Promise((resolve,reject)=>{

      let user;

      userService.getUser(user_id).then(userFounded => {
        user = userFounded;
        roundService.setWinner(round_id,user)
      })

      Promise.all([
        roundService.getRound(round_id),
        this.getBattle(battle_id)
      ]).then( results => {

        const round = results[0],
          battle    = results[1],
          brackets  = battle.brackets;

        bracketService.updateBracket(brackets, round, user).then(response=>{
          resolve(response)
        })

      }).catch(err=>{reject(err)})

    })



  },
  instantiateBattle(data) {

    const bracket = bracketService.firstStage(data.usersSubscribed)

    return new Battle({
      'name': data.name,
      'description': data.description,
      'brackets': bracket
    })

  }
}

module.exports = BattleService
