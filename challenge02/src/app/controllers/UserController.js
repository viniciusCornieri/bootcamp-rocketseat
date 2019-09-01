import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    await schema.validate(request.body).catch(err => {
      return response
        .status(400)
        .json({ error: 'Validation fails', message: err.errors });
    });
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });
    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(request.body);
    return response.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
