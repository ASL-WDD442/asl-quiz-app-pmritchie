const { check, validationResult } = require('express-validator/check');

const checks = {
  id: check('id')
    .isUUID().withMessage('Id not valid, please go back try again'),
  name: check('name')
    .exists().withMessage('Quiz name is required')
    .isLength(3)
    .withMessage('Quiz name is required to be at least 3 characters'),
  type: check('type')
    .exists().withMessage('Quiz type is required')
    .isIn(['public', 'private'])
    .withMessage('Quiz must be public or private'),
  quizId: check('quizId')
    .isUUID().withMessage('Id not valid, please go back try again'),
  title: check('title')
    .exists().withMessage('Question title is required')
    .isLength(3)
    .withMessage('Question title is required to be at least 3 characters'),
  correct: check('type')
    .exists().withMessage('Correct Answer required')
    .isIn(['correct', 'incorrect'])
    .withMessage('Choice type must be seleted'),
  value: check('value')
    .exists().withMessage('Choice value is required')
    .isLength(1)
    .withMessage('Choice value is required to be at least 1 characters or number'),
  questionId: check('questionId')
    .isUUID().withMessage('Id not valid, please go back try again'),
  username: check('username')
    .exists().withMessage('Do not forget your username')
    .isLength(4)
    .withMessage('make sure your username is at least 4 characters long'),
  password: check('password')
    .exists().withMessage('Do not forget your password')
    .isLength(6)
    .withMessage('make sure your password is at least 8 characters long'),
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
    case 'createQuiz': {
      return [checks.name, checks.type, checkForErrors];
    }
    case 'editQuiz': {
      return [checks.id, checks.name, checks.type, checkForErrors];
    }
    case 'editQuestion': {
      return [checks.title, checks.quizId, checkForErrors];
    }
    case 'createQuestion': {
      return [checks.title, checkForErrors];
    }
    case 'createChoice': {
      return [checks.value, checks.correct, checkForErrors];
    }
    case 'editChoice': {
      return [checks.value, checks.correct, checks.questionId, checkForErrors];
    }
    case 'login': {
      return [checks.username, checks.password, checkForErrors];
    }

    default: {
      return [];
    }
  }
};
