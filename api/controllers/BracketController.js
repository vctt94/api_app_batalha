'use strict';


const controller  = require('./Controller'),
  mongoose        = require('mongoose'),
  Bracket 		    = mongoose.model('Bracket'),
  RoundController = require('./RoundController'),
  BracketService  = require('../services/BracketService')

const BracketController = {

  getBracketById : function(bracket_id) {
    return new Promise( (resolve, reject) => {

      //Bracket.findById(bracket_id, function(err, doc) {
      //if (err) reject(err)
      //resolve(doc)
      //})
      Bracket.findOne({_id : bracket_id})
        .populate('first_stage quarter_final semi_final finale').exec(
        function(err, doc){
          if(err) reject(err)
          resolve(doc)
        })
    })
  },

  saveBracket : function(bracket, stage){
    let rounds = bracket[stage]
    for (var i = 0, len = rounds.length; i < len; i++) {
      RoundController.saveRound(rounds[i])
    }
    bracket.save(function(err){
      if(err) throw err
    })
  },

  _getBracketById : function(req, res, next){
    let id = req.params.bracket_id
    controller.getById(Bracket, id, req, res, next)
  },

  _getAllBrackets : function(req, res, next) {
    Bracket.find({}).exec(function(err,brackets){
      if(err) controller.returnResponseError(res,err)
      if(!brackets) controller.returnResponseNotFound(err,next)
      let bracketMap = {}
      brackets.forEach(function(bracket){
        bracketMap[bracket._id] = bracket
      })
      controller.returnResponseSuccess(res,bracketMap)
    })
  },


  updateBracket : function(res, bracket_id, round_id, user){

    const nextStage = BracketService.updateBracket()
      controller.returnResponseSuccess(res, nextStage, 'Updated Succesfully');


  }
}


module.exports = BracketController
