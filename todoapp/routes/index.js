const todoRouteHandler = require("./todo.routes");
const userRouteHandler = require("./user.routes");
const { verifyUserToken } = require("../middlewares/auth");
module.exports = (app) => {
  app.use("/api/v1/todos", verifyUserToken, todoRouteHandler);
  app.use("/api/v1/users", userRouteHandler);
};
