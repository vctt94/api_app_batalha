const mongoose = require('mongoose'),
  User     = mongoose.model('User'),
  service  = require('./Service')

let checkoutService = require('./CheckoutService')

const UserService = {
  getUserById(id){
    return service.getById(User,id)
  },
  updateUserById(id,user){
    return service.updateById(User,id,user)
  },


}

module.exports = UserService

