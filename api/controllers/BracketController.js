
'use strict';


const controller = require('./Controller'),
	  _ 	     		 = require('lodash'),
	  mongoose     = require('mongoose')


const lottery = function (n, users) {
	return '1+2';
}


class BracketController {

	teste(req, res, next) {
			let t = lottery(2)
			res.send(t)
			next()
	}

}

const object = new BracketController()

module.exports = object
