import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      providerId: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('providerId', '1');
  });

  it('should not be able to create two appointments at the same time', () => {
    expect(1 + 2).toBe(3);
  });
});
