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

/* == SELECT ALL == */
const selectAllUsers = async () =>  {
  try { return await cassandra.execute('SELECT * from users;', []) }
  catch (err) { console.log(err); }
}

const selectAllByProductId = async () =>  {
  try { return await cassandra.execute('SELECT * from events_by_product_id;', []) }
  catch (err) { console.log(err); }
}

const selectAllByUserId = async () => {
  try { return await cassandra.execute('SELECT * from events_by_user_id;', []) }
  catch (err) { console.log(err); }
}
const selectAllByTime = async () =>  {
  try { return await cassandra.execute('SELECT * from events_by_time_created;', []) }
  catch (err) { console.log(err); }
}

/* == SELECT SPECIFIC == */
const selectUserByUserId = async userId =>  {
  try { return await cassandra.execute(`SELECT * from users where id = ${userId};`, []) }
  catch (err) { console.log(err); }
}

const selectEventsByProductId = async productId => {
  try { return await cassandra.execute(`SELECT * from events_by_product_id where product_id = ${productId} allow filtering;`, []) }
  catch (err) { console.log(err); }
}
const selectEventsByUserId = async userId => {
  try { return await cassandra.execute(`SELECT * from users;`, []) }
  catch (err) { console.log(err); }
}
const selectEventsByTime = async (timeStart, timeEnd) => {
  try { return await cassandra.execute(`SELECT * from users;`, []) }
  catch (err) { console.log(err); }
}

module.exports = {
  insertIntoEventsByTime,
  insertIntoEventsByUserId,
  insertIntoEventsByProductId,

  selectAllUsers,
  selectAllByProductId,
  selectAllByUserId,
  selectAllByTime,

  selectUserByUserId,
  selectEventsByProductId,
  selectEventsByUserId,
  selectEventsByTime
}

