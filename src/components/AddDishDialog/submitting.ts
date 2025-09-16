import type { Dish } from '../../features/dishes/dishesSlice';

import type { FormValues } from './AddDishDialog.tsx';

export const submitting = async (
  values: FormValues,
  {
    setSubmitting,
    resetForm,
    onSubmit,
    onClose,
  }: {
    setSubmitting: (submitting: boolean) => void;
    resetForm: () => void;
    onSubmit: (dish: Dish) => void;
    onClose: () => void;
  },
) => {
  try {
    const dish: Dish = {
      name: values.name.trim(),
      type: values.type,
      note: values.note?.trim() ? values.note.trim() : undefined,
      ingredients: values.ingredients
        .filter((ing) => ing.n.trim() !== '')
        .map((ing) => ({
          n: ing.n.trim(),
          q: Number(ing.q) || 0,
          u: ing.u.trim(),
        })),
    };
    onSubmit(dish);
    resetForm();
    onClose();
  } finally {
    setSubmitting(false);
  }
};
