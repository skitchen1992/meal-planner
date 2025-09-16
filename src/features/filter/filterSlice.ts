import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DAYS, LS_KEYS } from '../../constants/planner';

export type FilterState = string[];

const initialState: FilterState = (() => {
  try {
    const raw = localStorage.getItem(LS_KEYS.FILTER);
    if (raw) return JSON.parse(raw) as string[];
  } catch {}
  return DAYS.slice();
})();

const filterSlice = createSlice({
  name: 'filterDays',
  initialState,
  reducers: {
    setFilterDays(_state, action: PayloadAction<string[]>) {
      return action.payload;
    },
    toggleDay(state, action: PayloadAction<string>) {
      const day = action.payload;
      const idx = state.indexOf(day);
      if (idx >= 0) state.splice(idx, 1);
      else state.push(day);
    },
    setAll() {
      return DAYS.slice();
    },
    setWork() {
      return DAYS.slice(0, 5);
    },
    setWeekend() {
      return DAYS.slice(5);
    },
  },
});

export const { setFilterDays, toggleDay, setAll, setWork, setWeekend } = filterSlice.actions;
export default filterSlice.reducer;
