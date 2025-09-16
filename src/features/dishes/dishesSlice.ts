import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { MEAL_TYPES } from '../../constants/planner';

export type Ingredient = { name: string; quantity: number; unit: string };
export type Dish = {
  name: string;
  type: (typeof MEAL_TYPES)[number];
  ingredients: Ingredient[];
  note?: string;
};

const templateDishes: Dish[] = [
  {
    name: 'Овсянка',
    type: 'Завтрак',
    ingredients: [
      { name: 'овсяные хлопья', quantity: 50, unit: 'г' },
      { name: 'молоко', quantity: 200, unit: 'мл' },
      { name: 'яблоко', quantity: 0.5, unit: 'шт' },
      { name: 'мёд', quantity: 1, unit: 'ст.л.' },
    ],
  },
  {
    name: 'Омлет с овощами',
    type: 'Завтрак',
    ingredients: [
      { name: 'яйца', quantity: 2, unit: 'шт' },
      { name: 'молоко', quantity: 30, unit: 'мл' },
      { name: 'помидор', quantity: 0.5, unit: 'шт' },
      { name: 'перец сладкий', quantity: 0.25, unit: 'шт' },
      { name: 'масло оливковое', quantity: 1, unit: 'ч.л.' },
    ],
  },
  {
    name: 'Суп чечевичный',
    type: 'Обед',
    ingredients: [
      { name: 'чечевица', quantity: 80, unit: 'г' },
      { name: 'морковь', quantity: 0.5, unit: 'шт' },
      { name: 'лук', quantity: 0.5, unit: 'шт' },
      { name: 'томатная паста', quantity: 1, unit: 'ст.л.' },
      { name: 'масло растительное', quantity: 1, unit: 'ст.л.' },
      { name: 'специи', quantity: 1, unit: 'щепотка' },
    ],
  },
  {
    name: 'Курица с рисом',
    type: 'Ужин',
    ingredients: [
      { name: 'куриная грудка', quantity: 150, unit: 'г' },
      { name: 'рис', quantity: 70, unit: 'г' },
      { name: 'масло растительное', quantity: 1, unit: 'ст.л.' },
      { name: 'специи', quantity: 1, unit: 'щепотка' },
    ],
  },
  {
    name: 'Паста с овощами',
    type: 'Обед',
    ingredients: [
      { name: 'макароны', quantity: 100, unit: 'г' },
      { name: 'кабачок', quantity: 0.5, unit: 'шт' },
      { name: 'томат', quantity: 1, unit: 'шт' },
      { name: 'чеснок', quantity: 1, unit: 'зубчик' },
      { name: 'оливковое масло', quantity: 1, unit: 'ст.л.' },
    ],
  },
  {
    name: 'Рыба запечённая',
    type: 'Ужин',
    ingredients: [
      { name: 'филе рыбы', quantity: 160, unit: 'г' },
      { name: 'лимон', quantity: 0.25, unit: 'шт' },
      { name: 'масло оливковое', quantity: 1, unit: 'ст.л.' },
      { name: 'соль', quantity: 1, unit: 'щепотка' },
    ],
  },
  {
    name: 'Салат греческий',
    type: 'Любое',
    ingredients: [
      { name: 'огурец', quantity: 0.5, unit: 'шт' },
      { name: 'помидор', quantity: 1, unit: 'шт' },
      { name: 'перец сладкий', quantity: 0.25, unit: 'шт' },
      { name: 'фета', quantity: 60, unit: 'г' },
      { name: 'оливки', quantity: 40, unit: 'г' },
      { name: 'оливковое масло', quantity: 1, unit: 'ст.л.' },
    ],
  },
  {
    name: 'Борщ быстрый',
    type: 'Обед',
    ingredients: [
      { name: 'свекла', quantity: 0.5, unit: 'шт' },
      { name: 'капуста', quantity: 150, unit: 'г' },
      { name: 'морковь', quantity: 0.5, unit: 'шт' },
      { name: 'лук', quantity: 0.5, unit: 'шт' },
      { name: 'томатная паста', quantity: 1, unit: 'ст.л.' },
    ],
  },
  {
    name: 'Лосось с булгуром',
    type: 'Ужин',
    ingredients: [
      { name: 'лосось', quantity: 170, unit: 'г' },
      { name: 'булгур', quantity: 70, unit: 'г' },
      { name: 'лимон', quantity: 0.25, unit: 'шт' },
      { name: 'оливковое масло', quantity: 1, unit: 'ст.л.' },
    ],
  },
  {
    name: 'Сэндвич с индейкой',
    type: 'Любое',
    ingredients: [
      { name: 'хлеб', quantity: 2, unit: 'ломт' },
      { name: 'индейка (нарезка)', quantity: 60, unit: 'г' },
      { name: 'сыр', quantity: 30, unit: 'г' },
      { name: 'листья салата', quantity: 2, unit: 'шт' },
    ],
  },
];

const initialState: Dish[] = (() => {
  try {
    const raw = localStorage.getItem('mealPlanner.dishes.v2');
    if (raw) {
      // Migrate ingredients from legacy keys (n/q/u) to new keys (name/quantity/unit)
      const parsed = JSON.parse(raw) as unknown as Array<{
        name: string;
        type: Dish['type'];
        note?: string;
        ingredients: Array<{
          n?: string;
          q?: number;
          u?: string;
          name?: string;
          quantity?: number;
          unit?: string;
        }>;
      }>;
      const migrated = parsed.map((dish) => ({
        name: dish.name,
        type: dish.type,
        note: dish.note,
        ingredients: (dish.ingredients || []).map((ing) => ({
          name: ing.name ?? ing.n ?? '',
          quantity: ing.quantity ?? ing.q ?? 0,
          unit: ing.unit ?? ing.u ?? '',
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
        state[dishIndex].ingredients.push({ name: '', quantity: 0, unit: '' });
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
        ingredients: [{ name: 'ингредиент', quantity: 1, unit: 'шт' }],
      });
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
} = dishesSlice.actions;
export default dishesSlice.reducer;
