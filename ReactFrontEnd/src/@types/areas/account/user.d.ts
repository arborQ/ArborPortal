declare namespace Areas.Account {
  export interface IUser {
    id: number;
    isActive: boolean;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface IUserFilterModel {
    loginSearch?: string;
    emailSearch?: string;
    page?: string;
  }

  export interface IUserListProps extends IUserFilterModel {}

  export interface IUserListState {
    loading: boolean;
    list: IUser[];
  }

  export interface IUserListTableState extends IUserListState {
    onFilterChanged: (filter: IUserFilterModel) => void;
  }
}
