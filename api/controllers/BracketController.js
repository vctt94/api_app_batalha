'use strict';


const controller        = require('./Controller'),
      mongoose          = require('mongoose'),
	  Bracket 		    = mongoose.model('Bracket'),
      RoundController   = require('./RoundController'),
      BracketService    = require('../services/BracketService')


const BracketController = {

    getBracketById : function(bracket_id) {
        const bracket;
        Bracket.findById(bracket_id, function(err, doc) {
            if (err) throw err
            else if (!doc) throw new Error('Bracket not found')
            bracket = doc
        })
        return bracket;
    },

    updateBracket : function(bracket_id, round_id, user){

        const bracket
        const round

        round = RoundController.getRoundById(round_id);
        // PRECISA DO THIS?
        bracket = getBracketById(bracket_id);

        const data = BracketService.getNextStageUpdated(bracket, round, user)

        Bracket.findOneAndUpdate({ _id: bracket_id }, data, function(err, doc) {
			if (err) throw err 
			else if (!doc) throw new Error('Bracket not found')
        })

    }

}


module.exports = BracketController
