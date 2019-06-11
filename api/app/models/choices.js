

module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    value: DataTypes.STRING,
    type: DataTypes.ENUM('correct', 'incorrect'),
    questionId: DataTypes.UUID,
  }, {});
  Choices.associate = function (models) {
    // associations can be defined here
    Choices.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };
  return Choices;
};
