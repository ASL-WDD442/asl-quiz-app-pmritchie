exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('home', { quizzes });
};

exports.renderList = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('quizzes/admin-list', { quizzes });
};

exports.newQuiz = async (req, res) => {
  res.render('quizzes/quiz-form');
};

exports.saveQuiz = async (req, res) => {
  const { name, type } = req.body;
  const { id } = req.params;
  // eslint-disable-next-line no-unused-vars
  let data = {};
  if (id) {
    data = await req.API.put(`/quizzes/${id}`, { name, type });
  } else {
    data = await req.API.post('/quizzes', { name, type });
  }
  // post data and recieve id back
  res.redirect('/admin/quizzes/list');
};

exports.quizDetail = async (req, res) => {
  const id = req.params;
  // grad quiz by id and questions for quiz
  const quiz = await req.API.get(`/quizzes/${id.id}`);
  const questions = await req.API.get(`/questions/?quizId=${id.id}`);
  console.log(questions);
  // send data to page
  res.render('quizzes/quiz-detail', { quiz, questions });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const quiz = await req.API.get(`/quizzes/${id}`);
  res.render('quizzes/quiz-form', quiz);
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderDecisionFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { name, type } = req.body;
  // send the name, type, and errors as variables to the view.
  res.render('quizzes/quiz-form', { name, type, errors });
};
