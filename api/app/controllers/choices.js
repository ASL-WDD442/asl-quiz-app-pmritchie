// load in the choice model
const { Choices } = require('../models');

exports.getQuestionChoices = (req, res) => {
  console.log('la');
  const { id } = req.query;
  const choices = Choices.findAll();
  const publicChoices = choices
    .filter(choice => choice.questionId === id);

  res.json(publicChoices);
};

exports.getOneById = (req, res) => {
  console.log('la la');
  const { id } = req.params;
  const choice = Choices.findByPk(id);
  if (!choice) {
    res.sendStatus(404);
    return;
  }
  res.json(choice);
};

exports.createChoice = (req, res) => {
  console.log('la la la');
  const { value, type, questionId } = req.body;
  const id = Choices.create({ value, type, questionId });
  res.json({ id });
};

exports.updateChoice = (req, res) => {
  const { id } = req.params;
  const updatedChoices = Choices.update(req.body, id);
  res.json(updatedChoices);
};

exports.removeChoice = (req, res) => {
  const { id } = req.params;
  Choices.destroy(id);
  res.sendStatus(200);
};
