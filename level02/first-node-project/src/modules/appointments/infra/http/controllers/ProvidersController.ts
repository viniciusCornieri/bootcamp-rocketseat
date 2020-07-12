import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      userId,
    });

    const providersWithoutPassword = providers.map(provider => {
      // eslint-disable-next-line no-param-reassign
      delete provider.password;
      return provider;
    });

    return response.json(providersWithoutPassword);
  }
}

export default ProvidersController;
