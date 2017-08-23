const express = require('express');
const mustache = require('mustache-express');
const mongo = require('mongodb').MongoClient;
const bodyparser = require('body-parser');
const data = require('./data');


//create app
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static("public"))


mongo.connect('mongodb://localhost:27017/test', function (err, db) {
const robots = db.collection('robots');

app.get('/robots', function (req, res) {
        // Get data from mongo
        // list it using mustache

        robots.find().toArray().then(function (iRobots) {
            res.render('robots', {
                noms: iRobots,
            });
        });
    });

//for the unemployed page
    app.get('/unemployed', function (req, res) {
            // Get data from mongo
            // list it using mustache



            robots.find({job: null}).toArray().then(function (iRobots) {
                res.render('unemployed', {
                    noms: iRobots,
                });
            });
        });

  //employed page

  app.get('/employed', function (req, res) {
          // Get data from mongo
          // list it using mustache



          robots.find({job: {$ne:null}}).toArray().then(function (iRobots) {
              res.render('employed', {
                  noms: iRobots,
              });
          });
      });



    app.listen(3000);
});
