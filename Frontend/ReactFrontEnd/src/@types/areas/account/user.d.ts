declare namespace Areas.Account {
  export interface IUser {
    _id: string;
    isActive: boolean;
    login: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
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
