import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { deezerApi } from "./services/deezer";

export const store = configureStore({
  reducer: {
    [deezerApi.reducerPath]: deezerApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
    }).concat(deezerApi.middleware),
});
