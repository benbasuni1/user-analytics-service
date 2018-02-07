const db = require('./cassandra.js');

db.selectAllUsers()
.then(result => console.log(result.rows[0]))

setTimeout(() => process.exit(), 300)


