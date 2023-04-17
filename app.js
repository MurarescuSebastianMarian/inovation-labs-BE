const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoutes = require("./api/routes/users");
const groupsRoutes = require("./api/routes/groups");
const mentorsRoutes = require("./api/routes/mentors");

const DB =
  "mongodb+srv://murarescusebastian:8gemfTU4imdT3vHy@cluster0.bb2u8mx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection success <3");
  })
  .catch((err) => {
    console.log(err, "NO CONNECTION :((");
  });

app.use(morgan("dev"));
// app.use("/uploads", express.static("uploads")); //fac folderul uploads public pentru toata lumea (pot fi accesate poze din url)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/groups", groupsRoutes);
app.use("/mentors", mentorsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
