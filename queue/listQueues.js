// Load the SDK for JavaScript
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-west-1'});

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {};

sqs.listQueues(params, function(err, data) {
  if (err) {
    console.log('error', err);
  } else {
    console.log('success', data.QueueUrls);
  }
});

