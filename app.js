const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(express.static(path.resolve("public/html")));
app.use(express.static(path.resolve("public")));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile("/html/index.html", { root: __dirname + "/public/" });
});

const hostname = "127.0.0.1";
const port = 3001;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
