const { v1: uuid } = require('uuid');
const choices = require('./choices');
const questions = require('./questions');
const quizzes = require('./quizzes');

class Model {
  constructor(data) {
    this.values = data;
  }

  create(item) {
    const id = uuid();

    this.values.push({ id, ...item });

    return id;
  }

  update(valuesToChange, id) {
    // get the index of the item that we are changing
    const index = this.values.findIndex((item) => item.id === id);
    // take the current values and replace any new values
    const newValue = { ...this.values[index], ...valuesToChange };
    // put the array together, all the items before this one, the new one, all after
    this.values = [
      ...this.values.slice(0, index),
      newValue,
      ...this.values.slice(index + 1),
    ];
    return newValue;
  }

  destroy(id) {
    this.values = this.values.filter((item) => {
      if (item.id === id) return false;
      return true;
    });
  }

  findbyPk(id) {
    return this.values.find((item) => item.id === id);
  }

  findAll() {
    return this.values;
  }
}

module.exports = {
  Choices: new Model(choices),
  Questions: new Model(questions),
  Quizzes: new Model(quizzes),
};
