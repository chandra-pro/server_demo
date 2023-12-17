const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/index");
const movieRoutes = require("./routes/sortFilter");
const { checkDatabaseEntries } = require("../src/controllers/eventController");
const app = express();
app.use(
  cors() //     {
  //     origin: process.env.CORS_ORIGIN,
  //     credentials: true
  // }
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log("MONGO db connection failed !!! ", err);
  });
app.use(movieRoutes);

const job = new cron.CronJob("0 */5 * * * *", checkDatabaseEntries);

// Start the cron job
job.start();

// app.get("/users", (req, res) => {
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const results = {};

//   results.next = {
//     page: page + 1,
//     limit: limit,
//   };
//   results.previous = {
//     page: page - 1,
//     limit: limit,
//   };
//   results.result = users.slice(startIndex, endIndex);

//   res.json(results);
// });

app.listen(3000);
