var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var counter = 1;
const postMessage = (message) => {
  let title = `p${message.product_id}_u${message.user_id}_${message.event_type}`
  let attributes = {
    "ProductId": {
      DataType: "String",
      StringValue: message.product_id.toString()
    },
    "UserId": {
      DataType: "String",
      StringValue: message.user_id.toString()
    },
    "Event": {
      DataType: "String",
      StringValue: message.event_type
    }
  };
  let params = {
    DelaySeconds: 10,
    MessageBody: title, // orderService
    MessageAttributes: attributes,
    QueueUrl: "https://sqs.us-west-1.amazonaws.com/798879754898/Filter"
  }
  // console.log(counter, message, title, attributes);
  sqs.sendMessage(params, (err, data) => {
    (err) ? console.log("Error", err) : console.log(`Msg #${counter} sent!`, data.MessageId);
    counter++;
  });
}

module.exports = {
  postMessage
}
