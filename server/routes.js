// require('dotenv').config();
const express      = require('express');
const bodyParser   = require('body-parser');
const db = require('../database/cassandra.js');
// const cookieParser = require('cookie-parser');
// const path         = require('path');
// const passport     = require('passport');

// const db       = require('./database');
// const movieAPI = require('./apiCalls');

const router = express.Router();

/* =============
== MIDDLEWARE ==
============= */
router.use(bodyParser());

/* =====================
== CLIENT SIDE ROUTES ==
===================== */
router.get('/', (req, res) => res.send('hello world!'));

/* ===========================
== API CALLS INSERT INTO DB == 
=========================== */

/* This should be called on intervals */
// router.get('/APItoDB/movies', async (req, res) => {
//     try {
//         var movies = await movieAPI.getMovies();
//         db.insertMany(movies.data.results);
//         res.json(movies.data.results);
//     } catch (err) { console.log(err); }
// });

// /* ============================
// == GET DATA STRAIGHT FROM DB ==
// ============================ */
router.get('/database/analytics', async (req, res) => {
    var getAllAnalytics = db.selectAllAnalytics();
    getAllAnalytics.then(result => res.json(result.rows));
});

router.get('/database/users', (req, res) => {
    var getAllUsers = db.selectAllUsers();
    getAllUsers.then(result => res.json(result.rows));
});



//  /* This should be called anytime the user needs data */
//  router.get('/database/movies', async (req, res) => {
//     try { res.json(await db.getAllMovies()); } 
//     catch (err) { console.log(err); }
//  });

module.exports = router;
