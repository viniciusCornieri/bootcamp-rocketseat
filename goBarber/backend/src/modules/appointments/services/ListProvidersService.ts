import { injectable, inject } from 'tsyringe';

import IUser from '@modules/users/entities/IUser';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<IUser[]> {
    const cacheKey = `providers-list:${userId}`;
    let providers = await this.cacheProvider.recover<IUser[]>(cacheKey);

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        exceptUserId: userId,
      });

      providers = classToClass(providers);

      await this.cacheProvider.save(cacheKey, providers);
    }

    return providers;
  }
}

export default ListProvidersService;
