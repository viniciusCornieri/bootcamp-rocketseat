import { uuid } from 'uuidv4';

import IUserTokensRepository from '../IUserTokensRepository';
import IUserToken from '../../entities/IUserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: IUserToken[] = [];

  public async generate(userId: string): Promise<IUserToken> {
    const userToken = {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
    };

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
