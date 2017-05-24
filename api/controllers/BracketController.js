
'use strict';


const controller = require('./Controller'),
	  _ 	     		 = require('lodash'),
	  mongoose     = require('mongoose'),
		User 	    	 = mongoose.model('User'),
		Round	       = mongoose.model('Round')



const lottery = function (n, users) {
	return '1+2';
}


const bracketController = {

	teste(req, res, next) {
			let t = lottery(2)
			res.send(t)
			next()
	}

}



module.exports = bracketController
