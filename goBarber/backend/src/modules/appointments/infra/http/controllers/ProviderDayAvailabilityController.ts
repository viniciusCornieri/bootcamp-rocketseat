import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providerDayAvailability = await listProviderDayAvailability.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(providerDayAvailability);
  }
}

export default ProviderDayAvailabilityController;
