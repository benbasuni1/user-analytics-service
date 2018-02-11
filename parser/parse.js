/*
-------------------
Data from Client
-------------------
{ cart:
     { StringValue: 'true',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'String' },
    productId:
     { StringValue: '970912',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' },
    timestamp:
     { StringValue: '2018-01-30 16:00:00.0000000+0000',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'String' },
    userId:
     { StringValue: '965',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' },
    wishlist:
     { StringValue: 'false',
       StringListValues: [],
       BinaryListValues: [],
*/

var client = data => {
  let cart = {
      userId    : parseInt(data['userId']['StringValue']),
      productId : parseInt(data['productId']['StringValue']),
      event     : 'cart'
  }

  let wishlist = {
      userId    : parseInt(data['userId']['StringValue']),
      productId : parseInt(data['productId']['StringValue']),
      event     : 'wishlist'
  }

  let result = [];

  if (data['cart']['StringValue'] === 'true') result.push(cart); 
  if (data['wishlist']['StringValue'] === 'true') result.push(wishlist);

  return result;
}

/*
-------------------------
Data from Listings/Search (clicked)
-------------------------
{ productId:
     { StringValue: '62693',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' },
    timestamp:
     { StringValue: '2018-01-28 16:00:00.0000000+0000',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'String' },
    userId:
     { StringValue: '91',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' } }
*/

var listings = data => {
  return {
    userId    : parseInt(data['userId']['StringValue']),
    productId : parseInt(data['productId']['StringValue']),
    event     : 'clicked'
  }
}

/*
----------------
Data from Orders (purchased)
----------------
{ productId:
     { StringValue: '457',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' },
    qty:
     { StringValue: '3',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' },
    rating:
     { StringValue: '4',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' },
    timestamp:
     { StringValue: '2018-01-29 16:00:00.0000000+0000',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'String' },
    userId:
     { StringValue: '488360',
       StringListValues: [],
       BinaryListValues: [],
       DataType: 'Number' } }
*/
var orders = data => {
  if (parseInt(data.qty.StringValue) > 0) {
    return {
      userId   : data['userId']['StringValue'],
      productId: data['productId']['StringValue'],
      event    : 'purchased'
    }
  }
}

module.exports = {
  client,
  listings,
  orders,
}
