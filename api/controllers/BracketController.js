
'use strict';


const controller = require('./Controller'),
	  _ 	     		 = require('lodash'),
	  mongoose     = require('mongoose'),
		User 	    	 = mongoose.model('User')


const randomize = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const timeToShine = function(users, count) {
	let r 			= 0
	let war 		= []
	let luckies = []

	users.map( (user) => {
		if(user.girlpower) war[user.id] = user
	})

	for(let i = 1; i < 2; i++) {
		r = randomize(0, war.length-1);
		luckies.push(war[r])
		users.splice( users.indexOf(war[r]) )
		count -= 1
	}

	users.map( (user) => {
		if(user.virgin) war.push(user)
	})

	for(let i = 1; i < 2; i++) {
		r = randomize(0, war.length-1);
		luckies.push(war[r])
		users.splice( users.indexOf(war[r]) )
		count -= 1
	}

	while(count != 0) {
		r = randomize(0, users.length-1);
		luckies.push(users[r])
		users.splice( users.indexOf(users[r]) )
		count -= 1
	}

	return luckies
}

const lottery = function (users) {
	let n = users.length

	let the_chosen_ones = []

	//luckies = 16
	if(n < 25) the_chosen_ones = timeToShine(users, 16)


	//luckies = 20
	if(n >= 25) the_chosen_ones = timeToShine(users, 20)

	return brackets(the_chosen_ones)
}




const bracketController = {

	teste(req, res, next) {
			let t = lottery(2)
			res.send(t)
			next()
	}

}



module.exports = bracketController
