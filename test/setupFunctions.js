const tests = require('mocha'); 
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const db            = require('../database/cassandra');
const parse         = require('../parser/parse');
const poll          = require('../queue/pollUserAnalytics');
const dataGenerator = require('../generateData/generateData')
const homeUrl       = 'http://localhost:3000';


// Setting up functions
describe('INIT SETUP', function() {
    this.timeout(5000);
  // 1. database (communication between application and cassandra database)
  describe('1. Cassandra Database', () => {
    // insertions
    describe('insertions', () => {
      it("insertIntoEventsByTime", () => should.exist(db.insertIntoEventsByTime));
      it("insertIntoEventsByProductId", () => should.exist(db.insertIntoEventsByProductId));
      it("insertIntoEventsByUserID", () => should.exist(db.insertIntoEventsByUserId));
    });
    // queries
    describe('queries', () => {
      describe('users', () => {
        it("selectAllUsers", () => should.exist(db.selectAllUsers));
        it("selectUserByUserId", () => should.exist(db.selectUserByUserId));
      })
      describe('analytics', () => {
        it("selectAllAnalytics", () => should.exist(db.selectAllAnalytics));
        it("selectAnalyticsByProductId", () => should.exist(db.selectAnalyticsByProductId));
        it("selectAnalyticsByUserId", () => should.exist(db.selectAnalyticsByUserId));
        it("selectAnalyticsByTime", () => should.exist(db.selectAnalyticsByTime));
      })
    });
  });
  //  2. parse (parsing data from the queue to my microservice and back to filtering microservice)
  describe('2. Parsing Data', () => {
    // parse from client
    it("client", () => should.exist(parse.client));
    // parse from listings
    it("listings", () => should.exist(parse.listings));
    // parse from orders
    it("orders", () => should.exist(parse.orders));
    // take all items and parse data based on type
    it("allData", () => should.exist(parse.allData));
  });
  //  3. queue (polling from the queue and setting queue up)
  describe('3. Polling from SQS Queue', () => {
    // poll from user analytics queue
    it("pollFromAnalyticsQueue", () => should.exist(poll.getMessages));
  });
  //  4. generateData (create fake data to generate into cassandra)
  describe('4. Generating Fake Data to Cassandra', () => {
    // function to populate user records
    it("popuateUserRecords", () => should.exist(dataGenerator.userData));
    // function to populate user analytics
    it("populateAnalyticsRecords", () => should.exist(dataGenerator.analyticsData));
  });
  //  5. routes (establish routes for communications)
  describe('5. Routes', () => {
    // establish client side routes
    describe('Client Side Routes', () => {
      it("GET /", () => chai.request(homeUrl).get('/'));
    })
    // establish polling events from queue
    describe('Polling Routes from Analytics Queue', () => {
      it("GET /queue/poll/analytics", () => chai.request(homeUrl).get('/queue/poll/analytics'));
    })
    // establish retrieval of items from database
    describe('Database Records Retrieval', () => {
      describe('Users', () => {
        it("GET /database/users", () => chai.request(homeUrl).get('/database/users'));
        it("GET /database/users/:userId", () => chai.request(homeUrl).get('/database/users/1111'));
      }),
      describe('Analytics', () => {
        it("GET /database/analytics", done => {
          chai.request(homeUrl).get('/database/analytics')
          done();
        });
        it("GET /database/analytics/event/:type", () => chai.request(homeUrl).get('/database/analytics/event/clicked'));
        it("GET /database/analytics/time/:timestart/:timeend", () => chai.request(homeUrl).get('/database/analytics/time/01012018/01072018'));
      })
    })
    // establish a post to filtering queue
    describe('Post to Filtering Queue', () => {
      it("POST /queue/filtering", () => chai.request(homeUrl).post('/queue/filtering'));
    })
  });
  //  6. documentation (writing out specific tasks for each section of the program)
  //  7. artillery (set up artillery to stress test my micro service)
});
