// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-1'});

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
 DelaySeconds: 10,
 MessageAttributes: {
  "Title": {
    DataType: "String",
    StringValue: "The Whistler"
   },
  "Author": {
    DataType: "String",
    StringValue: "John Grisham"
   },
  "WeeksOn": {
    DataType: "Number",
    StringValue: "6"
   }
 },
 MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
 QueueUrl: "https://sqs.us-west-1.amazonaws.com/798879754898/userAnalytics"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
