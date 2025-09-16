import { configureStore } from '@reduxjs/toolkit';

import dishesReducer from '../features/dishes/dishesSlice';
import filterReducer from '../features/filter/filterSlice';
import mealsReducer from '../features/meals/mealsSlice';
import settingsReducer from '../features/settings/settingsSlice';
import uiReducer from '../features/ui/uiSlice';
import weekReducer from '../features/week/weekSlice';

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    settings: settingsReducer,
    week: weekReducer,
    dishes: dishesReducer,
    filterDays: filterReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
