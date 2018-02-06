var mocha  = require('mocha');
var chai   = require('chai');
var should = chai.should();
var db     = require('../database/cassandra');
    
// Setting up functions
describe('INIT SETUP', () => {
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
        it("selectUserByUserId", () => should.exist(db.selectAllUsers));
      })
      describe('analytics', () => {
        it("selectAllAnalytics", () => should.exist(db.selectAllAnalytics));
        it("selectAnalyticsByProductId", () => should.exist(db.selectAllUsers));
        it("selectAnalyticsByUserId", () => should.exist(db.selectAllUsers));
        it("selectAnalyticsBetweenTime", () => should.exist(db.selectAllUsers));
      })
    });
  });
  //  2. parse (parsing data from the queue to my microservice and back to filtering microservice)
  describe('2. Parsing Data', () => {
    // parse from filter
    it("parseFromFilter", () => should.exist(db.selectAllAnalytics));
    // parse from client
    it("parseFromClient", () => should.exist(db.selectAllAnalytics));
    // parse from orders
    it("parseFromOrders", () => should.exist(db.selectAllAnalytics));
  });
  //  3. queue (polling from the queue and setting queue up)
  describe('3. Polling from SQS Queue', () => {
    // poll from user analytics queue
    it("pollFromAnalyticsQueue", () => should.exist(db.selectAllAnalytics));
  });
  //  4. generateData (create fake data to generate into cassandra)
  describe('4. Generating Fake Data to Cassandra', () => {
    // function to populate user records
    it("popuateUserRecords", () => should.exist(db.selectAllAnalytics));
    // function to populate user analytics
    it("populateAnalyticsRecords", () => should.exist(db.selectAllAnalytics));
  });
  //  5. routes (establish routes for communications)
  describe('5. Routes', () => {
    // establish client side routes
    describe('Client Side Routes', () => {
      it("GET /", () => should.exist(db.selectAllAnalytics));
    })
    // establish polling events from queue
    describe('Polling Routes from Analytics Queue', () => {
      it("GET /queue/poll/analytics", () => should.exist(db.selectAllAnalytics));
    })
    // establish retrieval of items from database
    describe('Database Records Retrieval', () => {
      describe('Users', () => {
        it("GET /database/users", () => should.exist(db.selectAllAnalytics));
        it("GET /database/users/:userId", () => should.exist(db.selectAllAnalytics));
      }),
      describe('Analytics', () => {
        it("GET /database/analytics", () => should.exist(db.selectAllAnalytics));
        it("GET /database/analytics/:event_type", () => should.exist(db.selectAllAnalytics));
        it("GET /database/analytics/time_start/time_end", () => should.exist(db.selectAllAnalytics));
      })
    })
    // establish a post to filtering queue
    describe('Post to Filtering Queue', () => {
      it("POST /queue/filtering", () => should.exist(db.selectAllAnalytics));
    })
  });
  //  6. documentation (writing out specific tasks for each section of the program)
  //  7. artillery (set up artillery to stress test my micro service)
});
