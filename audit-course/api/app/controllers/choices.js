const { Choices } = require('../models');

// get all the choices
exports.getQuestionChoices = (req, res) => {
  const { decisionId } = req.query;

  const choices = Choices.findAll();

  const questionChoices = choices.filter((choice) => choice.decisionId === decisionId);

  res.json(questionChoices);
};

// get all the choices with a type of public
exports.getPublic = (req, res) => {
  const choices = Choices.findAll();
  const publicChoices = choices.filter(
    (choice) => choice.type === 'public',
  );

  res.json(publicChoices);
};

exports.getOneById = (req, res) => {
  const { id } = req.params;

  const choice = Choices.findbyPk(id);

  if (!choice) {
    res.sendStatus(404);
  }
  res.json(choice);
};

exports.createChoice = (req, res) => {
  const { value, decisionId } = req.body;

  const id = Choices.create({ value, decisionId });

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
