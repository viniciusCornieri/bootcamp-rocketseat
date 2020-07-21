import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile of an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@fakemail.com',
      password: '123456',
    });

    const showProfileUser = await showProfile.execute({
      userId: user.id,
    });

    expect(showProfileUser.name).toBe('John Doe');
    expect(showProfileUser.email).toBe('john.doe@fakemail.com');
  });

  it('should not be able to view profile of a non-existing user', async () => {
    await expect(
      showProfile.execute({
        userId: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
