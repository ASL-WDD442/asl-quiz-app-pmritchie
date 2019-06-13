// load in the quiz model
const { Quizzes } = require('../models');

exports.getAllUsersQuizzes = (req, res) => {
  const quizzes = Quizzes.findAll();

  res.json(quizzes);
};
exports.getPublic = (req, res) => {
  console.log('check');
  const quizzes = Quizzes.findAll();
  const publicQuizzes = quizzes
    .filter(quiz => quiz.type === 'public');

  res.json(publicQuizzes);
};

exports.getOneById = (req, res) => {
  const { id } = req.params;
  const quiz = Quizzes.findByPk(id);
  if (!quiz) {
    res.sendStatus(404);
    return;
  }
  res.json(quiz);
};

exports.createQuiz = (req, res) => {
  const { name, type, userId } = req.body;
  const id = Quizzes.create({ name, type, userId });
  res.json({ id });
};

exports.updateQuiz = (req, res) => {
  const { id } = req.params;
  const updatedQuizzes = Quizzes.update(req.body, id);
  res.json(updatedQuizzes);
};

exports.removeQuiz = (req, res) => {
  const { id } = req.params;
  Quizzes.destroy(id);
  res.sendStatus(200);
};
