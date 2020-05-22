import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private static errorMessage = 'Incorrect email/password combination.';

  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error(AuthenticateUserService.errorMessage);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error(AuthenticateUserService.errorMessage);
    }

    const token = sign({}, 'a0c9e4329afc9e010e0ac0f7793554ec', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
