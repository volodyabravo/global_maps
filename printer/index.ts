import puppeteer from "puppeteer";
import Koa from "koa";
import Router from "@koa/router"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async () => {



  const app = new Koa();
  const router = new Router();

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

  router.get('/generate/', async (ctx, next) => {
    const page = await browser.newPage();

    // await page.setViewport({
    //   height: 14000,
    //   width: 14000,
    //   deviceScaleFactor: 3
    // })

    let start = Date.now();

    await page.setViewport({
      width: 590, height: 855, deviceScaleFactor: 10
    })
    
    await page.goto('http://google.com', {
      waitUntil: "networkidle2"
    });

    // await page.evaluate(() => {
    //   // @ts-ignore
    //   window.setCustom({
    //     divider: "asd",
    //     theme: 1
    //   })
    // })

    await page.screenshot({ path: 'images/example.png' });
    let end = Date.now();
    console.log("Time taken: ", end - start, "ms")
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(process.env.PUPPET_PORT || 6969)



  // const page = await browser.newPage();

  // let start = Date.now();
  // await page.setViewport({
  //   width: 590, height: 855, deviceScaleFactor:12
  // })
  // await page.goto('http://localhost:3000/render/', {
  //   waitUntil: "networkidle2"
  // });

  // await page.evaluate(() => {
  //   // @ts-ignore
  //   window.setCustom({
  //     divider: "asd",
  //     theme: 1
  //   })
  // })

  // await sleep(5000)

  // await page.screenshot({ path: 'example.png' });
  // let end = Date.now();
  // console.log("Time taken: ", end - start, "ms")
})();