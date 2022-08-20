class User {
  constructor(repository) {
    this.repository = repository;
  }
  async createUser({ body }) {
    try {
      const user = await this.repository.createUser({ body });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail({ email }) {
    try {
      const user = await this.repository.getUserByEmail({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const users = await this.repository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById({ id }) {
    try {
      const user = await this.repository.getUserById({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updateUserById({ id }) {
    try {
      const user = await this.repository.updateUserById({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async deleteUserById({ id }) {
    try {
      const user = await this.repository.deleteUserById({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
