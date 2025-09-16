import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MEAL_TYPES } from '../../constants/planner';

export type Ingredient = { n: string; q: number; u: string };
export type Dish = { name: string; type: (typeof MEAL_TYPES)[number]; ingredients: Ingredient[] };

const templateDishes: Dish[] = [
  {
    name: 'Овсянка',
    type: 'Завтрак',
    ingredients: [
      { n: 'овсяные хлопья', q: 50, u: 'г' },
      { n: 'молоко', q: 200, u: 'мл' },
      { n: 'яблоко', q: 0.5, u: 'шт' },
      { n: 'мёд', q: 1, u: 'ст.л.' },
    ],
  },
  {
    name: 'Омлет с овощами',
    type: 'Завтрак',
    ingredients: [
      { n: 'яйца', q: 2, u: 'шт' },
      { n: 'молоко', q: 30, u: 'мл' },
      { n: 'помидор', q: 0.5, u: 'шт' },
      { n: 'перец сладкий', q: 0.25, u: 'шт' },
      { n: 'масло оливковое', q: 1, u: 'ч.л.' },
    ],
  },
  {
    name: 'Суп чечевичный',
    type: 'Обед',
    ingredients: [
      { n: 'чечевица', q: 80, u: 'г' },
      { n: 'морковь', q: 0.5, u: 'шт' },
      { n: 'лук', q: 0.5, u: 'шт' },
      { n: 'томатная паста', q: 1, u: 'ст.л.' },
      { n: 'масло растительное', q: 1, u: 'ст.л.' },
      { n: 'специи', q: 1, u: 'щепотка' },
    ],
  },
  {
    name: 'Курица с рисом',
    type: 'Ужин',
    ingredients: [
      { n: 'куриная грудка', q: 150, u: 'г' },
      { n: 'рис', q: 70, u: 'г' },
      { n: 'масло растительное', q: 1, u: 'ст.л.' },
      { n: 'специи', q: 1, u: 'щепотка' },
    ],
  },
  {
    name: 'Паста с овощами',
    type: 'Обед',
    ingredients: [
      { n: 'макароны', q: 100, u: 'г' },
      { n: 'кабачок', q: 0.5, u: 'шт' },
      { n: 'томат', q: 1, u: 'шт' },
      { n: 'чеснок', q: 1, u: 'зубчик' },
      { n: 'оливковое масло', q: 1, u: 'ст.л.' },
    ],
  },
  {
    name: 'Рыба запечённая',
    type: 'Ужин',
    ingredients: [
      { n: 'филе рыбы', q: 160, u: 'г' },
      { n: 'лимон', q: 0.25, u: 'шт' },
      { n: 'масло оливковое', q: 1, u: 'ст.л.' },
      { n: 'соль', q: 1, u: 'щепотка' },
    ],
  },
  {
    name: 'Салат греческий',
    type: 'Любое',
    ingredients: [
      { n: 'огурец', q: 0.5, u: 'шт' },
      { n: 'помидор', q: 1, u: 'шт' },
      { n: 'перец сладкий', q: 0.25, u: 'шт' },
      { n: 'фета', q: 60, u: 'г' },
      { n: 'оливки', q: 40, u: 'г' },
      { n: 'оливковое масло', q: 1, u: 'ст.л.' },
    ],
  },
  {
    name: 'Борщ быстрый',
    type: 'Обед',
    ingredients: [
      { n: 'свекла', q: 0.5, u: 'шт' },
      { n: 'капуста', q: 150, u: 'г' },
      { n: 'морковь', q: 0.5, u: 'шт' },
      { n: 'лук', q: 0.5, u: 'шт' },
      { n: 'томатная паста', q: 1, u: 'ст.л.' },
    ],
  },
  {
    name: 'Лосось с булгуром',
    type: 'Ужин',
    ingredients: [
      { n: 'лосось', q: 170, u: 'г' },
      { n: 'булгур', q: 70, u: 'г' },
      { n: 'лимон', q: 0.25, u: 'шт' },
      { n: 'оливковое масло', q: 1, u: 'ст.л.' },
    ],
  },
  {
    name: 'Сэндвич с индейкой',
    type: 'Любое',
    ingredients: [
      { n: 'хлеб', q: 2, u: 'ломт' },
      { n: 'индейка (нарезка)', q: 60, u: 'г' },
      { n: 'сыр', q: 30, u: 'г' },
      { n: 'листья салата', q: 2, u: 'шт' },
    ],
  },
];

const initialState: Dish[] = (() => {
  try {
    const raw = localStorage.getItem('mealPlanner.dishes.v2');
    if (raw) return JSON.parse(raw) as Dish[];
  } catch {}
  return templateDishes;
})();

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    resetToTemplate() {
      return JSON.parse(JSON.stringify(templateDishes)) as Dish[];
    },
    setDishName(state, action: PayloadAction<{ index: number; name: string }>) {
      const { index, name } = action.payload;
      if (state[index]) state[index].name = name;
    },
    setDishType(state, action: PayloadAction<{ index: number; type: Dish['type'] }>) {
      const { index, type } = action.payload;
      if (state[index]) state[index].type = type;
    },
    setIngredient(
      state,
      action: PayloadAction<{ dishIndex: number; ingIndex: number; ingredient: Ingredient }>,
    ) {
      const { dishIndex, ingIndex, ingredient } = action.payload;
      if (state[dishIndex]) state[dishIndex].ingredients[ingIndex] = ingredient;
    },
    addIngredient(state, action: PayloadAction<{ dishIndex: number }>) {
      const { dishIndex } = action.payload;
      if (state[dishIndex]) state[dishIndex].ingredients.push({ n: '', q: 0, u: '' });
    },
    removeIngredient(state, action: PayloadAction<{ dishIndex: number; ingIndex: number }>) {
      const { dishIndex, ingIndex } = action.payload;
      if (state[dishIndex]) state[dishIndex].ingredients.splice(ingIndex, 1);
    },
    addDish(state) {
      state.push({
        name: 'Новое блюдо',
        type: 'Любое',
        ingredients: [{ n: 'ингредиент', q: 1, u: 'шт' }],
      });
    },
    removeDish(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const {
  resetToTemplate,
  setDishName,
  setDishType,
  setIngredient,
  addIngredient,
  removeIngredient,
  addDish,
  removeDish,
} = dishesSlice.actions;
export default dishesSlice.reducer;
