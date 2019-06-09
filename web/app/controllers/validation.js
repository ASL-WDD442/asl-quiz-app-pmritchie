const { check, validationResult } = require('express-validator/check');

const checks = {
  id: check('id')
    .isUUID().withMessage('Id not valid, please go back try again'),
  title: check('title')
    .exists().withMessage('Quiz title is required')
    .isLength(3)
    .withMessage('Quiz title is required to be at least 3 characters'),
  type: check('type')
    .exists().withMessage('Quiz type is required')
    .isIn(['public', 'private'])
    .withMessage('Quiz must be public or private'),
};

const checkForErrors = (req, res, next) => {
  // get any errors
  const errors = validationResult(req);
  // if there are errors go to the next error handler middleware with the errors from the validation
  if (!errors.isEmpty()) return next(errors.mapped());
  // if there are NO errors, go to the next normal middleware function
  return next();
};

exports.validate = (method) => {
  switch (method) {
    case 'createDecisions': {
      return [checks.title, checks.type, checkForErrors];
    }
    case 'editDecision': {
      return [checks.id, checks.title, checks.type, checkForErrors];
    }

    default: {
      return [];
    }
  }
};
