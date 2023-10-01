const express = require("express");
const { invoice } = require("./invoice");
const path = require("path");
const { sendMessage } = require("./mail");

const app = express();
const port = process.env.PORT || 8000;
const server = require("http").createServer(app);

var cors = require("cors");
const { mail } = require("./message");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("invoice", {
    name: req.query.name,
    sendername: req.query.sendername,
    trackid: req.query.trackid,
    packageType: req.query.packageType,
    from_city: req.query.from_city,
    from_state: req.query.from_state,
    from_country: req.query.from_country,
    to_address: req.query.to_address,
    to_city: req.query.to_city,
    to_country: req.query.to_country,
    time: req.query.time,
  });
  // res.sendFile(path.join(__dirname, "/invoice.html"));
});

app.post("/invoice", (req, res) => {
  invoice(req, res).then((pdf) => {
    sendMessage(req, res, pdf);
  });
});

app.post("/mail", (req, res) => {
  mail(req, res, pdf);
});

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
module.exports = app;
