import type { Dish } from '../../../features/dishes/dishesSlice.ts';

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
        .filter((ing) => ing.name.trim() !== '')
        .map((ing) => ({
          name: ing.name.trim(),
          quantity: Number(ing.quantity) || 0,
          // Preserve selected unit string as-is
          unit: ing.unit,
        })),
    };
    onSubmit(dish);
    resetForm();
    onClose();
  } finally {
    setSubmitting(false);
  }
};
