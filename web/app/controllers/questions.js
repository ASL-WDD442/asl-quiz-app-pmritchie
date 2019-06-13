exports.createQuestion = async (req, res) => {
  res.render('questions/question-form');
};

exports.renderEditForm = async (req, res) => {
  console.log('check render form');
  const { questionId } = req.params;
  const question = await req.API.get(`/questions/${questionId}`);
  res.render('questions/question-form', question);
};

exports.saveNewQuestion = async (req, res) => {
  const { title } = req.body;
  const { quizId } = req.query;
  // eslint-disable-next-line no-unused-vars
  const data = await req.API.post('/questions', { title, quizId });
  res.redirect(`/admin/quizzes/${quizId}`);
};

exports.renderDecisionFormWithErrors = async (req, res, next, errors) => {
// get the data the user submitted
  const { title, quizId } = req.body;
  // send the name, type, and errors as variables to the view.
  res.render('questions/question-form', { title, quizId, errors });
};

exports.saveQuestion = async (req, res) => {
  const { title, quizId } = req.body;
  const { questionId } = req.params;
  console.log('quizId');
  // eslint-disable-next-line no-unused-vars
  const data = await req.API.put(`/questions/${questionId}`, { title });

  // post data and recieve id back
  res.redirect(`/admin/quizzes/${quizId}`);
};

exports.getQuestionDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // grab question by id and choices for question
  const question = await req.API.get(`/questions/${id}`);
  const choices = await req.API.get(`/choices/?questionId=${id}`);
  console.log(question);
  // send data to page
  res.render('questions/question-detail', { question, choices });
};

exports.deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  console.log(questionId);
  await req.Api.delete(`/questions/${questionId}`);
  res.redirect('/admin/quizzes');
};
