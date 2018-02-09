// LISTINGS 
{ 
  userId    : 91,
  productId : 62693,
  cart      : true,
  wishlist  : false,
  timestamp : "2018-01-16 16 : 00 : 00.000000+0000"
}

aws sqs send-message --queue-url https://sqs.us-west-1.amazonaws.com/798879754898/Analytics 
--message-body "JSON from Listings" 
--message-attributes '{ "userId": {"DataType": "Number", "StringValue": "91"}, "productId": {"DataType": "Number", "StringValue": "62693"}, "timestamp": {"DataType": "String", "StringValue": "2018-01-16 16:00:00.0000000+0000"} }'

// ORDERS
{ 
  userId    : 91,
  productId : 62693,
  qty       : 5,
  rating    : 4,
  timestamp : 2018-01-16 16 : 00 : 00.000000+0000
}

aws sqs send-message --queue-url https://sqs.us-west-1.amazonaws.com/798879754898/Analytics 
--message-body "JSON from Listings" 
--message-attributes '{ "userId": {"DataType": "Number", "StringValue": "91"}, "productId": {"DataType": "Number", "StringValue": "62693"}, "timestamp": {"DataType": "String", "StringValue": "2018-01-16 16:00:00.0000000+0000"} }'

// CLIENT
{ 
  userId    : 91,
  productId : 62693,
  timestamp : 2018-01-16 16 : 00 : 00.000000+0000
}
