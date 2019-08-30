module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: '****',
  password: '****',
  database: '****',
  define: {
    timestamps: true, // defines that all tables will have a column createdAt and updatedAt
    // the couple following forces tables be created using snake_case. UserGroup -> user_group
    underscored: true,
    underscoredAll: true,
  },
};
