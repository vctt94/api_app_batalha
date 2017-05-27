
'use strict';


const controller = require('./Controller'),
      _ 	     		 = require('lodash'),
      mongoose     = require('mongoose'),
      User 	    	 = mongoose.model('User'),
      usercontroller  = require('./UserController')


const randomize = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const quota = function(users, war, luckies) {
    let r = randomize(0, war.length-1);
    luckies.push( war.splice(r, 1) )
    users.splice( users.indexOf(war[r]), 1 )
}

// ** Randomly select users to battle
const timeToShine = function(users, count) {
	let r 			= 0
    let numrounds   = 8
	let girls 		= []
    let virgins     = []
	let luckies     = []
    let rounds      = []

	users.map( (user) => {
        if(user.girlpower) { girls[user.id] = user }
        if(user.virgin) { virgins[user.id] = user }
	})

	for(let i = 0; i < 2; i++) { quota(users, girls, luckies) }
	for(let i = 0; i < 2; i++) { quota(users, virgins, luckies) }

    count -= 4

	while(count != 0) {
		r = randomize(0, users.length-1);
		luckies.push( users.splice(r, 1) )
		count -= 1
	}

	return luckies
}

// ** Organize the selected users in the initial bracket
const brackets = function (fighters) {
    let count = fighters.length
    let rounds = 8


    

}

const lottery = function (users) {
	let n = users.length
    let count = 0

	let the_chosen_ones = []

	//luckies = 16
	if(n < 25) count = 16
    else if(n >= 25) count = 20

    the_chosen_ones = timeToShine(users, count)

	return the_chosen_ones //brackets(the_chosen_ones)
}


const bracketController = {

	teste(req, res, next) {
			let t = lottery(usercontroller.getAllUsers())
			res.send(t)
			next()
	}

}


module.exports = bracketController
