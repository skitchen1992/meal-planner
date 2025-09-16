import { configureStore } from '@reduxjs/toolkit'
import mealsReducer from '../features/meals/mealsSlice'
import settingsReducer from '../features/settings/settingsSlice'
import weekReducer from '../features/week/weekSlice'
import dishesReducer from '../features/dishes/dishesSlice'
import filterReducer from '../features/filter/filterSlice'

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    settings: settingsReducer,
    week: weekReducer,
    dishes: dishesReducer,
    filterDays: filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


