declare namespace Areas.Account {
    export interface ILoginState {
        loading: boolean;
        login: string;
        password: string;
        error?: string;
      }
  }
  