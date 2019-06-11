exports.createChoice = async (req, res) => {
  res.render('choices/choice-form');
};

exports.renderDecisionFormWithErrors = async (req, res, next, errors) => {
  // get the data the user submitted
  const { value, questionId } = req.body;
  // send the name, type, and errors as variables to the view.
  res.render('questions/question-form', { value, questionId, errors });
};

exports.saveNewChoice = async (req, res) => {
  const { value, type } = req.body;
  const { questionId } = req.query;
  // eslint-disable-next-line no-unused-vars
  const data = await req.API.post('/choices', { value, type, questionId });
  res.redirect(`/admin/questions/${questionId}`);
};

exports.renderEditForm = async (req, res) => {
  // fill the edit for with data to edit
  const { choiceId } = req.params;
  const choice = await req.API.get(`/choices/${choiceId}`);
  res.render('choices/choice-form', choice);
};

// eslint-disable-next-line no-unused-vars
exports.saveEditChoice = async (req, res) => {
  const { choiceId } = req.params;
  const {
    questionId, value, type,
  } = req.body;
  await req.API.put(`/choices/${choiceId}`, { value, type });
  res.redirect(`/admin/questions/${questionId}`);
};

exports.deleteChoice = async (req, res) => {
  const { choiceId } = req.params;
  console.log(choiceId);
  await req.API.delete(`/choices/${choiceId}`);
  res.redirect('back');
};
