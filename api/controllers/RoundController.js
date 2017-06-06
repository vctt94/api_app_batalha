'use strict';

const controller     = require('./Controller'),
      mongoose       = require('mongoose'),
	  Round 		 = mongoose.model('Round')


const RoundController = {

	setRoundWinner(round_id, user){
		Round.findOneAndUpdate({ _id: round_id }, {'winner': user}, function(err, doc) {
			if (err) throw err 
			else if (!doc) throw new Error('Round not found')
        })
    },

    saveRound(round){
        round.save(function(err){
            if(err) throw err
        })
    },

    getRoundById(round_id){
        const roun = null
        Round.findById(round_id, function(err, doc) {
            if (err) throw err
            else if (!doc) throw new Error('Round not found')
                round = doc
        })
        return round;
    },

    _getRoundById : function(req, res, next){
        let id = req.params.round_id
        controller.getById(Round, id, req, res, next)
    },

    _getAllRounds : function(req, res, next) {
        Round.find({}).exec(function(err,rounds){
            if(err) controller.returnResponseError(err,next)
            if(!rounds) controller.returnResponseNotFound(err,next)
            let roundMap = {}
            rounds.forEach(function(round){
                roundMap[round._id] = round
            })
            controller.returnResponseSuccess(res,roundMap)
        })
    },


}


module.exports = RoundController
