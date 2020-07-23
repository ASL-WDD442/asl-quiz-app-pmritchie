module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define(
    'Quizzes', {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: { args: [3, 500], msg: 'Quiz name must be 3 characters long' },
        },
      },
      type: {
        type: DataTypes.ENUM('public', 'private'),
        validate: {
          isIn: {
            args: [['public', 'private']],
            msg: 'Decision must be public or private',
          },
        },
      },
    }, {},
  );
  Quizzes.associate = (models) => {
    Quizzes.hasMany(models.Questions, { foreignKey: 'quizId' });
  };
  return Quizzes;
};
