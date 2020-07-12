import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    const user = this.ormRepository.create({ userId });

    return this.ormRepository.save(user);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({
      where: {
        token,
      },
    });
  }
}

export default UserTokensRepository;
