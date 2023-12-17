const cron = require("node-cron");
const Event = require("../models/event.model");
const Alert = require("../models/alert.model");

const eventController = async (req, res) => {
  try {
    const { is_driving_safe, vehicle_id, location_type } = req.body;
    const createProduct = await Event.create(req.body);
    return res.status(201).json({
      status: "Success",
      createProduct,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: "Something went wrong !",
      error: err,
    });
  }
};

const checkDatabaseEntries = async (req, res) => {
  try {
    const condition1 = { is_driving_safe: false, location_type: "highway" }; // Replace with your desired condition
    const entryCount1 = await Event.countDocuments(condition1);
    const condition2 = { is_driving_safe: false, location_type: "residential" }; // Replace with your desired condition
    const entryCount2 = await Event.countDocuments(condition2);
    const condition3 = { is_driving_safe: false, location_type: "commercial" }; // Replace with your desired condition
    const entryCount3 = await Event.countDocuments(condition3);
    const condition4 = { is_driving_safe: false, location_type: "city_center" }; // Replace with your desired condition
    const entryCount4 = await Event.countDocuments(condition4);

    const id = req.params.alert_id;
    const createProduct = await Product.findById({ _id: id });

    if (entryCount1 >= 4) {
      console.log(
        `[${new Date()}] Number of "active" entries in the last 5 minutes: ${entryCount1}`
      );
    } else if (entryCount4 >= 3)
      console.log(
        `[${new Date()}] Number of "active" entries in the last 5 minutes: ${entryCount4}`
      );
    else if (entryCount3 >= 2)
      console.log(
        `[${new Date()}] Number of "active" entries in the last 5 minutes: ${entryCount3}`
      );
    else if (entryCount2 >= 1)
      console.log(
        `[${new Date()}] Number of "active" entries in the last 5 minutes: ${entryCount2}`
      );

    return res.status(201).json({
      status: "Success",
      createProduct,
    });
  } catch (error) {
    console.error("Error checking database entries:", error.message);
  }
};

module.exports = { eventController, checkDatabaseEntries };

// Schedule the job to run every 5 minutes
