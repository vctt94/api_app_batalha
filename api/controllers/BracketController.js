
'use strict';


const controller     = require('./Controller'),
      _ 	 		       = require('lodash'),
      mongoose       = require('mongoose'),
      BracketService = require('../services/BracketService')


const bracketController = {

	makeBracket(req, res, next) {
	    let t = BracketService.lottery(req.body.users)
			res.send(t)
			next()
	}

}


module.exports = bracketController
