export default interface IUser {
  id: string;

  token: string;

  userId: string;

  createdAt: Date;

  updatedAt?: Date;
}
