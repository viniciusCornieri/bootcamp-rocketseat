import { getRepository, Repository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders(data?: IFindAllProvidersDTO): Promise<User[]> {
    if (data) {
      const { exceptUserId } = data;
      return this.ormRepository.find({
        where: {
          id: Not(exceptUserId),
        },
      });
    }

    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    return this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
