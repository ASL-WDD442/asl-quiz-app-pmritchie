exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('landing', { quizzes });
};

exports.something = async (req, res) => {
  res.render('quizzes/quiz-form');
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const quiz = await req.API.get(`/quizzes/${id}`);
  console.log(quiz);
  res.render('quizzes/quiz-form', quiz);
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderDecisionFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { title, type } = req.body;
  // send the title, type, and errors as variables to the view.
  res.render('quizzes/quiz-form', { title, type, errors });
};
