'use strict';

const controller     = require('./Controller'),
      mongoose       = require('mongoose'),
	  Round 		 = mongoose.model('Round')


const roundController = {

	setRoundWinner(req, res, next) {
		let idround = req.body.idround
		let iduser  = req.body.iduser
		let scope   = this

		Round.findOneAndUpdate({ _id: idround }, {'winner': iduser}, function(err, doc) {
			if (err)
				scope.returnResposeError(err,next)
			else if (!doc)
				scope.returnResposeNotFound(err,next)

			scope.returnResponseSuccess(res, msg = 'Round winner updated')
		})
	}

}


module.exports = roundController
