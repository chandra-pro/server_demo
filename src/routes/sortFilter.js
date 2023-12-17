const router = require("express").Router();
const cron = require("node-cron");
const { sortFunction } = require("../controllers/sortController");
const movies = require("../utils/movies.json");
const movie = require("../models/movie.model");
const { eventController } = require("../controllers/eventController");
const { checkDatabaseEntries } = require("../controllers/eventController");

router.get("/sort", sortFunction);

cron.schedule("*/1 * * * *", router.post("/events", eventController));
router.get("/alert/:alert_id", checkDatabaseEntries);
// const InsertMovies = async () => {
//   try {
//     const docs = await movie.insertMany(movies);
//     return Promise.resolve(docs);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };
// InsertMovies()
//   .then(docs => {
//     console.log(docs);
//   })
//   .catch(err => {
//     console.log("some error happened");
//   });
module.exports = router;
