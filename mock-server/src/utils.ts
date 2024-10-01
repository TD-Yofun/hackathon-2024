import fs from 'fs';
import _path from 'path';
import { PassThrough } from 'stream';

const mockFolder = '../mock-datas';

function getFullPath(path: string, httpMethod: string = '') {
  const httpMethodExtension = httpMethod === '' || httpMethod === 'get' ? '' : `.${httpMethod}`;
  const fullpath = _path.join(__dirname, `${mockFolder}${path}${httpMethodExtension}.json`);
  if (fs.existsSync(fullpath)) return fullpath;
  if (httpMethodExtension) {
    const defaultFullpath = _path.join(__dirname, `${mockFolder}${path}.json`);
    if (fs.existsSync(defaultFullpath)) return defaultFullpath;
  }
  throw new Error('path does not exist');
}

function automaticPagination(body: any, request: any) {
  if (!body || typeof body !== 'object') return body;
  const page = parseInt(request.query.page);
  const per_page = parseInt(request.query.per_page);
  const { _embedded } = body;
  if (isNaN(page) || isNaN(per_page) || !_embedded) return body;

  Object.keys(_embedded).forEach((key) => {
    if (Array.isArray(_embedded[key])) {
      const pagedArray = _embedded[key].splice(per_page * (page - 1));
      if (pagedArray.length > per_page) pagedArray.length = per_page;
      _embedded[key] = pagedArray;
    }
  });

  return body;
}

function sendResponse(data: string, ctx: any) {
  const jsonData = JSON.parse(data);
  const customResponse = jsonData['$response'];
  const sseMessages = jsonData['$sse'];
  if (sseMessages) return;
  if (!customResponse) {
    ctx.response.status = 200;
    ctx.response.body = automaticPagination(jsonData, ctx.request);
    return;
  }
  const keys = Object.keys(customResponse);
  keys.forEach((key) => {
    if (key === 'body') ctx.response.body = automaticPagination(customResponse.body, ctx.request);
    else ctx.response[key] = customResponse[key];
  });
  if (!ctx.response.status || ctx.response.status === 404) ctx.response.status = 200;
}

function sendSseMessage(data: string, ctx: any) {
  const jsonData = JSON.parse(data);
  const sseMessages = jsonData['$sse'];
  if (!sseMessages) return;

  ctx.request.socket.setTimeout(0);
  ctx.req.socket.setNoDelay(true);
  ctx.req.socket.setKeepAlive(true);

  ctx.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const stream = new PassThrough();

  ctx.status = 200;
  ctx.body = stream;

  const intervals = sseMessages.map((message: any) => {
    let count = message.count || 0;
    let timeInterval = message.interval || 2000;

    const interval = setInterval(() => {
      count--;
      stream.write(`data: ${JSON.stringify(message.data)}\n\n`);
      if (count === 0) clearInterval(interval);
    }, timeInterval);
    return interval;
  });

  ctx.res.on('close', () => {
    intervals.forEach((interval: any) => clearInterval(interval));
  });
}

export function getAllPaths(path: string) {
  let res: string[] = [];
  const folderPath = _path.join(__dirname, `${mockFolder}${path}`);
  const names = fs.readdirSync(folderPath);

  names.forEach((name) => {
    const status = fs.statSync(_path.join(__dirname, `${mockFolder}${path}${name}`));
    if (status.isFile()) {
      if (name.endsWith('.json')) res.push(`${path}${name}`);
      return;
    }
    res = res.concat(getAllPaths(`${path}${name}/`));
  });
  return res;
}

export function responseFromFile(path: string, ctx: any) {
  try {
    const requestMethod = (ctx.request.method || 'get').toLowerCase();
    const fullpath = getFullPath(path, requestMethod);

    const data = fs.readFileSync(fullpath, {
      encoding: 'utf-8',
    });
    sendResponse(data, ctx);
    sendSseMessage(data, ctx);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(`server error:${error}`);
    ctx.response.status = 500;
    ctx.response.body = error.message;
  }
}
