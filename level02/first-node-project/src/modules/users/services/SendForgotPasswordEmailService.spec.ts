import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send an e-mail to user recover his password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to a non-existing user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(sendMail).not.toHaveBeenCalled();
  });

  it('should generate a forgot token password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@mail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
