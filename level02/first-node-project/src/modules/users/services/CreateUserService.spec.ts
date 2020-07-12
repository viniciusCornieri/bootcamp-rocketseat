import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@fakemail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'john.doe@fakemail.com');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('createdAt');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@fakemail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe 2',
        email: 'john.doe@fakemail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
