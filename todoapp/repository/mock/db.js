class Mock {
  static async createUser({ body }) {
    body.test = true;
    return body;
  }
}

module.exports = Mock;
