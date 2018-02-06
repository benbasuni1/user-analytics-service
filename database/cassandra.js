const cassandraDriver = require('cassandra-driver');
const cassandra = new cassandraDriver.Client({
  contactPoints: ['127.0.0.1:9042', '127.0.0.1:7199'], 
  keyspace: 'user_analytics' 
});

/* =============
== INSERTIONS ==
==============*/
const insertIntoEventsByTime = items => {
  for (var i = 0; i < items.length; i++) {
    var query = 'INSERT INTO events_by_time_created (user_id, created_at, event_type, product_id) VALUES (?, ?, ?, ?)';
    var params = [ items[i].userId, items[i].timestamp,items[i].event_type, items[i].productId ];
    cassandra.execute(query, params).then(result => console.log('insert into events_by_time_created successfull!', result))
  }
}

const insertIntoEventsByUserId = items => {
  for (var i = 0; i < items.length; i++) {
    var query = 'INSERT INTO events_by_user_id (user_id, event_type, product_id, created_at) VALUES (?, ?, ?, ?)';
    var params = [ items[i].userId, items[i].event_type, items[i].productId, items[i].timestamp ];
    cassandra.execute(query, params)
    .then(result => console.log('insert into events_by_user_id successfull!', result))
  }
}

const insertIntoEventsByProductId = items => {
  for (var i = 0; i < items.length; i++) {
    var query = 'INSERT INTO events_by_product_id (product_id, event_type, user_id, created_at) VALUES (?, ?, ?, ?)';
    var params = [ items[i].userId, items[i].event_type, items[i].userId, items[i].timestamp ];
    cassandra.execute(query, params)
    .then(result => console.log('insert into events_by_product_id successfull!', result))
  }
}

/* ==========
== QUERIES ==
===========*/

/* == USERS == */
const selectAllUsers = async () =>  {
  try { return await cassandra.execute('SELECT * from users;', []) }
  catch (err) { console.log(err); }
}

const selectUserByUserId = async () =>  {}

/* == ANALYTICS == */
const selectAllAnalytics = async () =>  {
  try { return await cassandra.execute('SELECT * from analytics2;', []) }
  catch (err) { console.log(err); }
}

const selectAnalyticsByProductId = async () =>  {}
const selectAnalyticsByUserId = async () =>  {}
const selectAnalyticsByTime = async () =>  {}

module.exports = {
  insertIntoEventsByTime,
  insertIntoEventsByUserId,
  insertIntoEventsByProductId,

  selectAllUsers,
  selectUserByUserId,

  selectAllAnalytics,
  selectAnalyticsByProductId,
  selectAnalyticsByUserId,
  selectAnalyticsByTime,
}