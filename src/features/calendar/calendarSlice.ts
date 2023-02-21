import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "../../app/store";
type CalendarType = {
  /**
   * 4 digit year string
   */
  year: number;
  /**
   * starting from 0-11
   */
  month: number | null;
  /**
   * date starting 1 - last day of month
   */
  date: number | null;
  /**
   * date in iso format i.e. YYYY-MM-DD
   */
  dateIso: string | null;
};

const initialState: CalendarType = {
  year: dayjs().year(),
  month: dayjs().month(),
  date: dayjs().date(),
  dateIso: dayjs().format("YYYY-MM-DD"),
};
const getUpdatedIsoDate = (state: CalendarType) => {
  if (state.month != null && state.date != null) {
    const dayjsDate = dayjs(new Date(state.year,state.month,state.date));
    if (dayjsDate.isValid()) {
      return dayjsDate.format('YYYY-MM-DD');
    }
  }
  return null;
};
const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    nextYear(state) {
      state.year += 1;
      state.date = null;
      state.dateIso = getUpdatedIsoDate(state);
    },
    prevYear(state) {
      state.year -= 1;
      state.date = null;
      state.dateIso = getUpdatedIsoDate(state);
    },
    monthChanged(state, action: PayloadAction<number | null>) {
      state.month = action.payload;
      state.date = null;
      state.dateIso = getUpdatedIsoDate(state);
    },
    dateSelected(state, action: PayloadAction<number | null>) {
      state.date = action.payload;
      state.dateIso = getUpdatedIsoDate(state);
    },
  },
});

export const { nextYear, prevYear, monthChanged ,dateSelected} = calendarSlice.actions;

export default calendarSlice.reducer;

export const selectCalendar = (state: RootState) => state.calendar;
export const selectYear = createSelector(selectCalendar, (state) => state.year);
export const selectDate = createSelector(selectCalendar, (state) => state.date);
export const selectDateIso = createSelector(
  selectCalendar,
  (state) => state.dateIso
);

export const selectMonth = createSelector(
  selectCalendar,
  (state) => state.month
);
