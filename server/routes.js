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

/* Select All */
router.get('/database/users', (req, res) => {
    var getAllUsers = db.selectAllUsers();
    getAllUsers.then(result => res.json(result.rows));
});

router.get('/database/analytics/product', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllByProductId();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});

router.get('/database/analytics/user', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllByUserId();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});

router.get('/database/analytics/time', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllByTime();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});

/* == Select Specific == */
router.get('/database/users/:userId', (req, res) => {
    var start = new Date();
    var userId = req.params.userId;
    var selectByUserId = db.selectUserByUserId(userId);
    selectByUserId.then(result => {
        res.json(result.rows);
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});

router.get('/database/analytics/product/:productId', (req, res) => {
    var start = new Date();
    var productId = req.params.productId;
    var selectByProductId = db.selectEventsByProductId(productId);
    selectByProductId.then(result => {
        res.json(result.rows);
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});
router.get('/database/analytics/time/:time_started/:time_end', (req, res) => {});

router.get('/database/analytics/user/:userId', (req, res) => {
    var start = new Date();
    var userId = req.params.userId;
    var selectByUserId = db.selectEventsByUserId(userId);
    selectByUserId.then(result => {
        res.json(result.rows);
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});

router.post('/queue/filtering', function(req, res, next){
    res.send('abc');
});


/* ==========================
== POST TO FILTERING QUEUE == 
===========================*/
module.exports = router;
