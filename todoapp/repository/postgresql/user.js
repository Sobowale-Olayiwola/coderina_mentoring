const { User } = require("../../models/postgresql");
class UserPostgresRepository {
  static async createUser({ body }) {
    try {
      const newUser = User.create({ ...body });

      return newUser;
    } catch (error) {
      throw error;
    }
  }
  static async getUserByEmail({ email }) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers() {
    try {
      const result = await User.findAll({ include: ["todos"] });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById({ id }) {
    try {
      const result = await User.findOne({ oid: id });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateUserById({ id }) {
    try {
      const user = await User.findOne({ oid: id });

      user.name = body.name;
      user.email = body.email;
      user.password = body.password;

      await user.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserById({ id }) {
    try {
      const user = await User.findOne({ oid: id });

      await user.destroy();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserPostgresRepository;
