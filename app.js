const puppeteer = require('puppeteer');
const moment = require('moment');
const sleep = require('util').promisify(setTimeout);

const urlLogin = 'https://padel.dir.cat/Login.aspx';
const urlReservas = 'https://padel.dir.cat/Booking/Grid.aspx';
const email = 'andreugenestar@outlook.com';
const password = 'Logins123!';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto(urlLogin);

  // Login User

  // Wait until midnight

  // Get availiable spots

  // Book it

  // Notify

  await page.evaluate(() => { document.querySelector('.fancybox-item.fancybox-close').click() });
  const userNameInput = await page.$('input#ctl00_ContentPlaceHolderContenido_Login1_UserName');
  await userNameInput.type(email);
  const passwordInput = await page.$('input#ctl00_ContentPlaceHolderContenido_Login1_Password');
  await passwordInput.type(password);
  await sleep(1000);
  const submitButton = await page.$('input#ctl00_ContentPlaceHolderContenido_Login1_LoginButton');
  await submitButton.click();
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.screenshot({path: 'screenshots/example2.png'});
  await page.goto(urlReservas);
  await page.screenshot({path: 'screenshots/example3.png'});
  await sleep(3000);
  await page.evaluate(() => obtenerCuadro(moment().add(2, 'weeks').format('DD/MM/YYYY'), 4, { "success": prepararSvg, "beforeSend": cargaImagen }));
  const freeSpots = await page.evaluate(() => dataTable.Columnas.filter(e => e.TextoPrincipal.toLowerCase().indexOf("individual") === -1));
  console.log(await page.evaluate(() => ajaxHorariosFijosBooking('15:30-16:45','6','2')));
  await sleep(1000000);
  
  await browser.close();
})();
