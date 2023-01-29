module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
  'PostCategory', {
    postId: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
  },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    });
  
    PostCategory.associate = ({ Category, BlogPost }) => {
      Category.belongsToMany(BlogPost, {
        as: 'posts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
      BlogPost.belongsToMany(Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
    }  
  
    return PostCategory;
  };  
