import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Uno',
      email: 'john.uno@fakemail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@fakemail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'john.tre@fakemail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  it('should return the stored cache data on consecutive calls', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'john.tre@fakemail.com',
      password: '123456',
    });

    const findAllProviders = jest.spyOn(
      fakeUsersRepository,
      'findAllProviders',
    );

    await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(findAllProviders).toHaveBeenCalled();

    findAllProviders.mockClear();

    await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(findAllProviders).not.toHaveBeenCalled();
  });
});
