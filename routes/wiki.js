const express = require('express')
const router = express.Router();
//just add
var models = require('../models')

module.exports = router;

function GenerateUrlTitle(title){
  if(!title){
    title = ''
    var titleLength = Math.ceil(Math.random()*10)
    while(title.length < titleLength){
      title += String.fromCharCode( Math.floor(Math.random()*66 + 57) )
    }
    return title
  }
  return title.replace(/\s/g, '_')
}

router.get('/', function(req, res, next){
  //does something...
  // res.send()
  // next()
  res.redirect('/')
})

router.post('/', function(req, res, next){
  //does something...
  //res.send()
  console.log("I HAVE HIT POST ROUTER")
  console.log(req.body)
 var urlTitle = GenerateUrlTitle(req.body.title)
 console.log(req.protocol + '://' + req.get('host') + urlTitle)
 console.log(req.protocol + '://' + req.get('host') + req.baseUrl + '/'+ urlTitle)

  var page = models.Page.build({
    title: req.body.title,
    urlTitle: req.protocol + '://' + req.get('host') + req.baseUrl + '/'+ urlTitle,
    content: req.body['page-content'],
    status: "open"
    //date:
  });

  page.save()
  res.redirect('/wiki/'+urlTitle)
  //res.json(req.body)
  //res.redirect('/wiki')
  //next()
})

router.get('/add', function(req, res, next){
  //does something...
  //res.send()
  res.render('addpage')
})

router.get('/:urlTitle', function(req, res, next) {
  var page = models.Page
  var extension = req.params.urlTitle
  page.findAll({
    where: {
      urlTitle: req.protocol + '://' + req.get('host') + req.baseUrl + '/'+ extension
    }
  })
  .then(function(table){
    var row = table[0].dataValues
    res.render('wikipage', {row: row})
  })
  .catch(next)
})











