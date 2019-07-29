exports.createQuestion = async (req, res) => {
  res.render('questions/question-form');
};

exports.renderEditForm = async (req, res) => {
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

exports.renderQuestionFormWithErrors = async (errors, req, res, next) => {
// get the data the user submitted
  const id = req.params.questionId;
  const { title, quizId } = req.body;
  if (id) {
    res.render('questions/question-form', {
      id, title, quizId, errors,
    });
  } else {
    res.render('questions/question-form', {
      title, quizId, errors,
    });
  }
};

exports.saveQuestion = async (req, res) => {
  const { title, quizId } = req.body;
  const { questionId } = req.params;
  // eslint-disable-next-line no-unused-vars
  const data = await req.API.put(`/questions/${questionId}`, { title });

  // post data and recieve id back
  res.redirect(`/admin/quizzes/${quizId}`);
};

exports.getQuestionDetail = async (req, res) => {
  const { id } = req.params;
  // grab question by id and choices for question
  const question = await req.API.get(`/questions/${id}`);
  const choices = await req.API.get(`/choices/?questionId=${id}`);
  // send data to page
  res.render('questions/question-detail', { question, choices });
};

exports.deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  await req.API.delete(`/questions/${questionId}`);
  res.redirect('back');
};
