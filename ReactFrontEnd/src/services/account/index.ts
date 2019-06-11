import { post, remove } from '@bx-utils/ajax';
import Auth0Lock from 'auth0-lock';
import { atuhorizeStore } from '@bx-utils/storage';

const authorizeUrl = '/api/account/authorize';

let promiseResolve: null | (() => void) = null;
let promiseReject: null | (() => void) = null;

const clientID = 'tylVqDVyD9wE9yOpy5vhablvx5mINM71';
const domain = 'dev-kg2va7y3.eu.auth0.com';

const getAuth0 = new Auth0Lock(
  clientID,
  domain, {
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
  atuhorizeStore.update({ jwtToken: authResult.idToken});

  const result = await post(authorizeUrl, { jwtToken: authResult.idToken });

  if (!!promiseResolve) {
    promiseResolve();
    promiseResolve = null;
  }
  getAuth0.hide();
});

export function isAuthorized(): Promise<boolean> {
  const auth = atuhorizeStore.get();

  return Promise.resolve(!!auth);
}

export function login(): Promise<{}> {
  return new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
    getAuth0.show();
  });
}

export async function logout(): Promise<void> {
  await remove('/api/account/authorize', {});
  atuhorizeStore.clear();
}

export function getCurrentUser(): Areas.Account.IUser | null {
  alert('dont');

  return null;
}
