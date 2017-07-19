'use strict';


const _ 	   = require('lodash'),
  mongoose = require('mongoose')


const Service = {

  getById(type,id){
    return new Promise((fulfill,reject)=>{
      type.findOne({ _id: id }, function(err, doc) {
        if (err)
          reject(err)
        fulfill(doc)
      });
    })
  },

  getByIdPopulating(type,id,populate,childrens){
    return new Promise((fulfill,reject)=> {
      type.findOne({_id: id})
        .populate({
          path: populate,
          populate: { path: childrens }
        })
        .exec(function (err, doc) {
          if (err)
            reject(err)
          fulfill(doc)
        })
    })
  },

  create : function(type) {
    return new Promise((fulfill,reject)=> {
      type.save(function (err,doc) {
        if (err)
          reject(err)
        fulfill(doc)
      })
    })
  },

  getAll : function(type) {
    return new Promise((fulfill,reject)=> {
      type.apiQuery({}, function (err, docs) {
        if (err)
          reject(err)
        fulfill(docs)
      })
    })
  },

  getAllPopulating(type,populate,childrens){
    return new Promise((fulfill,reject)=> {
      type.apiQuery({})
        .populate({
          path: populate,
          populate: { path: childrens || ''  }
        })
        .exec(function (err, doc) {
          if (err)
            reject(err)
          fulfill(doc)
        })
    })
  },

  updateById(type, id, data){
    return new Promise((fulfill,reject)=>{
      type.findOneAndUpdate({ _id: id }, data, function(err, docUpdated) {
        if (err)
          reject(err)
        fulfill(docUpdated)
      })
    })
  },

  deleteById : function(type, id) {
    return new Promise((fulfill,reject)=> {
      type.remove({_id: id}, function (err) {
        if (err)
          reject(err)

        fulfill(true)
      })
    })

  },

}

module.exports = Service
