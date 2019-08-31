import User from '../models/User';

class UserController {
  async store(request, response) {
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });
    if (userExists) {
      response.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email, provider } = await User.create(request.body);
    return response.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(request, response) {
    const { email, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    // verify if it's changing the email and if it's already exists
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        response.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Password does not match' });
      /* I Know, Bad practice too much information,
      user and password should have the same message in real cases */
    }

    const { id, name, provider } = await user.update(request.body);

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
