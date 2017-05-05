
'use strict'

const mongoose         = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const GroupSchema = new mongoose.Schema({

    name: {
        type 	 : String,
        required : true,
    },
	members: {
        type : Schema.Types.ObjectId,
        ref	 : 'User'
    },

});

UserSchema.plugin(mongooseApiQuery)
UserSchema.plugin(createdModified, { index: true })

const Group = mongoose.model('Group', GroupSchema)
module.exports = Group
