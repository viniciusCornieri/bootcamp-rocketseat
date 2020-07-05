import { uuid } from 'uuidv4';

import IUser from '@modules/users/entities/IUser';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  users: IUser[] = [];

  async findById(id: string): Promise<IUser | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<IUser> {
    const user: IUser = {
      id: uuid(),
      createdAt: new Date(),
      name,
      email,
      password,
    };

    this.users.push(user);

    return user;
  }

  async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    const updatedUser = { ...user, updatedAt: new Date() };

    this.users[findIndex] = updatedUser;
    return updatedUser;
  }
}
