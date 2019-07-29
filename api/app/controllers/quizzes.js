// load in the quiz model
const { Quizzes } = require('../models');

exports.getAllUsersQuizzes = (req, res) => {
  const quizzes = Quizzes.findAll();

  res.json(quizzes);
};
exports.getPublic = async (req, res) => {
  const publicQuizzes = await Quizzes.findAll({ where: { type: 'public' } });
  // get public quizzes from database
  res.json(publicQuizzes);
};

exports.getOneById = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quizzes.findByPk(id);
  if (!quiz) {
    res.sendStatus(404);
    return;
  }
  res.json(quiz);
};

exports.createQuiz = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { name, type, userId } = req.body;
  try {
    const newQuiz = await Quizzes.create({ name, type, userId: req.userId });
    res.json({ id: newQuiz.id });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const [, [updatedQuiz]] = await Quizzes.update(req.body, {
      where: { id },
      returning: true,
    });
    res.json(updatedQuiz);
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

exports.removeQuiz = async (req, res) => {
  const { id } = req.params;
  await Quizzes.destroy({ where: { id } });
  res.sendStatus(200);
};

exports.getUserQuizzes = async (req, res) => {
  // run the find all function on the model
  // filter the decisions to only decisions that were created by this user
  const userQuizzes = await Quizzes.findAll({ where: { userId: req.userId } });
  // respond with json of the user decisions array
  res.json(userQuizzes);
};
