
let mongo = require('mongodb').MongoClient;
//NOTE: require the data file
let data = require('./data');

mongo.connect('mongodb://localhost:27017/test', function (err, db) {
    const robots = db.collection('robots');

// //NOTE data.users is our users array
for(let i=0; i < data.users.length; i++){
//   //NOTE insert this user into the database
  robots.insert(data.users[i]);
}

db.close();

});
