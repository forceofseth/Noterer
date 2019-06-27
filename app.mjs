import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import {noteRoutes} from "./routes/note-routes.mjs";

const app = express();

app.use(express.static(path.resolve("public/html")));
app.use(express.static(path.resolve("public")));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile("/html/index.html", { root: __dirname + "/public/" });
});

app.use("/notes", noteRoutes)

const hostname = "127.0.0.1";
const port = 3001;

app.listen(process.env.PORT || port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
