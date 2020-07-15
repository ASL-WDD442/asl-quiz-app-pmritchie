const { Decisions } = require('../models');

// get all the decisions
exports.getAll = (req, res) => {
  // run the find all function on the model
  const decisions = Decisions.findAll();
  // respond with json of the decisions array
  res.json(decisions);
};

// get all the decisions with a type of public
exports.getPublic = (req, res) => {
  const decisions = Decisions.findAll();
  const publicDecisions = decisions.filter((decision) => decision.type === 'public');

  res.json(publicDecisions);
};
