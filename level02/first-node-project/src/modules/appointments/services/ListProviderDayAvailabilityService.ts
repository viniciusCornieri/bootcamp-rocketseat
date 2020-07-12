import { injectable, inject } from 'tsyringe';
// import { getDaysInMonth, getDate } from 'date-fns';

import { getHours } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointmentsInDay = await this.appointmentsRepository.findAllInDayFromProvider(
      { providerId, day, month, year },
    );

    const startHour = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + startHour,
    );

    const availability = eachHourArray.map(hour => {
      const appointmentAtHour = appointmentsInDay.find(
        appointment => getHours(appointment.date) === hour,
      );

      return { hour, available: !appointmentAtHour };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
