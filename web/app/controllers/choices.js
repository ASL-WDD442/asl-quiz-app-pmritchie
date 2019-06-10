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
  // console.log(req.params);
  const { choiceId } = req.params;
  // console.log(choiceId);
  const choice = await req.API.get(`/choices/${choiceId}`);
  // console.log(choice);
  res.render('choices/choice-form', choice);
};
exports.saveEditChoice = async (req, res) => {
  console.log(req.params);
};
