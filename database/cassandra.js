const cassandraDriver = require('cassandra-driver');
const cassandra = new cassandraDriver.Client({
  contactPoints: ['127.0.0.1:9042', '127.0.0.1:7199'], 
  keyspace: 'user_analytics' 
});

const selectAllAnalytics = async () =>  {
  try { return await cassandra.execute('SELECT * from analytics;', []) }
  catch (err) { console.log(err); }
}

const selectAnalyticsForSpecificUser = async(userId) => {
  try { return await cassandra.execute(`SELECT * FROM analytics WHERE user_id = ${userId}`, []) }
  catch (err) { console.log(err); }
}

const selectAllUsers = async () =>  {
  try { return await cassandra.execute('SELECT * from users;', []) }
  catch (err) { console.log(err); }
}


module.exports = {
  selectAllAnalytics,
  selectAnalyticsForSpecificUser,
  selectAllUsers
}