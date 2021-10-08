import {sliceName} from './slice';
import type { RootState } from '../store';

export const getCards = (store: RootState) => store[sliceName].data;
export const getIsCardsLodaing = (store: RootState) => store[sliceName].loading;
export const getCardsLoadError = (store: RootState) => store[sliceName].loadError;
export const getIsCardSending = (store: RootState) => store[sliceName].isSending;
export const getCardSendError = (store: RootState) => store[sliceName].sendError;