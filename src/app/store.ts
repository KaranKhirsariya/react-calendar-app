import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { todoApi } from "store/todoApi";
import calendarReducer from "../features/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
