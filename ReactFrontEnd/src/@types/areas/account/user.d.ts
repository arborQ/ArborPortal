declare namespace Areas.Account {
  export interface IUser {
    id?: number;
    isActive: boolean;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface IUserListProps {
    loading: boolean;
    list: IUser[]
  }

  export interface IUserFilterModel {
    loginSearch?: string;
    emailSearch?: string;
    page: number;
    pageSize: number;
  }

  export interface IUserListTableProps extends IUserListProps {
    onFilterChanged: (filter: IUserFilterModel) => void;
  }
}
