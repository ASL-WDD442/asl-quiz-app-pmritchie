module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define(
    'Choices',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      value: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'Choice title is required to be at least 3 characters',
          },
        },
      },
      type: {
        type: DataTypes.ENUM('correct', 'incorrect'),
        validate: {
          isIn: {
            args: [['correct', 'incorrect']],
            msg: 'Choice must be correct or incorrect',
          },
        },
      },
      questionId: {
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
    },
    {},
  );
  // eslint-disable-next-line func-names
  Choices.associate = function (models) {
    // associations can be defined here
    Choices.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };
  return Choices;
};
