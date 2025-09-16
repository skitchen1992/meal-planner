import * as Yup from 'yup';

import { MEAL_TYPES } from '../../../constants/planner';
import type { Dish, Unit } from '../../../features/dishes/dishesSlice';

export const validationSchema = Yup.object({
  // Require at least 2 characters for dish name
  name: Yup.string().trim().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  // Restrict type to predefined meal types
  type: Yup.mixed<Dish['type']>().oneOf(MEAL_TYPES as unknown as Dish['type'][]),
  // Validate ingredients array and each field
  ingredients: Yup.array()
    .of(
      Yup.object({
        // Ingredient name is required
        name: Yup.string().trim().min(1, 'Укажите название').required('Обязательное поле'),
        // Quantity must be a number; allow empty which becomes 0 on submit
        quantity: Yup.number()
          .typeError('Должно быть числом')
          .min(0, 'Не меньше 0')
          .nullable()
          .transform((_value, originalValue) => {
            const parsed = Number(originalValue);
            return Number.isNaN(parsed) ? null : parsed;
          })
          .required('Обязательное поле'),
        // Unit must be a valid option; allow empty only if coerced by UI
        unit: Yup.mixed<Unit>().required('Обязательное поле'),
      }),
    )
    .min(1, 'Добавьте хотя бы один ингредиент')
    .required('Обязательное поле'),
});
