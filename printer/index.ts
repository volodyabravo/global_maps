import puppeteer from "puppeteer";
import Koa from "koa";
import Router from "@koa/router";
import Static from "koa-static";
import { join } from "path"
import mount from 'koa-mount';
const bodyParser = require('koa-bodyparser');
const mime = require('mime-types')
import * as fs from "fs";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getReactHost() {
  if (process.env.WEB_PORT && process.env.WEB_HOST) {
    if (process.env.WEB_PORT == "443") {
      return `https://${process.env.WEB_HOST}/`
    } else {
      return `http://${process.env.WEB_HOST}:${process.env.WEB_PORT}/`
    }
  } else if (!process.env.WEB_PORT && process.env.WEB_HOST) {
    return `http://${process.env.WEB_HOST}:3000/`;
  } else {
    return `http://localhost:3000/`;
  }
}
interface RenderData {
  height: number,
  width: number,
  deviceScaleFactor: number
  custom: object;
}

(async () => {

  const app = new Koa();
  app.use(bodyParser());
  const router = new Router();
  app.use(mount('/images', Static(join(__dirname, "images"), {})));
  let args = [];

  if (process.env.DOCKER == "true") {
    args = ['--no-sandbox', '--disable-dev-shm-usage']
  }

  const browser = await puppeteer.launch({
    headless: true,
    // If it runs in docker, execute the specific file
    executablePath: process.env.DOCKER == "true" ? '/usr/bin/chromium-browser' : undefined,
    args: args,
  });

  router.post('/generatesync/', async (ctx, next) => {
    let data: RenderData = ctx.request.body

    const page = await browser.newPage();

    let start = Date.now();

    await page.setViewport({
      width: data.width, height: data.height, deviceScaleFactor: data.deviceScaleFactor
    })

    // URL

    await page.goto(getReactHost() + "render/", {
      waitUntil: "networkidle2"
    });

    await page.evaluate((data) => {
      // @ts-ignore
      window.initializeMap(data)
      // @ts-expect-error
    }, data)


    // Waits for render to be finished (TODO: Figure out how to find out that it finished)
    await sleep(4000)

    const imageFileName = Date.now() + ".png";
    await page.screenshot({ path: join('images', imageFileName) });
    await page.close();

    var path = join('images', imageFileName);
    var mimeType = mime.lookup(path);
    const src = fs.createReadStream(path);
    ctx.response.set("content-type", mimeType);
    ctx.body = src;


    let end = Date.now();
    console.log("Time taken: ", end - start, "ms")
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(process.env.PUPPET_PORT || 6969)
})();