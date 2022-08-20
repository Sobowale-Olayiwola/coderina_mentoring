const { Todo, User } = require("../models/");

async function createTodo(req, res) {
  try {
    const { body, title } = req.body;
    const user = await User.findOne({ where: { oid: req.oid } });
    const newTodo = await Todo.create({ title, body, userId: user.id });
    return res.status(201).json({
      success: true,
      message: "Todo successfully created",
      payload: newTodo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getTodos(req, res) {
  try {
    const result = await Todo.findAll({
      include: ["user"],
    });
    return res.status(200).json({
      success: true,
      message: "Todo successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getTodoById(req, res) {
  try {
    const { oid } = req.params;
    const result = await Todo.findOne({ oid, include: ["user"] });
    if (!result)
      return res.status(404).json({
        success: false,
        message: "Todo not found",
        payload: result,
      });
    return res.status(200).json({
      success: true,
      message: "Todo successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function updateTodoById(req, res) {
  try {
    const { oid } = req.params;
    const { title, body } = req.body;

    const todo = await Todo.findOne({ oid });

    todo.title = title;
    todo.body = body;

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo successfully updated",
      payload: todo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function deleteTodoById(req, res) {
  try {
    const { oid } = req.params;
    const todo = await Todo.findOne({ oid });

    await todo.destroy();

    return res.status(200).json({
      success: true,
      message: "Todo successfully Deleted",
      payload: todo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
