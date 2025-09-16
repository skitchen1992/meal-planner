import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DAYS, MEALS } from '../../constants/planner';

export type CellValue = { dish: string; qty: number };
export type DayState = Record<string, CellValue>;
export type WeekState = Record<string, DayState>;

function initEmptyWeek(): WeekState {
  const obj: WeekState = {} as WeekState;
  DAYS.forEach((d) => {
    obj[d] = {} as DayState;
    MEALS.forEach((m) => {
      obj[d][m] = { dish: '', qty: 1 };
    });
  });
  return obj;
}

const initialState: WeekState = (() => {
  try {
    const raw = localStorage.getItem('mealPlanner.week.v2');
    if (raw) {
      const parsed = JSON.parse(raw) as WeekState;
      // minimal migration: ensure structure
      const out = initEmptyWeek();
      DAYS.forEach((d) => {
        MEALS.forEach((m) => {
          type LooseWeek = Record<string, Record<string, unknown>>;
          const loose = parsed as unknown as LooseWeek;
          const v = loose?.[d]?.[m];
          if (typeof v === 'string') {
            out[d][m] = { dish: v || '', qty: 1 };
          } else if (v && typeof v === 'object') {
            const obj = v as { dish?: unknown; qty?: unknown };
            out[d][m] = {
              dish: typeof obj.dish === 'string' ? obj.dish : '',
              qty: Math.max(0, Number(obj.qty ?? 1)),
            };
          }
        });
      });
      return out;
    }
  } catch (error) {
    console.warn('Failed to read week from localStorage', error);
  }
  return initEmptyWeek();
})();

const weekSlice = createSlice({
  name: 'week',
  initialState,
  reducers: {
    setCellDish(state, action: PayloadAction<{ day: string; meal: string; dish: string }>) {
      const { day, meal, dish } = action.payload;
      state[day][meal].dish = dish;
    },
    setCellQty(state, action: PayloadAction<{ day: string; meal: string; qty: number }>) {
      const { day, meal, qty } = action.payload;
      state[day][meal].qty = Math.max(0, Math.min(99, qty));
    },
    resetWeek() {
      return initEmptyWeek();
    },
    setWeek(_state, action: PayloadAction<WeekState>) {
      return action.payload;
    },
  },
});

export const { setCellDish, setCellQty, resetWeek, setWeek } = weekSlice.actions;
export default weekSlice.reducer;
