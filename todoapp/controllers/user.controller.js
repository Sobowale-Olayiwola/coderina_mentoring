const mongoose = require("mongoose");
const { User } = require("../models/mongodb/user");
const UserService = require("../service/user");
const mongoRepository = require("../repository/mongo/user");
const postgresRepo = require("../repository/postgresql/user");
//separation of concerns
const userService = new UserService(postgresRepo);
const {
  hashObject,
  verifyHash,
  generateToken,
} = require("../utils/encryption");
const filterJOIValidation = require("../utils/validators/filterJOI");
const {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} = require("../utils/validators/user");

async function createUser(req, res) {
  try {
    const { body } = req;
    const { error } = createUserSchema.validate(body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    body.password = await hashObject(body.password);
    const result = await userService.createUser({ body });
    return res.status(201).json({
      success: true,
      message: "User successfully created",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function loginUser(req, res) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    const { email, password } = req.body;
    const user = await userService.getUserByEmail({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
        payload: null,
      });
    }
    const accurateObject = user.password;
    const validPassword = await verifyHash({
      sentObject: password,
      accurateObject,
    });
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        payload: null,
      });
    }
    const tokenPayload = {
      userId: user._id,
      email: user.email,
    };
    const token = await generateToken({
      payload: tokenPayload,
      expirationTime: "24h",
    });
    user.token = token;
    return res.status(200).json({
      success: true,
      message: "User found",
      payload: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUsers(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const result = await userService.getUserById({ id });
    if (!result)
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: result,
      });
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const { error } = updateUserSchema.validate(body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    const result = await userService.updateUserById({ id });
    return res.status(200).json({
      success: true,
      message: "User successfully updated",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const oid = mongoose.Types.ObjectId(id);
    const result = await User.deleteOne({ _id: oid });
    return res.status(200).json({
      success: true,
      message: "User successfully deleted",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
