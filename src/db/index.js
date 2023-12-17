const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    console.log(
      `\n MongoDB connected  Host is ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongoDB connection failed ", error);
    process.exit(1);
  }
};
module.exports = { connectDB };
