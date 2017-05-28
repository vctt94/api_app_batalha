'use strict';


const controller     = require('./Controller'),
      mongoose       = require('mongoose'),
      BracketService = require('../services/BracketService')


const bracketController = {

	makeBracket(req, res, next) {
	    let t = BracketService.firstStage()
		res.send(t)
		next()
	}

}


module.exports = bracketController
