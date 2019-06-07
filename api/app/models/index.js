const uuid = require('uuid/v1');
const questions = require('./questions');
const choices = require('./choices');
const quizzes = require('./quizzes');

class Model {
  constructor(data) {
    this.values = data;
  }

  findAll() {
    return this.values;
  }

  findByPk(id) {
    return this.values.find(item => item.id === id);
  }

  // make an
  create(item) {
    const id = uuid();
    this.values.push({ id, ...item });
    return id;
  }

  update(valuesToChange, id) {
    const index = this.values.findIndex(item => item.id === id);
    const newValue = {
      // pull in data that currently extsits
      ...this.values[index],
      //
      ...valuesToChange,
    };
    this.values = [
      ...this.values.slice(0, index),
      newValue,
      ...this.values.slice(index + 1),
    ];

    return newValue;
  }

  destroy(id) {
    this.values = this.values.filter(item => item.id !== id);
  }
}

module.exports = {
  Questions: new Model(questions),
  Choices: new Model(choices),
  Quizzes: new Model(quizzes),
};
