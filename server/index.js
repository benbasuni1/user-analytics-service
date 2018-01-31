const PORT = 3000;
var Koa   = require('koa');
var route = require('koa-route');
var app   = new Koa();

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log("ctx: ", ctx);
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`);
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(PORT);

console.log(`app listening on port ${PORT}`);
