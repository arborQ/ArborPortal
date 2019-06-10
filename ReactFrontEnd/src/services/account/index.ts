import { get, post, remove } from '@bx-utils/ajax';
import Auth0Lock from 'auth0-lock';


const authorizeUrl = '/api/account/authorize';

let promiseResolve: null | (() => void) = null;
let promiseReject: null | (() => void) = null;

const getAuth0 = new Auth0Lock(
  'tylVqDVyD9wE9yOpy5vhablvx5mINM71',
  'dev-kg2va7y3.eu.auth0.com', {
    auth: {
      redirect: false,
      sso: true,
      responseType: 'token id_token',
      
      params: {
        scope: 'openid profile email',
      }
    }
  }
);

getAuth0.on('authorization_error', result => {
  console.log('cant authorize');
  if (!!promiseReject) {
    promiseReject();
    promiseReject = null;
  }
});

getAuth0.on('authenticated', async authResult => {
  console.log('authenticated', authResult);
  if (!!promiseResolve) {
    promiseResolve();
    promiseResolve = null;
  }

  const result = await post(authorizeUrl, { jwtToken: authResult.idToken });
  localStorage.setItem('bx-jwt-token', authResult.idToken);

  console.log(result);
  getAuth0.hide();
});

function setCurrentUser(user: Areas.Account.IUser): Areas.Account.IUser | null {
  localStorage.setItem('bx-storage-user', JSON.stringify(user));

  return getCurrentUser();
}

function clearCurrentUser(): void {
  localStorage.removeItem('bx-storage-user');
}

export function isAuthorized(): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    getAuth0.checkSession({}, (err, aa) => {
      resolve(!!aa);
    });
    // get('/api/account/authorize')
    //   .then(() => resolve(true))
    //   .catch(() => resolve(false));
  });
}

export function login(): Promise<{}> {
  return new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
    getAuth0.show();
  });
}

export function logout(): Promise<void> {
  return new Promise(resolve => {
    getAuth0.logout({
    });
    resolve();
  });
  // clearCurrentUser();
  // return remove('/api/account/authorize', {});
}

export function getCurrentUser(): Areas.Account.IUser | null {
  const key = localStorage.getItem('bx-storage-user');
  if (key === null) {
    return null;
  }

  return JSON.parse(key) as Areas.Account.IUser;
}
