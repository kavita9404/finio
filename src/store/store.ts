import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "./slices/appSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE,
} from "redux-persist";
import menuSlice from "./slices/menuSlice";
import userSlice from "./slices/userSlice";
import transactionsSlice from "./slices/transactionsSlice";

export type RootState = {
  menu: any;
  user: any;
  transactions: any;
};

const rootReducer = combineReducers<any>({
  menu: menuSlice,
  user: userSlice,
  transactions: transactionsSlice,
  [appApi.reducerPath]: appApi.reducer,
});

// Persist menu, user AND transactions (so chart data survives refresh)
// BUT exclude role so it always resets to "admin" on page load
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["menu", "user", "transactions"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([appApi.middleware]),
});

setupListeners(store.dispatch);
