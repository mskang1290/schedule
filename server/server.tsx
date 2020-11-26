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
    "insert into events (name, title, start, end, allDay) values ('" +
      req.body.name +
      "','" +
      req.body.title +
      "','" +
      req.body.start +
      "','" +
      req.body.end +
      "','" +
      req.body.allDay +
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

app.post("/api/updateEvent", (req, res) => {
  console.log(req.body);
  let query = "update events set ";

  Object.keys(req.body).forEach((value, index) => {
    if (value === "id" || (value !== "allDay" && !req.body[value])) return;
    query += value + "= '" + req.body[value] + "',";
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
