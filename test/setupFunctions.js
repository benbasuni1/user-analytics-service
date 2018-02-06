const tests = require('mocha'), should = require('chai').should();

const db    = require('../database/cassandra');
const parse = require('../parser/parse');
const poll  = require('../queue/pollUserAnalytics');

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
    xit("popuateUserRecords", () => should.exist(db.selectAllAnalytics));
    // function to populate user analytics
    xit("populateAnalyticsRecords", () => should.exist(db.selectAllAnalytics));
  });
  //  5. routes (establish routes for communications)
  describe('5. Routes', () => {
    // establish client side routes
    describe('Client Side Routes', () => {
      xit("GET /", () => should.exist(db.selectAllAnalytics));
    })
    // establish polling events from queue
    describe('Polling Routes from Analytics Queue', () => {
      xit("GET /queue/poll/analytics", () => should.exist(db.selectAllAnalytics));
    })
    // establish retrieval of items from database
    describe('Database Records Retrieval', () => {
      describe('Users', () => {
        xit("GET /database/users", () => should.exist(db.selectAllAnalytics));
        xit("GET /database/users/:userId", () => should.exist(db.selectAllAnalytics));
      }),
      describe('Analytics', () => {
        xit("GET /database/analytics", () => should.exist(db.selectAllAnalytics));
        xit("GET /database/analytics/:event_type", () => should.exist(db.selectAllAnalytics));
        xit("GET /database/analytics/time_start/time_end", () => should.exist(db.selectAllAnalytics));
      })
    })
    // establish a post to filtering queue
    describe('Post to Filtering Queue', () => {
      xit("POST /queue/filtering", () => should.exist(db.selectAllAnalytics));
    })
  });
  //  6. documentation (writing out specific tasks for each section of the program)
  //  7. artillery (set up artillery to stress test my micro service)
});
