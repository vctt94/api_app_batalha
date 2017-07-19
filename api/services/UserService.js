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
  addNewCheckout(user_id, checkout_id){
    checkoutService = require('./CheckoutService')
    return new Promise((fulfill,reject)=> {
      this.getUserById(user_id).then(user=>{
        checkoutService.getCheckoutById(checkout_id).then(checkout=>{
          user._checkouts.push(checkout)
          fulfill(user.save())
        }).catch(err=>{
          reject(err)
        })
      }).catch(err=>{
        reject(err)
      })
    })
  },
  getCheckoutsByUserId(id){
    return new Promise((fulfill,reject)=> {
      User.findOne({_id: id})
        .populate({
          path: '_checkouts',
          // Get friends of friends - populate the 'friends' array for every friend
          populate: { path: '_transaction _user_products' }
        })
        .exec(function (err, user) {
          if (err)
            reject(err)
          fulfill(user._checkouts)
        })
    })
  }

}

module.exports = UserService

