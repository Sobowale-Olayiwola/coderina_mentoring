const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
} = require("../controllers/user.controller");
const { verifyUserToken } = require("../middlewares/auth");

router.post("/", createUser);
router.post("/login", loginUser);
router.use("/", verifyUserToken);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
