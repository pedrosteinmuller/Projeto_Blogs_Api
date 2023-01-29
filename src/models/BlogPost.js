module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
  'BlogPost',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: DataTypes.STRING },
    content: {type: DataTypes.STRING },
    userId: {type: DataTypes.INTEGER, foreignKey: true },
    published: {type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updated: { allowNull: false, type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'blog_posts',
  },
);

  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, {
      as: 'user', foreignKey: 'userId'
    });
  };

  return BlogPost;
};
