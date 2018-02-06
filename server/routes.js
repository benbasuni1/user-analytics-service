const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('../database/cassandra.js');
const poll       = require('../queue/pollUserAnalytics');
const format     = require('../helpers/parse.js');

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
router.get('/poll', async (req, res) => {
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
router.get('/database/analytics', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllAnalytics();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    });
});

router.get('/database/users', (req, res) => {
    var getAllUsers = db.selectAllUsers();
    getAllUsers.then(result => res.json(result.rows));
});

router.get('/database/analytics/user/:userId', (req, res) => {
    var start = new Date();
    var userId = req.params.userId;
    var getAnalyticsForSpecificUser = db.selectAnalyticsForSpecificUser(userId);
    getAnalyticsForSpecificUser.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log('elapsed: ', elapsed + ' ms');
    });
});

router.get('/database/analytics/product/:productId', (req, res) => {
    var start = new Date();
    var productId = req.params.productId;
    var getAnalyticsForSpecificProduct = db.selectAnalyticsForSpecificProductId(productId);

    getAnalyticsForSpecificProduct
    .then(result => {
        res.json(result.rows);
        var elapsed = new Date() - start;
        console.log('elapsed: ', elapsed + ' ms');
    })
    .catch(err => {
        console.log(err);   
    });
});

/* ==========================
== POST TO FILTERING QUEUE == 
===========================*/
router.post

module.exports = router;