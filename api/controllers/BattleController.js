'use strict';


const controller        = require('./Controller'),
      mongoose          = require('mongoose'),
      RoundController   = require('./RoundController'),
      BracketController = require('./BracketController'),
      BattleService     = require('../services/BattleService'),
      Battle            = mongoose.model('Battle')


const BattleController = {

    createBattle : function(req, res, next) {
        let users = req.data.users

	    let battle = BattleService.instantiateBattle()

        try{
            BracketController.saveFirstBracket(battle.brackets)
        } catch(err) {
            controller.returnResponseError(res,err)
        }

        battle.save(function(err){
            if(err) controller.returnResponseError(res,err)
        })
        controller.returnResponseSuccess(res, battle, 'Battle instantiated')
	},

    getAllBattles : function(req, res, next) {
        Battle.find({}).exec(function(err,battles){
            if(err) controller.returnResponseError(res,err)
            if(!battles) controller.returnResponseNotFound(err,next)
            
            let battleMap = {}

            battles.forEach(function(battle){
                battleMap[battle._id] = battle
            })

            controller.returnResponseSuccess(res,battleMap)
        })
    },

    getBattle : function(req, res, next){
    },

    getBattleWinner : function(req, res, next){
    },

    getAllBattlesByWinner : function(req, res, next){
    },

    updateBattle : function(req, res, next){
        const battle_id = req.params.battle_id
        const round_id  = req.params.round_id
        const user_id   = req.params.user_id

        try {
            user = UserController.getUserById(user_id)
            RoundController.setRoundWinner(round_id, user)
            BracketController.updateBracket(bracket_id, round_id, user_id)
        } catch(err) {
            controller.returnResponseError(res,err)
        }

        controller.returnResponseSuccess(res, {}, 'Updated Succesfully')
    },

    setBattleWinner : function(req, res, next){
    },
deleteBattle : function(req, res, next){
    }
}


module.exports = BattleController
