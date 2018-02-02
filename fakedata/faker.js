var faker     = require('faker');
var fs        = require('fs');
var csvWriter = require('csv-write-stream')
var writer = csvWriter();
//var writer = csvWriter({ 
  ////headers: ["id", "address", "city", "name", "phone"],
//});

/* FAKER */
  /* tests/console.logs() */
  //console.log("faker.address.streetAddress(): ", faker.address.streetAddress());
  //console.log("faker.address.city(): ", faker.address.city());
  //console.log("faker.name.findName(): ", faker.name.findName());
  //console.log("faker.phone.phoneNumberFormat(): ", parseInt(faker.phone.phoneNumberFormat().replace(/\-/g, '')));

/* CSV WRITER */
writer.pipe(fs.createWriteStream('out.csv'));
for (var id = 1; id <= 100; id++) {
  // id, address, city, name, phone 
  writer.write({id: id, address: faker.address.streetAddress(), city: faker.address.city(), name: faker.name.findName(), phone: parseInt(faker.phone.phoneNumberFormat().replace(/\-/g, ''))});
}
writer.end()
