'use strict';


const _    = require('lodash'),
      controller        = require('./Controller'),
      mongoose          = require('mongoose'),
      RoundController   = require('./RoundController'),
      BracketController = require('./BracketController'),
      UserController    = require('./UserController'),
      BattleService     = require('../services/BattleService'),
      Battle            = mongoose.model('Battle'),
      User              = mongoose.model('User')


const BattleController = {

    createBattle : function(req, res, next) {
        let users = req.body

	    let battle = BattleService.instantiateBattle(users)

        try {
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

    getBattleById : function(battle_id){
        return new Promise( (resolve, reject) => {
            Battle.findById(battle_id, function(err, doc) {
                if (err) reject(err)
                resolve(doc)
            })
        })
    },

    getBattleWinner : function(req, res, next){
    },

    getAllBattlesByWinner : function(req, res, next){
    },

    updateBattle : function(req, res, next){
        const battle_id  = req.params.battle_id
        const round_id   = req.params.round_id
        const user_id    = req.params.user_id


        try {
            Promise.all([
                UserController.getUserById(user_id),
                BattleController.getBattleById(battle_id)
            ]).then( result => {
                let user       = result[0]
                let bracket_id = result[1].brackets

                BracketController.updateBracket(bracket_id, round_id, user)
            }).catch( err => {
                return controller.returnResponseError(res, err)
            })


        } catch(err) {
            return controller.returnResponseError(res, err)
        }

        //controller.returnResponseSuccess(res, data, 'Updated Succesfully')
    },

    getAsyncObjects : async function() {

    },

    setBattleWinner : function(req, res, next){
    },

    deleteBattle : function(req, res, next){
    }
}


module.exports = BattleController
