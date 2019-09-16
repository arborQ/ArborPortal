import { get, post, update, remove, patch } from '@bx-utils/ajax';

interface IUserSearch {
  loginSearch?: string;
  emailSearch?: string;
  page: number;
}

export function loadUsers(search: IUserSearch): Promise<Areas.Account.IUser[]> {
  return get<Utils.Api.IQueryResponse<Areas.Account.IUser>>(
    `/api/account/users?search=${search.loginSearch || ''}&page=${search.page || '1'}&pageSize=10`)
    .then(response => response.items);
}

export function getUser(userId: number): Promise<Areas.Account.IUser> {
  return get(`/api/account/users/${userId}`);
}

export function editUser(
  user: Areas.Account.IUser
): Promise<Areas.Account.IUser> {
  return patch(`/api/account/users/edit/${user.id}`, user);
}

export function createUser(
  user: Areas.Account.IUser
): Promise<Areas.Account.IUser> {
  return post('/api/account/users', user);
}

export function deleteUser(
  userId: number
): Promise<void> {
  return remove(`/api/account/users/${userId}`);
}
