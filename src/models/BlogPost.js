module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
  'BlogPost',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { allowNull: false, type: DataTypes.STRING },
    content: { allowNull: false, type: DataTypes.STRING },
    userId: { allowNull: false, type: DataTypes.INTEGER, foreignKey: true },
    published: { allowNull: false, type: DataTypes.DATE },
    updated: { allowNull: false, type: DataTypes.DATE },
  },
  {
    timestamps: false,
    underscored: true,
  },
);

  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, {
      as: 'user', foreignKey: 'userId'
    });
  };

  return BlogPost;
};
