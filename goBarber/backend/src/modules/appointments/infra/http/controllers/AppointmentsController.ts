import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { provider_id: providerId, date } = request.body;
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      providerId,
      userId,
      date,
    });

    return response.status(201).json(appointment);
  }
}

export default AppointmentsController;
