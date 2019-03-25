import { get, post, update, remove } from "bx-utils/ajax";

interface IQueryResponse<T> {
  items: T[];
  totalCount: number;
}

export function loadUsers(): Promise<Areas.Account.IUser[]> {
  return get<IQueryResponse<Areas.Account.IUser>>("/api/account/users?search=&page=1&pageSize=2").then(response => response.items);
}

export function getUser(userId: number): Promise<Areas.Account.IUser> {
  return get(`/api/account/users/${userId}`);
}

export function editUser(
  user: Areas.Account.IUser
): Promise<Areas.Account.IUser> {
  return update("/api/account/users", user);
}

export function createUser(
  user: Areas.Account.IUser
): Promise<Areas.Account.IUser> {
  return post("/api/account/users", user);
}

export function deleteUser(
  userId: number
): Promise<void> {
  return remove(`/api/account/users/${userId}`);
}
