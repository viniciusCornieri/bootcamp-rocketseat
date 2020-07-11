import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to send an e-mail to user recover his password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(sendMail).not.toHaveBeenCalled();
  });
});
