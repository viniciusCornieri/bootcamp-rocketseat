import 'dotenv/config';

export default {
  secret: process.env.SECRET_API,
  expiresIn: '7d',
};
