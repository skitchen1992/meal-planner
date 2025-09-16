import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import type { Dish } from '../dishes/dishesSlice';

export type ModalType = 'addDish' | 'confirmDeleteDish';

export type UiModalState = {
  opened: boolean;
  data: unknown | null;
};

export type UiState = {
  snackbarMessage: string | null;
  snackbarDurationMs: number;
  modals: Record<ModalType, UiModalState>;
};

const initialState: UiState = {
  snackbarMessage: null,
  snackbarDurationMs: 1500,
  modals: {
    addDish: { opened: false, data: null },
    confirmDeleteDish: { opened: false, data: null },
  },
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
    openModal(
      state,
      action: PayloadAction<
        | { type: 'addDish'; payload?: { index: number; dish: Dish } | null }
        | { type: 'confirmDeleteDish'; payload: { index: number; name: string } }
      >,
    ) {
      const { type } = action.payload;
      // Reset all modals before opening the requested one
      (Object.keys(state.modals) as ModalType[]).forEach((key) => {
        state.modals[key] = { opened: false, data: null };
      });
      const newData = 'payload' in action.payload ? (action.payload.payload ?? null) : null;
      state.modals[type] = { opened: true, data: newData };
    },
    closeModal(state, action: PayloadAction<{ type: ModalType }>) {
      const { type } = action.payload;
      state.modals[type] = { opened: false, data: null };
    },
  },
});

export const { showSnackbar, hideSnackbar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;

// Selectors
export const selectAddDishModal = (state: RootState) =>
  state.ui.modals.addDish as UiModalState & { data: { index: number; dish: Dish } | null };

export const selectConfirmDeleteDishModal = (state: RootState) =>
  state.ui.modals.confirmDeleteDish as UiModalState & {
    data: { index: number; name: string } | null;
  };
