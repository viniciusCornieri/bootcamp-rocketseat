import 'dotenv/config';

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // defines that all tables will have a column createdAt and updatedAt
    // the couple following forces tables be created using snake_case. UserGroup -> user_group
    underscored: true,
    underscoredAll: true,
  },
};
