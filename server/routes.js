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
    .then(result => res.json(result))
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
    var start = new Date();
    var getAllUsers = db.selectAllUsers();
    getAllUsers.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms | All Users');
    }).catch(err => console.log("Err", err));
});

router.get('/database/analytics/product', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllByProductId();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms | All Analytics by Product Id');
    }).catch(err => console.log("Err", err));
});

router.get('/database/analytics/user', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllByUserId();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms | All Analytics by User');
    }).catch(err => console.log("Err", err));
});

router.get('/database/analytics/time', (req, res) => {
    var start = new Date();
    var getAllAnalytics = db.selectAllByTime();
    getAllAnalytics.then(result => {
        res.json(result.rows)
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms | All Analytics by Time');
    }).catch(err => console.log("Err", err));
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
    }).catch(err => console.log("Err", err));
});

router.get('/database/analytics/product/:productId', (req, res) => {
    var start = new Date();
    var productId = req.params.productId;
    var selectByProductId = db.selectEventsByProductId(productId);
    selectByProductId.then(result => {
        res.json(result.rows);
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    }).catch(err => console.log("Err", err));
});

router.get('/database/analytics/user/:userId', (req, res) => {
    var start = new Date();
    var userId = req.params.userId;
    var selectByUserId = db.selectEventsByUserId(userId);
    selectByUserId.then(result => {
        res.json(result.rows);
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    }).catch(err => console.log("Err", err));
});

/* 
    Time Format : yyyymmdd (YEAR MONTH DAY)
*/
router.get('/database/analytics/time/:start_date/:end_date', (req, res) => {
    var start = new Date();
    var startDate = req.params.start_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3") + ' 00:00:00+0200';
    var endDate = req.params.end_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3") + ' 00:00:00+0200';

    var selectByTime = db.selectEventsByTime(startDate, endDate);
    selectByTime.then(result => {
        res.json(result.rows);
        var elapsed = new Date() - start;
        console.log(elapsed + ' ms');
    }).catch(err => console.log("Err", err));
});

router.post('/queue/filtering', function(req, res, next){
  res.json('abc');
});


/* ==========================
== POST TO FILTERING QUEUE == 
===========================*/
module.exports = router;
