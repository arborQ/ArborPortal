import { get, post, remove } from "bx-utils/ajax";

function setCurrentUser(user: Areas.Account.IUser): Areas.Account.IUser | null {
  localStorage.setItem("bx-storage-user", JSON.stringify(user));

  return getCurrentUser();
}

function clearCurrentUser(): void {
  localStorage.removeItem("bx-storage-user");
}

export function isAuthorized(): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    get("/api/account/authorize")
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}

export function login(login: string, password: string): Promise<string> {
  return post<string>("/api/account/authorize", { login, password });
}

export function logout(): Promise<void> {
  clearCurrentUser();
  return remove("/api/account/authorize", {});
}

export function getCurrentUser(): Areas.Account.IUser | null {
  const key = localStorage.getItem("bx-storage-user");
  if (key === null) {
    return null;
  }

  return JSON.parse(key) as Areas.Account.IUser;
}
