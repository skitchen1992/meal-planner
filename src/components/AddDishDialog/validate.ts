import * as Yup from 'yup';

import { MEAL_TYPES } from '../../constants/planner';
import type { Dish } from '../../features/dishes/dishesSlice';

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
        n: Yup.string().trim().min(1, 'Укажите название').required('Обязательное поле'),
        // Quantity must be a number; allow empty which becomes 0 on submit
        q: Yup.number()
          .typeError('Должно быть числом')
          .min(0, 'Не меньше 0')
          .nullable()
          .transform((value, originalValue) => {
            const parsed = Number(originalValue);
            return Number.isNaN(parsed) ? null : parsed;
          })
          .required('Обязательное поле'),
        // Unit is optional but recommended
        u: Yup.string().trim().max(16, 'Слишком длинно'),
      }),
    )
    .min(1, 'Добавьте хотя бы один ингредиент')
    .required('Обязательное поле'),
});
