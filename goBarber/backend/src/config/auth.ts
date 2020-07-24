import AppError from '@shared/errors/AppError';

const secret = process.env.APP_SECRET;

if (!secret) {
  throw new AppError('APP_SECRET env must be defined');
}

export default {
  jwt: {
    secret,
    expiresIn: '1d',
  },
};
