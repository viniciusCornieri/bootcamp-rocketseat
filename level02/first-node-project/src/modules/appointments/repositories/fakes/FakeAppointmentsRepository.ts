import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointment from '@modules/appointments/entities/IAppointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../IAppointmentsRepository';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: IAppointment[] = [];

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<IAppointment> {
    const appointment: IAppointment = {
      id: uuid(),
      date,
      providerId,
      createdAt: new Date(),
    };

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<IAppointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
  }
}
