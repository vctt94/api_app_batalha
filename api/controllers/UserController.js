
'use strict';


const mongoose = require('mongoose'),
  	  User = mongoose.model('User')


exports.createUser = function(req, res, next) {

    let data = req.body || {}

    let user = new User(data)
    user.save(function(err) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        res.send(201)
        next()

    })

}

exports.getAllUsers = function(req, res, next) {

    User.apiQuery(req.params, function(err, docs) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()

    })

}