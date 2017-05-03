
'use strict'

const mongoose         = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { minimize: false });


UserSchema.plugin(mongooseApiQuery)
UserSchema.plugin(createdModified, { index: true })

const User = mongoose.model('User', UserSchema)
module.exports = User
