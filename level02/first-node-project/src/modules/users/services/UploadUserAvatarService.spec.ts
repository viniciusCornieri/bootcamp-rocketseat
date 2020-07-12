import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UploadUserAvatarService from './UploadUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let uploadUserAvatarService: UploadUserAvatarService;

describe('UploadUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    uploadUserAvatarService = new UploadUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@fakemail.com',
      password: '123456',
    });

    expect(user.avatar).toBeUndefined();
    expect(user.updatedAt).toBeUndefined();

    const changedUser = await uploadUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(changedUser.avatar).toBe('avatar.png');
    expect(changedUser).toHaveProperty('updatedAt');
  });

  it('should throw AppError when update avatar of a non existing user', async () => {
    await expect(
      uploadUserAvatarService.execute({
        userId: '1',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating a new one', async () => {
    const deleteFileSpy = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@fakemail.com',
      password: '123456',
    });

    user.avatar = 'oldAvatar.png';

    const changedUser = await uploadUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(deleteFileSpy).toHaveBeenCalledWith('oldAvatar.png');
    expect(changedUser.avatar).toBe('avatar.png');
    expect(changedUser).toHaveProperty('updatedAt');
  });
});
