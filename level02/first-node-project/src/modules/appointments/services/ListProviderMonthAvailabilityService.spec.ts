import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import IAppointment from '../entities/IAppointment';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list provider day availability in a month', async () => {
    const addingPromises: Promise<IAppointment>[] = [];
    for (let hour = 8; hour <= 17; hour += 1) {
      addingPromises.push(
        fakeAppointmentsRepository.create({
          date: new Date(2020, 4, 20, hour, 0, 0),
          providerId: 'some_provider_id',
        }),
      );
    }

    await Promise.all(addingPromises);

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 8, 0, 0),
      providerId: 'some_provider_id',
    });

    const providerAvailability = await listProviderMonthAvailability.execute({
      providerId: 'some_provider_id',
      month: 5,
      year: 2020,
    });

    expect(providerAvailability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
