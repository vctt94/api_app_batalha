'use strict';


const _    = require('lodash'),
      controller        = require('./Controller'),
      mongoose          = require('mongoose'),
      RoundController   = require('./RoundController'),
      BracketController = require('./BracketController'),
      UserController    = require('./UserController'),
      BattleService     = require('../services/BattleService'),
      Battle            = mongoose.model('Battle')


const BattleController = {

    createBattle : function(req, res, next) {
	    let battle = BattleService.instantiateBattle()

        try{
            BracketController.saveFirstBracket(battle.brackets)
        } catch(err) {
            controller.returnResponseError(err,next)
        }

        battle.save(function(err){
            if(err) controller.returnResponseError(err,next)
        })
        controller.returnResponseSuccess(res, battle, 'Battle instantiated')
	},

    getAllBattles : function(req, res, next) {
        Battle.find({}).exec(function(err,battles){
            if(err) controller.returnResponseError(err,next)
            if(!battles) controller.returnResponseNotFound(err,next)
            let battleMap = {}
            battles.forEach(function(battle){
                battleMap[battle._id] = battle
            })
            controller.returnResponseSuccess(res,battleMap)
        })
    },

    getBattleById : function(battle_id){
        var battle
        Battle.findById(battle_id, function(err, doc) {
            if (err) throw err
            else if (!doc) throw new Error('Battle not found')
            battle = doc
        })
        return battle
    },

    getBattleWinner : function(req, res, next){
    },

    getAllBattlesByWinner : function(req, res, next){
    },

    updateBattle : function(req, res, next){
        const battle_id  = req.params.battle_id
        const round_id   = req.params.round_id
        const user_id    = req.params.user_id
        var data       = {message : ""}


        try {
            //let battle = BattleController.getBattleById(battle_id)
            //const bracket_id = battle.brackets
            var user = UserController.getUserById(user_id)
            //BracketController.updateBracket(bracket_id, round_id, user)
        } catch(err) {
            data.message = err.message
        }

        //controller.returnResponseSuccess(res, data, 'Updated Succesfully')
        console.log(data.message)
    },

    setBattleWinner : function(req, res, next){
    },
deleteBattle : function(req, res, next){
    }
}


module.exports = BattleController
