var faker     = require('faker');
var fs        = require('fs');
var csvWriter = require('csv-write-stream')

const analyticHeaders = [
    'user_id', 
    'created_at',
    'event_type',
    'product_id', 
];

const ENTRIES = 500000;
let counter   = 1; // 2500001 5000001 7500001
const first  = [1, 5];
const second = [6, 10];
const third  = [11, 15];
const fourth = [16, 20];

/* FAKER */
var start = new Date();
var events = ['cart', 'wishlist', 'purchased', 'viewed', 'clicked']

/* CSV WRITER */
for (var copy = fourth[0]; copy <= fourth[1]; copy++) {
  var writer = csvWriter({ 
    headers: analyticHeaders
  });

  if (copy < 10) copy = '0' + copy;
  writer.pipe(fs.createWriteStream(`analytics2/analytics${copy}.csv`));
  for (var id = 1; id <= ENTRIES; id++) {
    writer.write({
      user_id    : faker.random.number({
        'min': 1,
        'max': 10000000 
      }),
      created_at : new Date(faker.date.between('2018-01-01', '2018-04-01')).toISOString(),
      event_type : events[~~(Math.random() * events.length)],
      product_id : faker.random.number({
        'min': 1,
        'max': 3000 
      }),
    });
    counter++;
  }
  var elapsed = new Date() - start;
  console.log("elapsed: ", elapsed + ' ms');
  console.log("copy: ", copy);
}

writer.end()


