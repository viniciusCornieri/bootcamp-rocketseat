import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const uploadUserAvatar = container.resolve(UploadUserAvatarService);
    const user = await uploadUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
