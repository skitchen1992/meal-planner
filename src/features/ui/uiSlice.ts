import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  snackbarMessage: string | null;
  snackbarDurationMs: number;
};

const initialState: UiState = {
  snackbarMessage: null,
  snackbarDurationMs: 1500,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<{ message: string; durationMs?: number }>) {
      state.snackbarMessage = action.payload.message;
      if (typeof action.payload.durationMs === 'number') {
        state.snackbarDurationMs = action.payload.durationMs;
      }
    },
    hideSnackbar(state) {
      state.snackbarMessage = null;
    },
  },
});

export const { showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
