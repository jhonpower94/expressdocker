const puppeteer = require("puppeteer");
require("dotenv").config();

async function invoice(res) {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("http://localhost:8000", {
      waitUntil: "networkidle0",
    });
    const pdf = await page.pdf({ format: "A4" });

    res.attachment("invoice.pdf");
    res.contentType("application/pdf");
    res.send(pdf);
  } catch (e) {
    console.error(e);
    res.send(`something went wrong while running pupeteer: ${e}`);
  } finally {
    await browser.close();
  }
}

module.exports = { invoice };
