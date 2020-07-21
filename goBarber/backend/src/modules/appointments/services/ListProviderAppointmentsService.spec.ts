import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list a provider appointments in a day', async () => {
    const firstAppointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      providerId: 'some_provider_id',
      userId: 'some_user',
    });

    const secondAppointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      providerId: 'some_provider_id',
      userId: 'some_user',
    });

    const providerAppointments = await listProviderAppointments.execute({
      providerId: 'some_provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(providerAppointments).toEqual([firstAppointment, secondAppointment]);
  });
});
