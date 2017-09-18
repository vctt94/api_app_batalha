const mongoose = require('mongoose'),
      User     = mongoose.model('User'),
      service  = require('./Service')


const UserService = {
  getUser(id){
    return service.getById(User, id)
  },
  updateUserById(id, data){
    return service.updateById(User, id, data)
  },


}

module.exports = UserService
