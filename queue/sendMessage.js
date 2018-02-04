// Load the AWS SDK for Node.js
var faker = require('faker');
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-1'});

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var filteringService = `{
  userid     : ${faker.random.number({
    'min': 1,
    'max': 10000000,
  })},
  cart       : ${faker.random.boolean()},
  clicked    : ${faker.random.boolean()},
  created_at : ${faker.date.between('2018-01-01', '2018-04-01')},
  product_id : ${faker.random.number({
    'min': 1,
    'max': 3000 
  })},
  purchased  : ${faker.random.boolean()},
  viewed     : ${faker.random.boolean()},
  wishlist   : ${faker.random.boolean()},
}`;

var orderService = `{
  data : {
    userid     : ${faker.random.number({
      'min': 1,
      'max': 10000000,
    })},
    items : [{
      itemId : ${faker.random.number({
        'min': 1,
        'max': 10000000,
      })},
      qty : ${faker.random.number({
        'min': 1,
        'max': 5
      })},
      rating : ${faker.random.number({
        'min': 1,
        'max': 5
      })}
    }]
  }
}`;

var listingService = `{
  userid     : ${faker.random.number({
    'min': 1,
    'max': 10000000,
  })},
  product_id : ${faker.random.number({
    'min': 1,
    'max': 3000 
  })},
  viewed     : ${faker.random.boolean()},
  clicked    : ${faker.random.boolean()},
  created_at : ${faker.date.between('2018-01-01', '2018-04-01')},
}`;

var params = {
 DelaySeconds: 10,
 MessageAttributes: {},
 MessageBody: orderService, // orderService
 QueueUrl: "https://sqs.us-west-1.amazonaws.com/798879754898/userAnalytics"
};

for (var i = 0; i < 100000; i++) {
  var counter = 1;
  sqs.sendMessage(params, (err, data) => {
    (err) ? console.log("Error", err) : console.log(`Msg #${counter} sent!`, data.MessageId);
    counter++;
  });
}
