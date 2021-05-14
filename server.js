const http = require("http");

const hostname = "127.0.0.1";
const port = 3600;

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("client"));

const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "client/templates");
app.set("view engine", "html");

const morgan = require("morgan");
const logger = morgan("tiny");
app.use(logger);



app.use(express.static("public/css/app.js"));

const server = http.createServer(app);

const { Mix } = require("./models");
const db = require("./models");

app.get("/", (req, res) => {
  console.log(req.url);
  res.render("index");
});

app.get("/songlist", (req, res) => {
  console.log("request path is:" + req.path);
  console.log(db);
  res.render("songs");
});

app.get("//:genre", async (req, res) => {
  const { genre } = req.params;
  var mix = await Mix.findAll({ where: { genre_id: `${genre}` } });
  // Mixes.prepare("select * from users order by rand() limit 5");
  console.log(mix);
  res.render("playlist", {
        locals: {
          data: mix
      }
    });
  
});


server.listen(port, () => {
  console.log(`API running on port ${port}`);
});
