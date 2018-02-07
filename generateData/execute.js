var execute = require('./generateData.js');
//execute.userData();

const a = [1, 5];
const b = [6, 10];
const c = [11, 15];
const d = [16, 20];

/*
 * 1st param: 'user_id' | 'product_id'
 * 2nd param: a, b, c, d
 */

var start = new Date();

//execute.analyticsData('user_id', a);
//execute.analyticsData('user_id', b);
//execute.analyticsData('user_id', c);
//execute.analyticsData('user_id', d);

execute.analyticsData('product_id', a);
execute.analyticsData('product_id', b);
//execute.analyticsData('product_id', c);
//execute.analyticsData('product_id', d);

var elapsed = Math.round((new Date() - start) / 1000);
console.log('It took ~' + elapsed + ' s to create 10 files with 500,000 records');
