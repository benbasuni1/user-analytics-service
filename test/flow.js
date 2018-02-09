const tests = require('mocha'); 
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const db            = require('../database/cassandra');
const parse         = require('../parser/parse');
const poll          = require('../queue/getAnalyticsQueue');
const dataGenerator = require('../generateData/generateData')
const homeUrl       = 'http://localhost:3000';

describe('FLOW', function() {
  describe('1. Poll Analytics Queue', () => {
      it('should poll and retrieve data', (done) => {
        should.exist(poll.getMessages);
        poll.getMessages().then(result => {
            expect(result).to.be.an('array');
        });
        done();
      });
  })
})