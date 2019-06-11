
module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    type: DataTypes.ENUM('public', 'private'),
  }, {});
  Quizzes.associate = function (models) {
    // associations can be defined here
    Quizzes.hasMany(models.Questions, { foreignKey: 'quizId' });
  };
  return Quizzes;
};
