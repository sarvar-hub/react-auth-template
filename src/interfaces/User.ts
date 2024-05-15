interface IUser {
  id: number;
  username: string;
  password?: string;
  email: string;
  token: string;
}

export default IUser