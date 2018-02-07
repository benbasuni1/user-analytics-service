var faker     = require('faker');
var fs        = require('fs');
var csvWriter = require('csv-write-stream')

const folder = 'product_id';

const ENTRIES = 500000;
const first  = [1, 5];
const second = [6, 10];
const third  = [11, 15];
const fourth = [16, 20];

/* FAKER */
var start = new Date();
var events = ['cart', 'wishlist', 'purchased', 'viewed', 'clicked']

/* Generate ANALYTICS table */
const analyticsData = (type, active) => {
  if (!active) return;

  for (var copy = first[0]; copy <= first[1]; copy++) {
    var writer = csvWriter({ sendHeaders: false });

    if (copy < 10) copy = '0' + copy;
    writer.pipe(fs.createWriteStream(`${folder}/${folder}${copy}.csv`));
    for (var id = 1; id <= ENTRIES; id++) {
      if (type === 'product_id') {
        writer.write({
          product_id : faker.random.number({ 'min': 1, 'max': 3000 }),
          created_at : new Date(faker.date.between('2018-01-01', '2018-04-01')).toISOString(),
          event_type : events[~~(Math.random() * events.length)],
          user_id    : faker.random.number({ 'min': 1, 'max': 10000000 }),
        });
      } else if (type === 'user_id') {
        writer.write({
          user_id    : faker.random.number({ 'min': 1, 'max': 10000000 }),
          created_at : new Date(faker.date.between('2018-01-01', '2018-04-01')).toISOString(),
          event_type : events[~~(Math.random() * events.length)],
          product_id : faker.random.number({ 'min': 1, 'max': 3000 }),
        });
      }
    }
    var elapsed = new Date() - start;
    console.log(folder + copy + '.csv written!');
  }
  writer.end()
}

/* Generate USERS table */
const userData = () => {
  for (var copy = first[0]; copy <= first[1]; copy++) {
    var writer = csvWriter({ 
      sendHeaders: false
    });

    if (copy < 10) copy = '0' + copy;
    writer.pipe(fs.createWriteStream(`users/users${copy}.csv`));
    for (var id = 1; id <= ENTRIES; id++) {
      writer.write({
        id         : counter,
        email      : faker.internet.email(),
        first_name : faker.name.firstName(),
        last_name  : faker.name.lastName(),
        phone      : faker.phone.phoneNumberFormat().replace(/\-/g, '')
      });
      counter++;
    }
    var elapsed = new Date() - start;
    console.log("elapsed: ", elapsed + ' ms');
    console.log("copy: ", copy);
  }
  writer.end()
}

analyticsData(folder, true);

module.exports = {
  userData,
  analyticsData
}


