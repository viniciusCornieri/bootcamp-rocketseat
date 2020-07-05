import IUser from '@modules/users/entities/IUser';

export default interface IAppointment {
  id: string;

  providerId: string;

  provider: IUser;

  date: Date;

  createdAt: Date;

  updatedAt: Date;
}
