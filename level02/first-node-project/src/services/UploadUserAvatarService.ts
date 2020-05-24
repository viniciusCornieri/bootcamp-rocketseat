import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UploadUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error('Only authenticated users can update avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.resolve(
        uploadConfig.directory,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    userRepository.save(user);

    return user;
  }
}

export default UploadUserAvatarService;
