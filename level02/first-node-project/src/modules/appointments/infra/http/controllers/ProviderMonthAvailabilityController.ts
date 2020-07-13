import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const providerMonthAvailability = await listProviderMonthAvailability.execute(
      {
        providerId,
        month,
        year,
      },
    );

    return response.json(providerMonthAvailability);
  }
}

export default ProviderMonthAvailabilityController;
