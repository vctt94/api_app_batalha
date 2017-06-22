'use strict';


const _    = require('lodash'),
      controller        = require('./Controller'),
      mongoose          = require('mongoose'),
      BracketController = require('./BracketController'),
      UserController    = require('./UserController'),
      BattleService     = require('../services/BattleService'),
      MapRound          = require('../utils/MapRound'),
      Battle            = mongoose.model('Battle'),
      User              = mongoose.model('User')


const BattleController = {

    createBattle : function(req, res, next) {
        let users = req.body

	    let battle = BattleService.instantiateBattle(users)

        try {
            BracketController.saveBracket(battle.brackets, MapRound.STAGESTR[0])
        } catch(err) {
            controller.returnResponseError(res,err)
        }

        battle.save(function(err){
            if(err) controller.returnResponseError(res,err)

            Battle.findOne({_id: battle._id})
                  .populate('brackets')
                  .populate({
                      path: 'brackets',
                      populate: {
                          path: 'first_stage',
                          populate: {
                              path: 'first second third'
                          }
                      }
                  })
                  .exec(function(err, doc) {
                    if(err) controller.returnResponseError(res,err)
                    controller.returnResponseSuccess(res, doc, 'Battle instantiated')
                  })
        })
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

    _getBattleById : function(req, res, next){
        let id = req.params.battle_id
        controller.getById(Battle, id, req, res, next)
    },

    getBattleWinner : function(req, res, next){
    },

    getAllBattlesByWinner : function(req, res, next){
    },

    updateBattle : function(req, res, next){
        const battle_id  = req.body.battle_id
        const round_id   = req.body.round_id
        const user_id    = req.body.user_id


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

        controller.returnResponseSuccess(res, {}, 'Updated Succesfully')
    },

    setBattleWinner : function(req, res, next){
    },

    getLastestBattle : function(req, res, next){
        let latest = Battle.find({}).sort({ created: -1 }).limit(1).exec( (err, doc) => {
            if(err) controller.returnResponseError(res, err)
            controller.returnResponseSuccess(res, doc, 'Latest Battle returned')
        })
    },

    deleteBattle : function(req, res, next){
    }
}


module.exports = BattleController
