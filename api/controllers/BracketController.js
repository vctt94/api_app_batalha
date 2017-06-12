'use strict';


const controller        = require('./Controller'),
      mongoose          = require('mongoose'),
	  Bracket 		    = mongoose.model('Bracket'),
      RoundController   = require('./RoundController'),
      BracketService    = require('../services/BracketService')


const BracketController = {

    getBracketById : function(bracket_id) {
        const bracket = null
        Bracket.findById(bracket_id, function(err, doc) {
            if (err) throw err
            else if (!doc) throw new Error('Bracket not found')
            bracket = doc
        })
        return bracket;
    },

    saveFirstBracket : function(bracket){
        let rounds = bracket.first_stage
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

    updateBracket : function(bracket_id, round_id, user){

        //var bracket = null
        //var round = null

        //RoundController.setRoundWinner(round_id, user)

        //round = RoundController.getRoundById(round_id);
        //// PRECISA DO THIS?
        //bracket = this.getBracketById(bracket_id);

        // REALMENTE PRECISO PROCURAR DE NOVO?
        Bracket.findOneAndUpdate({ _id: bracket_id }, data, function(err, doc) {
			if (err) throw err
			else if (!doc) throw new Error('Bracket not found')
        })

    }

}


module.exports = BracketController
