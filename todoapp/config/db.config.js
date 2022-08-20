const { sequelize } = require("../models/postgresql");

const connectPostgresDB = async () => {
  try {
    await sequelize.authenticate({ force: true });
    console.log("Postgres Database Connected!");
  } catch (err) {
    console.log({ error: err.message });
  }
};

module.exports = { connectPostgresDB };
