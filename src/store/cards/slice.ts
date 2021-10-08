import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";

import { CardData, CardSendData } from "../../utils/mesto-api" ;
import { ThunkAPI } from "../store";


export const sliceName = "cards";

export const loadCards = createAsyncThunk<Array<CardData>, void, ThunkAPI>(
  `${sliceName}/loadCards`,
  async (_, { extra: { mestoApi } }) => {
    return await mestoApi.getCardList();
  }
);

export const addCard = createAsyncThunk<CardData, CardSendData, ThunkAPI>(
  `${sliceName}/addCard`,
  async (data, { extra: { mestoApi } }) => {
    return await mestoApi.addCard(data);
  }
);

export const deleteCard = createAsyncThunk<string, string, ThunkAPI>(
  `${sliceName}/deleteCard`,
  async (id, { extra: { mestoApi } }) => {
    await mestoApi.removeCard(id);
    return id;
  }
);

export const changeLikeCardStatus = createAsyncThunk<CardData, {id: string, like: boolean}, ThunkAPI>(
  `${sliceName}/changeLikeCardStatus`,
  async ({ id, like }, { extra: { mestoApi } }) => {
    return await mestoApi.changeLikeCardStatus(id, like);
  }
);

interface Cards {
  data: Array<CardData>,
  loading: boolean,
  loadError: SerializedError | null,
  isSending: boolean,
  sendError: SerializedError | null,
};

const initialState: Cards = {
  data: [],
  loading: false,
  loadError: null,
  isSending: false,
  sendError: null,
};


const cardsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: { },
  extraReducers: (builder) => {

    builder.addCase(loadCards.pending, (state) => {
      state.loading = true;
      state.loadError = null;
    });
    builder.addCase(loadCards.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(loadCards.rejected, (state, action) => {
      state.loading = false;
      state.loadError = action.error;
    });
    
    builder.addCase(addCard.pending, (state, action) => {
      state.isSending = true;
      state.sendError = null;
    });
    
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
      state.isSending = false;
    });
    
    builder.addCase(addCard.rejected, (state, action) => {
      state.isSending = false;
      state.sendError = action.error;
    });

    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.data = state.data.filter((c) => c._id !== action.payload);
    });

    builder.addCase(changeLikeCardStatus.fulfilled, (state, action) => {
      state.data = state.data.map((c) => {
        return c._id === action.payload._id ? action.payload : c
      });
    });
  },
});

const { reducer } = cardsSlice;

export default reducer;
