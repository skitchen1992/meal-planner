import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SettingsState = {
  people: number;
  servingsPerPerson: number;
};

const initialState: SettingsState = {
  people: 2,
  servingsPerPerson: 1,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<number>) {
      const value = Math.max(1, Math.min(32, Math.trunc(action.payload)));
      state.people = value;
    },
    setServingsPerPerson(state, action: PayloadAction<number>) {
      const value = Math.max(1, Math.min(8, Math.trunc(action.payload)));
      state.servingsPerPerson = value;
    },
  },
});

export const { setPeople, setServingsPerPerson } = settingsSlice.actions;
export default settingsSlice.reducer;
