import { createContext } from 'react';

export default createContext({ isAuthorized: false, changeAuthorize: (isAuth: boolean) => { /* default auth */ }});
