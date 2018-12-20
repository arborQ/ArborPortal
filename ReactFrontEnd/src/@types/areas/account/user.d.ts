declare namespace Areas.Account {
  export interface IUser {
    id?: number;
    isActive: boolean;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}
