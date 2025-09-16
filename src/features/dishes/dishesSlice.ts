import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { MEAL_TYPES } from '../../constants/planner';

export const UNIT = {
  // Масса
  Milligram: 'мг',
  Gram: 'г',
  Kilogram: 'кг',
  Microgram: 'мкг',

  // Объём
  Milliliter: 'мл',
  Liter: 'л',
  Teaspoon: 'ч. л.',
  Tablespoon: 'ст. л.',
  Cup: 'стакан',

  // Штуки
  Piece: 'шт',
  Clove: 'долька',
  Slice: 'ломтик',
  Chunk: 'кусок',
  Pack: 'пакет',
  Package: 'упаковка',

  // Пучки и прочее
  Bunch: 'пучок',
  Sprig: 'веточка',
  Leaf: 'лист',
  Pinch: 'щепотка',
  Handful: 'горсть',

  // Условные
  ToTaste: 'по вкусу',
  ForServing: 'для подачи',
} as const;

export type Unit = (typeof UNIT)[keyof typeof UNIT];

export type Ingredient = { name: string; quantity: number; unit: Unit };
export type Dish = {
  name: string;
  type: (typeof MEAL_TYPES)[number];
  ingredients: Ingredient[];
  note?: string;
};

export const templateDishes: Dish[] = [];

const initialState: Dish[] = (() => {
  try {
    const raw = localStorage.getItem('mealPlanner.dishes.v2');
    if (raw) {
      const migrated = JSON.parse(raw).map((dish: Dish) => ({
        name: dish.name,
        type: dish.type,
        note: dish.note,
        ingredients: (dish.ingredients || []).map((ing) => ({
          name: ing.name ?? '',
          quantity: ing.quantity ?? 0,
          unit: (ing.unit as Unit) ?? UNIT.Piece,
        })),
      }));
      return migrated as Dish[];
    }
  } catch (error) {
    console.warn('Failed to read dishes from localStorage', error);
  }
  return templateDishes;
})();

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    resetToTemplate() {
      return JSON.parse(JSON.stringify(templateDishes)) as Dish[];
    },
    createDish(state, action: PayloadAction<Dish>) {
      state.push(action.payload);
    },
    updateDish(state, action: PayloadAction<{ index: number; dish: Dish }>) {
      const { index, dish } = action.payload;
      if (state[index]) {
        state[index] = dish;
      }
    },
    setDishName(state, action: PayloadAction<{ index: number; name: string }>) {
      const { index, name } = action.payload;
      if (state[index]) {
        state[index].name = name;
      }
    },
    setDishType(state, action: PayloadAction<{ index: number; type: Dish['type'] }>) {
      const { index, type } = action.payload;
      if (state[index]) {
        state[index].type = type;
      }
    },
    setIngredient(
      state,
      action: PayloadAction<{ dishIndex: number; ingIndex: number; ingredient: Ingredient }>,
    ) {
      const { dishIndex, ingIndex, ingredient } = action.payload;
      if (state[dishIndex]) {
        state[dishIndex].ingredients[ingIndex] = ingredient;
      }
    },
    addIngredient(state, action: PayloadAction<{ dishIndex: number }>) {
      const { dishIndex } = action.payload;
      if (state[dishIndex]) {
        state[dishIndex].ingredients.push({ name: '', quantity: 0, unit: UNIT.Piece });
      }
    },
    removeIngredient(state, action: PayloadAction<{ dishIndex: number; ingIndex: number }>) {
      const { dishIndex, ingIndex } = action.payload;
      if (state[dishIndex]) {
        state[dishIndex].ingredients.splice(ingIndex, 1);
      }
    },
    addDish(state) {
      state.push({
        name: 'Новое блюдо',
        type: 'Любое',
        ingredients: [{ name: 'ингредиент', quantity: 1, unit: UNIT.Piece }],
      });
    },
    setDishes(state, action: PayloadAction<Dish[]>) {
      state.splice(0, state.length, ...action.payload);
    },
    removeDish(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const getDishes = (state: RootState) => state.dishes;
export const {
  resetToTemplate,
  createDish,
  updateDish,
  setDishName,
  setDishType,
  setIngredient,
  addIngredient,
  removeIngredient,
  addDish,
  removeDish,
  setDishes,
} = dishesSlice.actions;
export default dishesSlice.reducer;
