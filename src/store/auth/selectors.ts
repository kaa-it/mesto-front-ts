import { sliceName } from './slice';
import type { RootState } from '../store';

export const getIsAuth = (store: RootState) => !!store[sliceName].data;
export const getUserData = (store: RootState) => store[sliceName].data;
export const getIsAuthChecking = (store: RootState) => store[sliceName].authChecking;
export const getRegisterSending = (store: RootState) => store[sliceName].registerSending;
export const getRegisterError = (store: RootState) => store[sliceName].registerError;
export const getLoginSending = (store: RootState) => store[sliceName].loginSending;
export const getLoginError = (store: RootState) => store[sliceName].loginError;
