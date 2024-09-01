// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/", function (req, res) {
  return res.json({
    unix: Date.now(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: new Date(1451001600000).toUTCString() });
});

app.get("/api/:date", function (req, res) {
  try {
    if (!isValidDate(new Date(req.params.date))) {
      throw new Error("");
    }
    if (req.params.date === "") {
      return res.json({
        unix: Date.now(),
        utc: new Date().toUTCString(),
      });
    }
    return res.json({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString(),
    });
  } catch (err) {
    res.json({ error: "Invalid date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

function isValidDate(date) {
  return !isNaN(date.getTime());
}
