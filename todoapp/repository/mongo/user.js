const { User } = require("../../models/mongodb/user");
class UserMongoRepository {
  static async createUser({ body }) {
    try {
      const newUser = new User({ ...body });

      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserByEmail({ email }) {
    try {
      const user = await User.findOne({ email }).lean();
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers() {
    try {
      const result = await User.find({});
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById({ id }) {
    try {
      const result = await User.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateUserById({ id }) {
    try {
      const result = await User.findByIdAndUpdate(id, { ...body });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserById({ id }) {
    try {
      const result = await User.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserMongoRepository;
