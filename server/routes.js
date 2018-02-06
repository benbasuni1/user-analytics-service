const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('../database/cassandra.js');
const poll       = require('../queue/pollUserAnalytics');
const format     = require('../parser/parse.js');

const router = express.Router();

/* =============
== MIDDLEWARE ==
============= */
router.use(bodyParser());

/* =====================
== CLIENT SIDE ROUTES ==
===================== */
router.get('/', (req, res) => res.send('hello world!'));

/* =========================
== POLL FROM EVENTS QUEUE == 
==========================*/
router.get('/queue/poll/analytics', async (req, res) => {
    poll.getMessages()
    .then(result => format.parseData(result))
    .then(parsedData => {
        db.insertIntoEventsByUserId(parsedData);
        db.insertIntoEventsByProductId(parsedData);
        db.insertIntoEventsByTime(parsedData);
    }).then(() => res.json('insertion complete!'))
    .catch(err => res.json(err));
});

/* ===================
== GET DATA FROM DB ==
====================*/

/* == Users == */
router.get('/database/users', (req, res) => {
    var getAllUsers = db.selectAllUsers();
    getAllUsers.then(result => res.json(result.rows));
});

router.get('/database/users/:userId', (req, res) => {
    var userId = req.params.userId;
    res.json('abc');
    // var getAllUsers = db.selectAllUsers();
    // getAllUsers.then(result => res.json(result.rows));
});

/* == Analytics == */
router.get('/database/analytics', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllAnalytics();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});

router.get('/database/analytics/time/:time_started/:time_end', (req, res) => {
    res.json('abc');
});

router.get('/database/analytics/event/:type', (req, res) => {
    res.send('true');
});

router.post('/queue/filtering'), (req, res) => {
    console.log('here');
    res.send('POST request');
}


/* ==========================
== POST TO FILTERING QUEUE == 
===========================*/
module.exports = router;
