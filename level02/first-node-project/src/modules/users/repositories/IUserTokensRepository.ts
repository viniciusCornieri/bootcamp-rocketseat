import IUserToken from '../entities/IUserToken';

export default interface IUserTokensRepository {
  generate(userId: string): Promise<IUserToken>;
}
