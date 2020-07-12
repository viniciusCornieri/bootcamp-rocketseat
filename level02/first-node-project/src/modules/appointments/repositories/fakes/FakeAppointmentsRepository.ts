import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointment from '@modules/appointments/entities/IAppointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
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

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<IAppointment[]> {
    return this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month && // month in JS library are Zero based
        getYear(appointment.date) === year,
    );
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<IAppointment[]> {
    return this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month && // month in JS library are Zero based
        getYear(appointment.date) === year,
    );
  }

  public async findByDate(date: Date): Promise<IAppointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
  }
}
