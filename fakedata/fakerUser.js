var faker     = require('faker');
var fs        = require('fs');
var csvWriter = require('csv-write-stream')

const userHeaders = ['id', 'email', 'first_name', 'last_name', 'phone'];
const COPIES      = 5;
const ENTRIES     = 500000;
let counter       = 1 // 7500001;

const first  = [1, 5];
const second = [6, 10];
const third  = [11, 15];
const fourth = [16, 20];

/* FAKER */
var start = new Date();

/* CSV WRITER */
for (var copy = fourth[0]; copy <= fourth[1]; copy++) {
  var writer = csvWriter({ 
    headers: userHeaders
  });

  if (copy < 10) copy = '0' + copy;
  writer.pipe(fs.createWriteStream(`users${copy}.csv`));
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
