import { get, post, update } from "bx-utils/ajax";

export function loadUsers(): Promise<Areas.Account.IUser[]> {
  return get("/api/account/users");
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
