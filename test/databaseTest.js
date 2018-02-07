const test = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const homeUrl = 'http://localhost:3000';

describe('DATABASE', function() {
  this.timeout(5000);
  describe('Insertions', () => {
    it("Successfully Inserted Items into Database", () => {
      chai.request(homeUrl).get('/queue/poll/analytics')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
      });
    })
  });
  describe('Selecting All', () => {
    it("Select All Users", function(done) {
      chai.request(homeUrl).get('/database/users')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done()
      });
    });
    it("Select All by Product Id", function(done) {
      chai.request(homeUrl).get('/database/analytics/product')
      .end(function(err, res) {
        expect(res.body[0]).to.have.own.property('product_id');
        expect(res.body[0]).to.have.own.property('event_type');
        expect(res.body[0]).to.have.own.property('user_id');
        expect(res.body[0]).to.have.own.property('created_at');
        res.should.have.status(200);
        res.should.be.json;
        done()
      });
    });
    it("Select All by User Id", function(done) {
      chai.request(homeUrl).get('/database/analytics/user')
      .end(function(err, res) {
        expect(res.body[0]).to.have.own.property('product_id');
        expect(res.body[0]).to.have.own.property('event_type');
        expect(res.body[0]).to.have.own.property('user_id');
        expect(res.body[0]).to.have.own.property('created_at');
        res.should.have.status(200);
        res.should.be.json;
        done()
      });
    });
    xit("Select All by Time", function(done) {
      chai.request(homeUrl).get('/database/analytics/time')
      .end(function(err, res) {
        expect(res.body[0]).to.have.own.property('product_id');
        expect(res.body[0]).to.have.own.property('event_type');
        expect(res.body[0]).to.have.own.property('user_id');
        expect(res.body[0]).to.have.own.property('created_at');
        res.should.have.status(200);
        res.should.be.json;
        done()
      });
    });
  });
  describe('Specific Queries', () => {
    it("Select Users by Id", function(done) {
      chai.request(homeUrl).get('/database/users/820263')
      .end(function(err, res) {
        expect(res.body[0]).to.have.own.property('id');
        expect(res.body[0]).to.have.own.property('email');
        expect(res.body[0]).to.have.own.property('first_name');
        expect(res.body[0]).to.have.own.property('last_name');
        expect(res.body[0]).to.have.own.property('phone');
        res.should.have.status(200);
        done();
      });
    });
    it("Select Events By Product Id", function(done) {
      chai.request(homeUrl).get('/database/analytics/product/2731')
      .end(function(err, res) {
        expect(res.body[0]).to.have.own.property('product_id');
        expect(res.body[0]).to.have.own.property('event_type');
        expect(res.body[0]).to.have.own.property('user_id');
        expect(res.body[0]).to.have.own.property('created_at');
        res.should.have.status(200);
        done();
      });
    });
    it("Select Events By User Id", function(done) {
      chai.request(homeUrl).get('/database/analytics/user/860380')
      .end(function(err, res) {
        expect(res.body[0]).to.have.own.property('user_id');
        expect(res.body[0]).to.have.own.property('event_type');
        expect(res.body[0]).to.have.own.property('created_at');
        expect(res.body[0]).to.have.own.property('product_id');
        res.should.have.status(200);
        done();
      });
    });
    xit("Select Events By Time", function(done) {
      chai.request(homeUrl).get('/database/analytics/time')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });
  })
});