import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (request, response) => {
  try {
    const user = await User.create({
      name: 'Vinicius Cornieri',
      email: 'vinicius.cornieri@gmail.com',
      password_hash: 'testepassword',
    });
    return response.json(user);
  } catch (err) {
    return response.status(500).json({ Error: err.message });
  }
});

export default routes;
