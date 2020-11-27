const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./config/db_info.tsx");
const cors = require("cors");
var moment = require("moment-timezone");
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
  //   console.log(req.body);
  const query =
    "insert into events (name, title, start, end, allDay) values ('" +
    req.body.name +
    "','" +
    req.body.title +
    "','" +
    moment(req.body.start).tz("Asia/Tokyo").format() +
    // req.body.start +
    "','" +
    moment(req.body.end).tz("Asia/Tokyo").format() +
    // req.body.end +
    "','" +
    req.body.allDay +
    "')";

  //   console.log(query);
  db.query(query, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.post("/api/updateEvent", (req, res) => {
  //   console.log(req.body);
  let query = "update events set ";

  Object.keys(req.body).forEach((value) => {
    if (value === "id" || (value !== "allDay" && !req.body[value])) return;
    query += value + "= '";
    if (value === "start" || value === "end") {
      query += moment(req.body[value]).tz("Asia/Tokyo").format() + "',";
    } else query += req.body[value] + "',";
  });
  query.substr(0, query.length - 1);
  query = query.substr(0, query.length - 1) + " where id=" + req.body.id;
  db.query(query, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
