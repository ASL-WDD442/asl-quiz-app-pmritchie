// load in the question model
const { Questions } = require('../models');
// grab all questions from quiz
exports.getQuizQuestions = (req, res) => {
  const { quizId } = req.query;
  const questions = Questions.findAll();
  const publicQuestions = questions
    .filter(question => question.quizId === quizId);
  res.json(publicQuestions);
};

exports.getOneById = (req, res) => {
  const { id } = req.params;
  const question = Questions.findByPk(id);
  if (!question) {
    res.sendStatus(404);
    return;
  }
  res.json(question);
};

exports.createQuestion = (req, res) => {
  const { title, quizId } = req.body;
  const id = Questions.create({ title, quizId });
  res.json({ id });
};

exports.updateQuestion = (req, res) => {
  const { id } = req.params;
  const updatedQuestions = Questions.update(req.body, id);
  res.json(updatedQuestions);
};

exports.removeQuestion = (req, res) => {
  const { id } = req.params;
  Questions.destroy(id);
  res.sendStatus(200);
};
