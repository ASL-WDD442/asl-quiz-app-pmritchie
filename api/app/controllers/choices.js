// load in the choice model
const { Choices } = require('../models');

exports.getQuestionChoices = async (req, res) => {
  const { questionId } = req.query;
  const publicChoices = await Choices.findAll({ where: { questionId } });
  res.json(publicChoices);
};

exports.getOneById = async (req, res) => {
  const { id } = req.params;
  const choice = await Choices.findByPk(id);
  if (!choice) {
    res.sendStatus(404);
    return;
  }
  res.json(choice);
};

exports.createChoice = async (req, res) => {
  console.log('1');
  const { value, type, questionId } = req.body;
  try {
    console.log('2');
    const newChoice = await Choices.create({ value, type, questionId });
    console.log(newChoice);
    res.json({ id: newChoice.id });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

exports.updateChoice = async (req, res) => {
  console.log('3');
  const { id } = req.params;
  try {
    const [, [updatedChoice]] = await Choices.update(req.body, {
      where: { id },
      returning: true,
    });
    res.json(updatedChoice);
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

exports.removeChoice = async (req, res) => {
  const { id } = req.params;
  await Choices.destroy({ where: { id } });
  res.sendStatus(200);
};
