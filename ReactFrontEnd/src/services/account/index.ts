import { get, post, remove } from "bx-utils/ajax";
import Auth0Lock from "auth0-lock";

const authorizeUrl = "/api/account/authorize";

var auth0 = new Auth0Lock(
  "tylVqDVyD9wE9yOpy5vhablvx5mINM71",
  "dev-kg2va7y3.eu.auth0.com",
  {
    auth: {
      responseType: "id_token token",
      redirect: false
    }
  }
);

auth0.on("authenticated", authResult => {
  console.log(authResult);
  post(authorizeUrl, { jwtToken: authResult.idToken }).then(result => {
    console.log(result);
    auth0.hide();
  });
});

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

export function login(): Promise<{}> {
  return new Promise((resolve, reject) => {
    auth0.show();
  });
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
