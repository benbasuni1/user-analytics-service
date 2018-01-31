const PORT      = 3000;
const cassandra = require('cassandra-driver');
const express   = require('express')
const app       = express()

app.get('/', (req, res) => res.send('Hello World!'))


const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], keyspace: 'ks1' });

const query = 'SELECT name, email FROM users WHERE key = ?';
client.execute(query, [ 'someone' ])
  .then(result => console.log('User with email %s', result.rows[0].email));

app.listen(3000, () => console.log('Example app listening on port 3000!'))
