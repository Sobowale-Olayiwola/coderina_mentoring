const mongoose = require("mongoose");
const { DB_URI } = process.env;
// TODO create env for database connection uri
function connectMongoDB() {
  mongoose.connect(DB_URI, (error) => {
    if (error) {
      console.log("Database connection failed ", error.message);
    } else {
      console.log("Database connection successful");
    }
  });
}

module.exports = { connectMongoDB };
