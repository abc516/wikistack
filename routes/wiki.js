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
  var page = models.Page
  var extension = req.params.urlTitle
  page.findAll({})
  .then(function(tables){
    //var row = table[0].dataValues
    var pages = tables.map(function(instance){
      return instance.dataValues;
    })
    // console.log('tables')
    // console.log(tables)
    //var pages = tables[0]
    // console.log('pages')
    // console.log(pages)
    res.render('index', {pages: pages})
  })
  .catch(next)
  //res.redirect('/')
})
//
router.post('/', function(req, res, next){
  //does something...
  //res.send()
  //console.log("I HAVE HIT POST ROUTER")
  //console.log(req.body)
 var urlTitle = GenerateUrlTitle(req.body.title)
 //console.log(req.protocol + '://' + req.get('host') + urlTitle)
 //console.log(req.protocol + '://' + req.get('host') + req.baseUrl + '/'+ urlTitle)
  var author = req.body['author-name']
  var authorEmail = req.body['author-email']

  var page = models.Page

  console.log(author)
  console.log(authorEmail)
  models.User.findOrCreate({where : {name: author, email: authorEmail}})
  .then(function(user, created){
      console.log('user')
      console.log(user)
      var ourUser = user[0]
      // console.log('userValues')
      // console.log(user.values)
      var row = page.build({
        title: req.body.title,
        urlTitle: req.protocol + '://' + req.get('host') + req.baseUrl + '/'+ urlTitle,
        content: req.body['page-content'],
        status: "open"
        //date:
      });

      row.save().then(function(ourPage){
        return ourPage.setAuthor(ourUser)
      })
  })
  // .then(function(row){
  //   row.save()
  //   //res.redirect('/wiki/'+urlTitle)
  // })
  .then(function(){
    res.redirect('/wiki/'+urlTitle)
  })

  // .success(function(user, created){
  //   console.log('user')
  //   console.log(user)
  //   console.log('userValues')
  //   console.log(user.values)
  // })
  // .catch(function(error){
  //   console.log('error detect: ', error)
  // })
  //console.log(user)
  // var page = models.Page.build({
  //   title: req.body.title,
  //   urlTitle: req.protocol + '://' + req.get('host') + req.baseUrl + '/'+ urlTitle,
  //   content: req.body['page-content'],
  //   status: "open"
  //   //date:
  // });

  // page.save()
  // res.redirect('/wiki/'+urlTitle)
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
  var user = models.User
  page.findAll({
    where: {
      urlTitle: req.protocol + '://' + req.get('host') + req.baseUrl + '/'+ extension
    },
    //new stuff
    include: [
        {model: user, as: 'author'}
    ]

  })
  .then(function(table){
    var row = table[0].dataValues
    res.render('wikipage', {row: row})
  })
  .catch(next)
})
