const { Quizzes } = require('../models');

// get all the quizzes
exports.getAll = (req, res) => {
  // run the find all function on the model
  const quizzes = Quizzes.findAll();
  // respond with json of the quizzes array
  res.json(quizzes);
};

// get all the quizzes with a type of public
exports.getPublic = (req, res) => {
  const quizzes = Quizzes.findAll();
  const publicQuizzes = quizzes.filter(
    (quiz) => quiz.type === 'public',
  );

  res.json(publicQuizzes);
};

exports.getOneById = (req, res) => {
  const { id } = req.params;

  const quiz = Quizzes.findbyPk(id);

  if (!quiz) {
    console.log(id);
    res.sendStatus(404);
  }
  res.json(quiz);
};

exports.createQuiz = (req, res) => {
  const { title, type } = req.body;

  const id = Quizzes.create({ type, title });

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
