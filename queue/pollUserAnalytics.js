const cron = require('cron').CronJob;
const AWS  = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueURL = 'https://sqs.us-west-1.amazonaws.com/798879754898/userAnalytics';
const params = {
 AttributeNames: [ "SentTimestamp" ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [ "All" ],
 QueueUrl: queueURL,
 VisibilityTimeout: 0,
 WaitTimeSeconds: 0
};

const getMessages = () => {
  return new Promise ((resolve, reject) => {
    var messages = [];
    sqs.receiveMessage(params, (err, data) => {
      for (var i = 0; i < data.Messages.length; i++) {
        messages.push(data.Messages[i].Body);
      }
      resolve(messages);
    });
  });
}

module.exports = {
  getMessages  
}