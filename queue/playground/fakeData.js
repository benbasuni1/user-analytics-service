var faker = require('faker');

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
