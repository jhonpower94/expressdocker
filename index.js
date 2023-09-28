const express = require("express");
const { invoice } = require("./invoice");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;
const server = require("http").createServer(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/invoice.html"));
});

app.get("/invoice", (req, res) => {
  // invoice(req, res);
  let fullUrl = req.protocol + "://" + req.get("host");
  res.send(fullUrl);
});

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
module.exports = app;
