import {sliceName} from './slice';
import type { RootState } from '../store';

export const getCurrentUser = (store: RootState) => store[sliceName].data;
export const getIsInfoSending = (store: RootState) => store[sliceName].infoSending;
export const getIsInfoSendError = (store: RootState) => store[sliceName].infoSendError;
export const getIsAvatarSending = (store: RootState) => store[sliceName].avatarSending;
export const getIsAvatarSendError = (store: RootState) => store[sliceName].avatarSendError;