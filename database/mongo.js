const MONGO = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let eventsByProductId;
let db;

MONGO.connect(url, (err, client) => {
  if (err) {
    console.log('Unable to connect to Mongo');
    process.exit(1);
  } else {
    db = client.db('analytics-mongo');
    eventsByProductId = db.collection('events_by_product_id');
    console.log('Connected to MongoDB...');
  }
});

const findAll = cb => {
  eventsByProductId
    .find({})
    .limit(1000000)
    .toArray((err, docs) => {
      (err) ? console.log('Err: ', err) : cb(null, docs);
    });
}

module.exports = {
    findAll
}
