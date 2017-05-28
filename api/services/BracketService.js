const mongoose = require('mongoose'),
			User 		 = mongoose.model('User'),
			Bracket  = mongoose.model('Bracket'),
			Round    = mongoose.model('Round')


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
	let r	         = 0
  let numrounds  = 8
	let girls 		 = []
  let virgins    = []
	let luckies    = []
  let rounds     = []

	users.map( (user) => {
      if(user.gender == 'mina') { girls.push(user) }
      if(user.virgin) { virgins.push(user) }
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
  return users
}


const BracketService = {

	// ** Main function to select MC's
	lottery(users) {

		let n = users.length
		let count = 0

		if(n < 25) count = 16
		else if(n >= 25) count = 20

		let the_chosen_ones = timeToShine(users, count)

		return the_chosen_ones
	}

}


module.exports = BracketService
