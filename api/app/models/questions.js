

module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define('Questions', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    title: DataTypes.STRING,
    quizId: DataTypes.UUID,
  }, {});
  Questions.associate = function (models) {
    // associations can be defined here
    Questions.belongsTo(models.Quizzes, { foreignKey: 'quizId' });
    Questions.hasMany(models.Choices, { foreignKey: 'questionId' });
  };
  return Questions;
};
