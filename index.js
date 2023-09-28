const express = require("express");
const { invoice } = require("./invoice");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;
const server = require("http").createServer(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/invoice.html"));
});

app.get("/invoice", async (req, res) => {
  const pdf = await invoice();
  res.attachment("invoice.pdf");
  res.contentType("application/pdf");
  res.send(pdf);
});

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
module.exports = app;
