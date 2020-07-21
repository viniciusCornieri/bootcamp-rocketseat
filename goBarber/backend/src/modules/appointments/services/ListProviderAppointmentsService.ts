import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IAppointment from '../entities/IAppointment';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<IAppointment[]> {
    const appointmentsInDay = await this.appointmentsRepository.findAllInDayFromProvider(
      { providerId, day, month, year },
    );

    return appointmentsInDay;
  }
}

export default ListProviderAppointmentsService;
