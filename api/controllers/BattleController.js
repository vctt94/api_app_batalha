'use strict';


const controller        = require('./Controller'),
      mongoose          = require('mongoose'),
      RoundController   = require('./RoundController'),
      BracketController = require('./BracketController'),
      BattleService     = require('../services/BattleService')


const BattleController = {

    createBattle : function(req, res, next) {
	    let battle = BattleService.instantiateBattle()
        battle.save(function(err){
            if(err) controller.returnResponseError(err,next)
        }
        controller.returnResponseSuccess(res, battle, 'Battle instantiated')
	},

    getAllBattles : function(req, res, next) {
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
            user = UserController.getUserById()
            RoundController.updateRound(round_id, user)
            BracketController.updateBracket(bracket_id, round_id, user_id)
        } catch(err) {
            controller.returnResponseError(err,next)
        }

        controller.returnResponseSuccess(res, {}, 'Updated Succesfully')
    },

    setBattleWinner : function(req, res, next){
    },
deleteBattle : function(req, res, next){
    }
}


module.exports = BattleController
