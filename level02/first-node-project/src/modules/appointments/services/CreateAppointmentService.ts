import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointment from '../entities/IAppointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ providerId, date }: IRequest): Promise<IAppointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
