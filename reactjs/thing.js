module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, try again.' },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: 'Name is required' },
      },
      username: {
        type: DataTypes.STRING,
        unique: { args: true, msg: 'Username is already in use' },
        allowNull: { args: false, msg: 'Username is required' },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_image: {
        type: DataTypes.STRING,
      },
    },
    {},
  );
    // eslint-disable-next-line func-names
  Users.associate = function (models) {
    Users.hasMany(models.Sprints, { foreignKey: 'userId' });
    Users.belongsTo(models.Teams, { foreignKey: 'teamId' });
  };
  return Users;
};
