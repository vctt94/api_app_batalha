const mongoose = require('mongoose'),
	  User 	   = mongoose.model('User'),
	  Bracket  = mongoose.model('Bracket'),
	  Round    = mongoose.model('Round')

var count = 0

const randomize = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const quota = function(users, quotes, luckies) {
	do {
		if(quotes.length == 0) return
		var r     = randomize(0, quotes.length-1)
		var lucky = quotes[r]
		quotes.splice(r, 1)
	} while (luckies.indexOf(lucky) != -1)

	users.splice( users.indexOf(lucky), 1 )
	luckies.push( lucky )
	count--
}

// ** Randomly select users to battle
const timeToShine = function(users) {
	let r	     = 0
	let i 		 = 0
	var girls 	 = []
	var virgins  = []
	var luckies  = []

	users.map( (user) => {
		if(user.gender == 'mina') { girls.push(user) }
		if(user.virgin) { virgins.push(user) }
	})

	for(i = 0; i < 2; i++) { quota(users, girls, luckies) }
	for(i = 0; i < 2; i++) { quota(users, virgins, luckies) }

	while(count != 0) {
		r = randomize(0, users.length-1)
		luckies.push( users[r] )
		users.splice(r, 1)
		count -= 1
	}

	return luckies
}

// ** Organize the selected users in the initial bracket
const rounds = function (fighters, numrounds = 8) {
	let n 	   = 0
	let r      = 0
	let mod    = 0
	let rounds = []
	let bn  = fighters.length

	while(bn != 0) {
		r   = randomize(0, fighters.length-1)
		mod = n%numrounds
		roundInsert(mod, fighters[r], rounds)
		fighters.splice(r, 1)
		bn--
		n++
	}

	return rounds
}

const roundInsert = function(i, user, rounds) {
	if(rounds[i] == null)
		rounds[i] = new Round({'first': user, 'second': null})
	else if(rounds[i].second == null)
		rounds[i].second = user
	else
		rounds[i].third  = user
}

const mockup = function () {
	let users = []
	users.push(new User({"name":"teste1","email":"teste@teste.com","gender":"mano","user_level":1, "virgin": true }))
	users.push(new User({"name":"teste2","email":"teste@teste.com","gender":"mano","user_level":1, "virgin": true }))
	users.push(new User({"name":"teste3","email":"teste@teste.com","gender":"mina","user_level":1, "virgin": true }))
	users.push(new User({"name":"teste4","email":"teste@teste.com","gender":"mina","user_level":1, "virgin": true }))
	users.push(new User({"name":"teste5","email":"teste@teste.com","gender":"mina","user_level":1}))
	users.push(new User({"name":"teste6","email":"teste@teste.com","gender":"mina","user_level":1}))
	users.push(new User({"name":"teste7","email":"teste@teste.com","gender":"mina","user_level":1}))
	users.push(new User({"name":"teste8","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste9","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste10","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste11","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste12","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste13","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste14","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste15","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste16","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste17","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste18","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste19","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste20","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste21","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste22","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste23","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste24","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste25","email":"teste@teste.com","gender":"mano","user_level":1}))
	users.push(new User({"name":"teste26","email":"teste@teste.com","gender":"mano","user_level":1}))

	return users
}


const BracketService = {

	// ** Main function to select MC's
	firstStage() {

		var users = mockup()
		let n     = users.length

		if(n < 25) count = 16
		else if(n >= 25) count = 20

		let the_chosen_ones = timeToShine(users)
		let brackets = new Bracket({'first_stage': rounds(the_chosen_ones)})
		return brackets
	},

	setRoundWinner(round, user) {
		
	},

	quarterFinals() {

	}

}


module.exports = BracketService
