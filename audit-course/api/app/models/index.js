const decisions = require('./decisions');

class Model {
  constructor(data) {
    this.values = data;
  }

  findbyPk(id) {
    return this.values.find((item) => item.id === id);
  }

  findAll() {
    return this.values;
  }
}

module.exports = {
  Decisions: new Model(decisions),
};
