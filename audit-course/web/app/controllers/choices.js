exports.createChoice = async (req, res) => {
  res.render('choices/choice-form');
};

exports.renderChoiceFormWithErrors = async (errors, req, res, next) => {
  // get the data the user submitted
  const id = req.params.choiceId;
  const { value, type, questionId } = req.body;
  if (id) {
    res.render('choices/choice-form', {
      id,
      value,
      type,
      questionId,
      errors,
    });
  } else {
    res.render('choices/choice-form', {
      value,
      type,
      questionId,
      errors,
    });
  }
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
  const { questionId, value, type } = req.body;
  await req.API.put(`/choices/${choiceId}`, { value, type });
  res.redirect(`/admin/questions/${questionId}`);
};

exports.deleteChoice = async (req, res) => {
  const { choiceId } = req.params;
  await req.API.delete(`/choices/${choiceId}`);
  res.redirect('back');
};
