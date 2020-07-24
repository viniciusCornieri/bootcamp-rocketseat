import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import { classToClass } from 'class-transformer';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userId });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { name, email, password, oldPassword } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);

    const updatedUser = await updateProfile.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(classToClass(updatedUser));
  }
}

export default ProfileController;
