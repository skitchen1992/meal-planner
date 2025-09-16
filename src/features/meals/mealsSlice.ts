import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Meal = {
  id: string
  title: string
  calories: number
}

type MealsState = {
  items: Meal[]
}

const initialState: MealsState = {
  items: [],
}

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.items.push(action.payload)
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((meal) => meal.id !== action.payload)
    },
    setMeals: (state, action: PayloadAction<Meal[]>) => {
      state.items = action.payload
    },
  },
})

export const { addMeal, removeMeal, setMeals } = mealsSlice.actions
export default mealsSlice.reducer


