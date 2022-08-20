const express = require("express");
const { connectMongoDB } = require("./models/mongodb");
const { connectPostgresDB } = require("./config/db.config");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

//Connection to MongoDB
connectMongoDB();
// Connection to PostgresDB
connectPostgresDB();

//Middlewares
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

//pass the app instance to the route file
routes(app);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
