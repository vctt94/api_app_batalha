'use strict';


const _    = require('lodash'),
  controller        = require('./Controller'),
  mongoose          = require('mongoose'),
  BracketController = require('./BracketController'),
  UserController    = require('./UserController'),
  battleService     = require('../services/BattleService'),
  MapRound          = require('../utils/MapRound'),
  Battle            = mongoose.model('Battle'),
  User              = mongoose.model('User')


const BattleController = {

  battles(req, res, next){
    battleService.getAllBattles().then(battles=>{
      controller.returnResponseSuccess(res,battles)
    }).catch(err=>{
      return controller.returnResponseError(res,err)
    })
  },

  deleteBattle(req, res, next){
    const id = req.params.id

    battleService.deleteBattle(id).then(response => {
      controller.returnResponseSuccess(res,{},"Deleted successfully")
    }).catch(err => {
      controller.returnResponseError(res, err)
    })
  },

  createBattle : function(req, res, next) {
    let data = req.body;

    let battle = battleService.instantiateBattle(data);

    try {
      BracketController.saveBracket(battle.brackets, MapRound.STAGESTR[0]);
    } catch(err) {
      controller.returnResponseError(res,err);
    }

    battle.save(function(err){
      if(err) controller.returnResponseError(res,err);

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
          if(err) controller.returnResponseError(res,err);
          controller.returnResponseSuccess(res, doc, 'Battle instantiated');
        })
    })
  },

  endBattle: function(req, res, next) {
    let battle_id = req.body.battle_id;
    let winner_id = req.body.winner_id;

    Battle.findOneAndUpdate({_id: battle_id}, {active: false}, function(err, doc) {
      if(err) controller.returnResponseError(res, err);
      controller.returnResponseSuccess(res, {}, 'Battle ended with success');
    })
  },

  getAllBattles : function(req, res, next) {
    battleService.getAllBattles().then( battles =>{
      return controller.returnResponseSuccess(res,battles)
    }).catch(err=>{
      controller.returnResponseError(err)
    })

  },

  getBattleById : function(battle_id){
      Battle.findById(battle_id, function(err, doc) {
        if (err) reject(err);
        resolve(doc);
      })
  },

  _getBattleById : function(req, res, next){
    const id = req.params.battle_id;
    battleService.getBattle(id).then(battle=>{
      return controller.returnResponseSuccess(res,battle)
    })
  },

  updateBattle : function(req, res, next){

    const battle_id  = req.body.battle_id;
    const round_id   = req.body.round_id;
    const user_id    = req.body.user_id;

    const updated = battleService.updateBattle(battle_id,round_id,user_id)

    return controller.returnResponseSuccess(res,updated)
  },

  setBattleWinner : function(req, res, next){
    let battle_id = req.body.battle_id
    let user_id   = req.body.user_id

    Battle.findOneAndUpdate({_id: battle_id}, {'winner': user_id}, function(err, doc) {
      if(err) controller.returnResponseError(res, err)

      controller.returnResponseSuccess(res, doc, 'Setted winner for battle')
    })
  },

  getLastestBattle : function(req, res, next){
    //   Battle.findOne({active: true}, function(err, doc) {
    //     if(err) controller.returnResponseError(res, err);
    //     controller.returnResponseSuccess(res, doc, 'Latest Battle returned');
    //   })
    Battle.find({})
      .populate('brackets')
      .populate({
        path: 'brackets',
        populate: {
          path: 'first_stage quarter_final semi_final finale',
          populate: {
            path: 'first second third'
          }

        }
      })
      .sort({ created: -1 })
      .limit(1)
      .exec( (err, doc) => {
        if(err) controller.returnResponseError(res, err)

        controller.returnResponseSuccess(res, doc, 'Latest Battle returned')
      })
  },

  deleteAllBattles : function(req, res, next){
    Battle.remove({}, function(err, doc) {
      if(err) controller.returnResponseError(res, err)

      controller.returnResponseSuccess(res, {}, 'All battles deleted')
    })
  }
}


module.exports = BattleController
