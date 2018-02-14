var couchdb = require("couchdb-api");
var server = couchdb.srv();
// connect to a couchdb server (defaults to http://localhost:5984)

// test it out!
server.info((err, response) => console.log(response));

// select a database
const findAll = cb => {
    var db = server.db("analytics-couch");

    db.allDocs(function (err, docs) {
        (err) ? console.log('Err: ', err) : cb(null, docs);
    });
}

module.exports = {
    findAll
}