const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./config/db_info.tsx");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/host", (req, res) => {
  res.send({ host: "json clear" });
});
app.get("/api/getEvent", (req, res) => {
  db.query("select * from events", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.post("/api/addEvent", (req, res) => {
  db.query(
    "insert into events (id, name, title, start, end) values (" +
      req.body.id +
      ",'" +
      req.body.name +
      "','" +
      req.body.title +
      "','" +
      req.body.start +
      "','" +
      req.body.end +
      "')",
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
