const { Questions } = require('../models');

// get all the questions
exports.getAll = (req, res) => {
  // run the find all function on the model
  const questions = Questions.findAll();
  // respond with json of the questions array
  res.json(questions);
};

exports.getQuizQuestions = async (req, res) => {
  const { quizId } = req.query;
  const publicQuestions = await Questions.findAll({ where: { quizId } });
  res.json(publicQuestions);
};

// get all the questions with a type of public
exports.getPublic = (req, res) => {
  const questions = Questions.findAll();
  const publicQuestions = questions.filter((question) => question.type === 'public');

  res.json(publicQuestions);
};

exports.getOneById = (req, res) => {
  const { id } = req.params;

  const question = Questions.findbyPk(id);

  if (!question) {
    res.sendStatus(404);
  }
  res.json(question);
};

exports.createQuestion = (req, res) => {
  const { title, type } = req.body;

  const id = Questions.create({ type, title });

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
