const parseFromFilter = data => {
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
const parseFromListings = data => {
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

const parseFromOrders = data => {
  var result = [];

  for (var i = 0; i < data.data.items.length; i++) {
    result.push({
      userId: data.data.userid,
      productId: data.data.items[i].itemId,
      purchased: true,
    });
  }

  return result;
}

exports.module = {
  parseFromFilter,
  parseFromListings,
  parseFromOrders
}
