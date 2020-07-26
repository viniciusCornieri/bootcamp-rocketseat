import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<IAppointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;
    let appointmentsInDay = await this.cacheProvider.recover<IAppointment[]>(
      cacheKey,
    );

    if (!appointmentsInDay) {
      appointmentsInDay = await this.appointmentsRepository.findAllInDayFromProvider(
        { providerId, day, month, year },
      );

      console.log('buscou do banco');

      await this.cacheProvider.save(cacheKey, appointmentsInDay);
    }

    return appointmentsInDay;
  }
}

export default ListProviderAppointmentsService;
