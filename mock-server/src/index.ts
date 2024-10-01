import cors from '@koa/cors';
import Koa from 'koa';
import Router from 'koa-router';

import { getAllPaths, responseFromFile } from './utils';

const app = new Koa();
app.use(cors());
const router = new Router();

const mockRouters = getAllPaths('/');

mockRouters.forEach((fullName) => {
  const path = fullName.split('.')[0];

  router.all(path, (ctx, next) => {
    responseFromFile(path, ctx);
  });
});

app.use(router.routes());

app.listen(9527);

// eslint-disable-next-line no-console
console.log(`Mock server started at port 9527`);
