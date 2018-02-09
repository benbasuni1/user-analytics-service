const cron = require('cron').CronJob;
const AWS  = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
const sqs      = new AWS.SQS({apiVersion: '2012-11-05'});
const queueURL = 'https://sqs.us-west-1.amazonaws.com/798879754898/Analytics';
const params = {
  AttributeNames: [ "All" ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [ "All" ],
  QueueUrl: queueURL,
  VisibilityTimeout: 50,
  WaitTimeSeconds: 5
};

var messages = [];

const getMessages = () => {
  return new Promise ((resolve, reject) => {
    sqs.receiveMessage(params, (err, data) => {
      for (var i = 0; i < data.Messages.length; i++) {
        if (!messages.includes(data.Messages[i].Body)) {
          console.log(data.Messages);
          messages.push(data.Messages[i].MessageAttributes)
        }

          // messages.push(data.Messages[i].Body);
      }
      (err) ? reject(err) : resolve(messages);
    });
  });
}

module.exports = {
  getMessages  
}
