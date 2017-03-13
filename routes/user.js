const express = require('express')
const router = express.Router();
//just add
var models = require('../models')

module.exports = router;

router.get('/', function(req, res, next){
  var user = models.User

  user.findAll({})
  .then(function(tables){
    //var row = table[0].dataValues
    var users = tables.map(function(instance){
      return instance.dataValues;
    })
    res.render('users', {users: users})
  })
  .catch(next)
})

router.get('/:id', function(req, res, next){
  var user = models.User
  var userId = Number (req.params.id)
  var page = models.Page
  user.findAll({
    where: {
      id: userId
    }
  })
  .then(function(tables){
    var user = tables[0].dataValues
    page.findAll({
      where: {
        authorId: userId
      }
    })
    .then(function(pages){
      var pagesData = pages.map(function(instance){
        return instance.dataValues;
      })
      res.render('user', {user: user, pages: pagesData})
    })

  })
  .catch(next)
})
