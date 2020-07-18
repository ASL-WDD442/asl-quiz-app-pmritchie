module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    'Questions',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'Decision title is required to be at least 3 characters',
          },
        },
      },
      quizId: {
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
    },
    {},
  );
  // eslint-disable-next-line func-names
  Questions.associate = function (
    models,
  ) {
    Questions.belongsTo(
      models.Quizzes,
      { foreignKey: 'quizId' },
    );
  };
  return Questions;
};
