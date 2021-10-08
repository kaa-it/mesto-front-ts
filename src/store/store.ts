import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from "history";
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from "redux-thunk";
import MestoApi from "../utils/mesto-api";
import AuthApi from "../utils/auth-api";
import {AUTH_SERVER_URL, MESTO_SERVER} from '../utils/constants';


import auth, {sliceName as authSliceName} from './auth/slice';
import currentUser, {sliceName as currentUserStoreName} from './current-user/slice';
import cards, {sliceName as cardsStoreName} from './cards/slice';


export const history = createBrowserHistory()

const authApi = new AuthApi(AUTH_SERVER_URL);
const mestoApi = new MestoApi(MESTO_SERVER);

const store = configureStore({
  reducer: {
    [currentUserStoreName]: currentUser,
    [cardsStoreName]: cards,
    [authSliceName]: auth,
    router: connectRouter(history)
  },
  middleware: [
    thunk.withExtraArgument({mestoApi, authApi}),
    routerMiddleware(history)
  ]
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAPI = {
  dispatch: AppDispatch;
  extra: {
    authApi: AuthApi;
    mestoApi: MestoApi
  };
}


