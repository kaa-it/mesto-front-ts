import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

import { AppDispatch, ThunkAPI } from "../store";
import { AuthSignData, AuthUser } from "../../utils/auth-api";
import { AxiosResponse } from "axios";

export const sliceName = "auth";

export const registerUser = createAsyncThunk<AxiosResponse<AuthUser>, AuthSignData, ThunkAPI>(
  `${sliceName}/registerUser`,
  async (registerData, { dispatch, extra: { authApi } }) => {
    const data = await authApi.register(registerData);
    dispatch(push("/signin"));
    return data;
  }
);

export const loginUser = createAsyncThunk<{email: string}, AuthSignData, ThunkAPI>(
  `${sliceName}/loginUser`,
  async (loginData, { dispatch, extra: { authApi } }) => {
    const res = await authApi.login(loginData);
    localStorage.setItem("jwt", res.data.token);
    return loginData;
  }
);

export const checkAuth = createAsyncThunk<AuthUser, void , ThunkAPI>(
  `${sliceName}/checkAuth`,
  async (_, { extra: { authApi } }) => {
    const token = localStorage.getItem("jwt");
    if (token) return await authApi.checkToken(token);
    return Promise.reject("Нет токена");
  }
);

export const signOut = () => (dispatch: AppDispatch) => {
  dispatch(setUserData(null));
  localStorage.removeItem("jwt");
};

interface AuthState {
  data: AuthUser | null;
  authChecking: boolean;
  registerSending: boolean;
  registerError: SerializedError | null;
  loginSending: boolean;
  loginError: SerializedError | null;
}

const initialState: AuthState = {
  data: null,
  authChecking: true,
  registerSending: false,
  registerError: null,
  loginSending: false,
  loginError: null,
};

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<AuthUser | null>) {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerSending = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.registerSending = false;
      state.registerError = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerSending = false;
      state.registerError = action.error;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loginSending = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginSending = false;
      state.loginError = null;
      state.data = {
        email: action.payload.email
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginSending = false;
      state.loginError = action.error;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.authChecking = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.authChecking = false;
      state.data = action.payload;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.authChecking = false;
    });

  },
});

const { actions, reducer } = authSlice;

export const { setUserData } = actions;

export default reducer;
