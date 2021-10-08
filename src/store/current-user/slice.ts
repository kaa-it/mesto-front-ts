import { createSlice, createAsyncThunk, PayloadAction, SerializedError  } from "@reduxjs/toolkit";

import {UserData, UserInfoData, UserAvatarData} from "../../utils/mesto-api" ;
import { ThunkAPI } from "../store";

export const sliceName = "currentUser";

export const loadCurrentUser = createAsyncThunk<UserData, void, ThunkAPI>(
  `${sliceName}/loadCurrentUser`,
  async (_, {extra: {mestoApi} }) => {
    return await mestoApi.getUserInfo();
  }
);

export const sendCurrentUserInfo = createAsyncThunk<UserData, UserInfoData, ThunkAPI>(
  `${sliceName}/sendCurrentUserInfo`,
  async (data, {extra: {mestoApi} }) => {
    return await mestoApi.setUserInfo(data);
  }
);

export const sendCurrentUserAvatar = createAsyncThunk<UserData, UserAvatarData, ThunkAPI>(
  `${sliceName}/sendCurrentUserAvatar`,
  async (data, {extra: {mestoApi} }) => {
    return await mestoApi.setUserAvatar(data);
  }
);

interface CurrentUser {
  data: UserData | null,
  dataLoading: boolean,
  loadError: SerializedError | null,
  infoSending: boolean,
  infoSendError: SerializedError | null,
  avatarSending: boolean,
  avatarSendError: SerializedError | null,
}

const initialState: CurrentUser = {
  data: null,
  dataLoading: false,
  loadError: null,
  infoSending: false,
  infoSendError: null,
  avatarSending: false,
  avatarSendError: null,
};

const currentUserSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCurrentUserData(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCurrentUser.pending, (state) => {
      state.dataLoading = true;
      state.loadError = null;
    });
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.dataLoading = false;
    });
    builder.addCase(loadCurrentUser.rejected, (state, action) => {
      state.dataLoading = false;
      state.loadError = action.error;
    });

    builder.addCase(sendCurrentUserInfo.pending, (state) => {
      state.infoSending = true;
      state.infoSendError = null;
    });
    builder.addCase(sendCurrentUserInfo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.infoSending = false;
    });
    builder.addCase(sendCurrentUserInfo.rejected, (state, action) => {
      state.infoSending = false;
      state.infoSendError = action.error;
    });

    builder.addCase(sendCurrentUserAvatar.pending, (state) => {
      state.avatarSending = true;
      state.avatarSendError = null;
    });

    builder.addCase(sendCurrentUserAvatar.fulfilled, (state, action) => {
      state.data = action.payload;
      state.avatarSending = false;
    });

    builder.addCase(sendCurrentUserAvatar.rejected, (state, action) => {
      state.avatarSending = false;
      state.avatarSendError = action.error;
    });
  },
});

const { reducer } = currentUserSlice;

export default reducer;
