var mocha  = require('mocha');
var chai   = require('chai');
var should = chai.should();
var db     = require('../database/cassandra');

describe('Setting Up Functions', () => {
  describe('database.js', () => {
    describe('insertions', () => {
      it("should have an 'insert into events by time' function", () => should.exist(db.insertIntoEventsByTime));
      it("should have an 'insert into events by productId'", () => should.exist(db.insertIntoEventsByProductId));
      it("should have an 'insert into events by userId'", () => should.exist(db.insertIntoEventsByUserId));
    });
    describe('queries', () => {
      it("should have a 'select all users' function", () => should.exist(db.insertIntoEventsByTime));
    });
  });
});
