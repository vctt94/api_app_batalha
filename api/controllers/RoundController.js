'use strict';

const controller     = require('./Controller'),
      mongoose       = require('mongoose'),
	  Round 		 = mongoose.model('Round')


const RoundController = {

	updateRound(round_id, user){

		Round.findOneAndUpdate({ _id: round_id }, {'winner': user}, function(err, doc) {
			if (err) throw err 
			else if (!doc) throw new Error('Round not found')
        })

    },

    getRoundById(round_id){
        const round
        Round.findById(round_id, function(err, doc) {
            if (err) throw err
            else if (!doc) throw new Error('Round not found')
                round = doc
        })
        return round;
    }


}


module.exports = RoundController
