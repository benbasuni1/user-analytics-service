const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042', '127.0.0.1:7199'], keyspace: 'abc' })

client.execute('SELECT * from test;', [])
  .then(result => console.log("result: ", result.rows))
  .catch(err => console.log("err: ", err));


