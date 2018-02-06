var client = data => {
   return {
    userId    : data.userId,
    productId : data.productId,
    viewed    : data.event_type.view,
    clicked   : data.event_type.clicked,
    purchased : data.event_type.purchased,
    cart      : data.event_type.cart,
    wishlist  : data.event_type.wishlist,
    timestamp : data.timestamp
  }
}
var listings = data => {
  return {
    userId    : data.userId,
    productId : data.productId,
    viewed    : data.viewed,
    clicked   : data.clicked,
    purchased : false,
    cart      : false,
    wishlist  : false,
    timestamp : data.timestamp
  }
}

var orders = data => {
  var result = [];

  for (var i = 0; i < data.data.items.length; i++) {
    result.push({
      userId    : data.data.userid,
      productId : data.data.items[i].itemId,
      viewed    : false,
      clicked   : false,
      purchased : true,
      cart      : false,
      wishlist  : false,
      timestamp : data.data.timestamp
    });
  }

  return result;
}

const allData = data => {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].type === 'client') result.push(parseFromClient(data[i]));
    else if (data[i].type === 'listing') result.push(parseFromListings(data[i]));
    else if (data[i].type === 'orders') result.push(parseFromOrders(data[i]));
  } 

  return result;
}

module.exports = {
  client,
  listings,
  orders,
  allData
}
