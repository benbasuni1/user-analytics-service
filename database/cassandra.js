const cassandraDriver = require('cassandra-driver');
const cassandra = new cassandraDriver.Client({
  contactPoints: ['127.0.0.1:9042', '127.0.0.1:7199'], 
  keyspace: 'user_analytics' 
});

const selectAllUsers = async () =>  {
  try { return await cassandra.execute('SELECT * from users;', []) }
  catch (err) { console.log(err); }
}

const selectAllAnalytics = async () =>  {
  try { return await cassandra.execute('SELECT * from analytics2;', []) }
  catch (err) { console.log(err); }
}

const selectAnalyticsForSpecificUser = async(userId) => {
  try { 
    const query = `SELECT * FROM events_by_user_id WHERE user_id = ? ALLOW FILTERING;`;
    const params = [userId];
    return await cassandra.execute(query, params, {prepare: true});
  } catch (err) { console.log(err); }
}

const selectAnalyticsForSpecificProductId = async(productId) => {
  try { 
    const query = `SELECT * FROM events_by_product_id WHERE product_id = ? ALLOW FILTERING;`;
    const params = [productId];
    return await cassandra.execute(query, params, {prepare: true}) ;
  } catch (err) { console.log(err); }
}


module.exports = {
  selectAllUsers,
  selectAllAnalytics,
  selectAnalyticsForSpecificUser,
  selectAnalyticsForSpecificProductId
}