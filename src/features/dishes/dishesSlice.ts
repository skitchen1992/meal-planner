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

export const templateDishes: Dish[] = [
  {
    name: 'Овсянка',
    type: 'Завтрак',
    ingredients: [
      { name: 'овсяные хлопья', quantity: 50, unit: UNIT.Gram },
      { name: 'молоко', quantity: 200, unit: UNIT.Milliliter },
      { name: 'яблоко', quantity: 0.5, unit: UNIT.Piece },
      { name: 'мёд', quantity: 1, unit: UNIT.Tablespoon },
    ],
  },
  {
    name: 'Омлет с овощами',
    type: 'Завтрак',
    ingredients: [
      { name: 'яйца', quantity: 2, unit: UNIT.Piece },
      { name: 'молоко', quantity: 30, unit: UNIT.Milliliter },
      { name: 'помидор', quantity: 0.5, unit: UNIT.Piece },
      { name: 'перец сладкий', quantity: 0.25, unit: UNIT.Piece },
      { name: 'масло оливковое', quantity: 1, unit: UNIT.Teaspoon },
    ],
  },
  {
    name: 'Суп чечевичный',
    type: 'Обед',
    ingredients: [
      { name: 'чечевица', quantity: 80, unit: UNIT.Gram },
      { name: 'морковь', quantity: 0.5, unit: UNIT.Piece },
      { name: 'лук', quantity: 0.5, unit: UNIT.Piece },
      { name: 'томатная паста', quantity: 1, unit: UNIT.Tablespoon },
      { name: 'масло растительное', quantity: 1, unit: UNIT.Tablespoon },
      { name: 'специи', quantity: 1, unit: UNIT.Pinch },
    ],
  },
  {
    name: 'Курица с рисом',
    type: 'Ужин',
    ingredients: [
      { name: 'куриная грудка', quantity: 150, unit: UNIT.Gram },
      { name: 'рис', quantity: 70, unit: UNIT.Gram },
      { name: 'масло растительное', quantity: 1, unit: UNIT.Tablespoon },
      { name: 'специи', quantity: 1, unit: UNIT.Pinch },
    ],
  },
  {
    name: 'Паста с овощами',
    type: 'Обед',
    ingredients: [
      { name: 'макароны', quantity: 100, unit: UNIT.Gram },
      { name: 'кабачок', quantity: 0.5, unit: UNIT.Piece },
      { name: 'томат', quantity: 1, unit: UNIT.Piece },
      { name: 'чеснок', quantity: 1, unit: UNIT.Piece },
      { name: 'оливковое масло', quantity: 1, unit: UNIT.Tablespoon },
    ],
  },
  {
    name: 'Рыба запечённая',
    type: 'Ужин',
    ingredients: [
      { name: 'филе рыбы', quantity: 160, unit: UNIT.Gram },
      { name: 'лимон', quantity: 0.25, unit: UNIT.Piece },
      { name: 'масло оливковое', quantity: 1, unit: UNIT.Tablespoon },
      { name: 'соль', quantity: 1, unit: UNIT.Pinch },
    ],
  },
  {
    name: 'Салат греческий',
    type: 'Любое',
    ingredients: [
      { name: 'огурец', quantity: 0.5, unit: UNIT.Piece },
      { name: 'помидор', quantity: 1, unit: UNIT.Piece },
      { name: 'перец сладкий', quantity: 0.25, unit: UNIT.Piece },
      { name: 'фета', quantity: 60, unit: UNIT.Gram },
      { name: 'оливки', quantity: 40, unit: UNIT.Gram },
      { name: 'оливковое масло', quantity: 1, unit: UNIT.Tablespoon },
    ],
  },
  {
    name: 'Борщ быстрый',
    type: 'Обед',
    ingredients: [
      { name: 'свекла', quantity: 0.5, unit: UNIT.Piece },
      { name: 'капуста', quantity: 150, unit: UNIT.Gram },
      { name: 'морковь', quantity: 0.5, unit: UNIT.Piece },
      { name: 'лук', quantity: 0.5, unit: UNIT.Piece },
      { name: 'томатная паста', quantity: 1, unit: UNIT.Tablespoon },
    ],
  },
  {
    name: 'Лосось с булгуром',
    type: 'Ужин',
    ingredients: [
      { name: 'лосось', quantity: 170, unit: UNIT.Gram },
      { name: 'булгур', quantity: 70, unit: UNIT.Gram },
      { name: 'лимон', quantity: 0.25, unit: UNIT.Piece },
      { name: 'оливковое масло', quantity: 1, unit: UNIT.Tablespoon },
    ],
  },
  {
    name: 'Сэндвич с индейкой',
    type: 'Любое',
    ingredients: [
      { name: 'хлеб', quantity: 2, unit: UNIT.Piece },
      { name: 'индейка (нарезка)', quantity: 60, unit: UNIT.Gram },
      { name: 'сыр', quantity: 30, unit: UNIT.Gram },
      { name: 'листья салата', quantity: 2, unit: UNIT.Piece },
    ],
  },
];

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
