const cassandraDriver = require('cassandra-driver');
const cassandra = new cassandraDriver.Client({
  contactPoints: ['127.0.0.1:9042', '127.0.0.1:7199'], 
  keyspace: 'user_analytics_dev'
  // keyspace: 'user_analytics' 
});

/* =============
== INSERTIONS ==
==============*/
/* 
  user_id int,
  created_at timestamp,
  event_type text,
  product_id int,
  PRIMARY KEY (user_id, created_at)
*/
const insertIntoEventsByUserId = item => {
  console.log(item);
  console.log('inserting into database events_by_user_id');
  var query = 'INSERT INTO events_by_user_id (user_id, created_at, event_type, product_id) VALUES (?, ?, ?, ?)';
  var params = [ item.userId, new Date().toISOString(), item.event, item.productId ];
  cassandra.execute(query, params, { prepare: true })
  .then(result => console.log('insert into events_by_user_id successful!', result))
  .catch(err => console.log('Err: ', err));
}

const insertIntoEventsByProductId = item => {
  console.log('inserting into database events_by_product_id');
  console.log(item)
  return item;
    // var query = 'INSERT INTO events_by_product_id (product_id, event_type, user_id, created_at) VALUES (?, ?, ?, ?)';
    // var params = [ item.userId, items.event_type, items.productId, items.timestamp ];
    // cassandra.execute(query, params)
    // .then(result => console.log('insert into events_by_product_id successfull!', result))
}

/* ==========
== QUERIES ==
===========*/

/* == Users Table == */
const selectAllUsers = async () =>  {
  try { return await cassandra.execute('SELECT * from users;', []) }
  catch (err) { console.log(err); }
}

const selectUserByUserId = async userId =>  {
  try { return await cassandra.execute(`SELECT * from users where id = ${userId};`, []) }
  catch (err) { console.log(err); }
}

/* == Events/Analytics Table == */
const selectAllByProductId = async () =>  {
  try { return await cassandra.execute('SELECT * from events_by_product_id;', []) }
  catch (err) { console.log(err); }
}

const selectAllByUserId = async () => {
  try { return await cassandra.execute('SELECT * from events_by_user_id;', []) }
  catch (err) { console.log(err); }
}

const selectEventsByProductId = async productId => {
  try { return await cassandra.execute(`SELECT * from events_by_product_id where product_id = ${productId};`, []) }
  catch (err) { console.log(err); }
}
const selectEventsByUserId = async userId => {
  try { return await cassandra.execute(`SELECT * from events_by_user_id where user_id = ${userId};`, []) }
  catch (err) { console.log(err); }
}

module.exports = {
  insertIntoEventsByUserId,
  insertIntoEventsByProductId,

  selectAllUsers,
  selectUserByUserId,

  selectAllByProductId,
  selectAllByUserId,
  selectEventsByProductId,
  selectEventsByUserId,
}

