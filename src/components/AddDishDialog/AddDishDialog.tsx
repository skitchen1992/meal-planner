import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';
import type { FC } from 'react';

import { MEAL_TYPES } from '../../constants/planner';
import type { Dish } from '../../features/dishes/dishesSlice';
import { FormikTextField } from '../Formik';

import { submitting } from './submitting';
import { validationSchema } from './validate';

export type IngredientForm = { n: string; q: string; u: string };
export type FormValues = {
  name: string;
  type: Dish['type'];
  note: string;
  ingredients: IngredientForm[];
};

type AddDishDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (dish: Dish) => void;
  mode?: 'add' | 'edit';
  initialValues?: Dish | null;
};

const defaultFormValues: FormValues = {
  name: '',
  type: MEAL_TYPES[0],
  note: '',
  ingredients: [{ n: '', q: '', u: '' }],
};

export const AddDishDialog: FC<AddDishDialogProps> = ({
  open,
  onClose,
  onSubmit,
  mode = 'add',
  initialValues,
}) => {
  const titleId = 'add-dish-dialog-title';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" aria-labelledby={titleId}>
      <DialogTitle id={titleId} sx={{ pr: 6 }}>
        {mode === 'edit' ? 'Редактировать блюдо' : 'Добавить блюдо'}
        <IconButton
          aria-label="Закрыть"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik<FormValues>
        initialValues={
          initialValues
            ? {
                name: initialValues.name,
                type: initialValues.type,
                note: initialValues.note ?? '',
                ingredients: initialValues.ingredients.map((i) => ({
                  n: i.n,
                  q: String(i.q),
                  u: i.u,
                })),
              }
            : defaultFormValues
        }
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, helpers) =>
          submitting(values, {
            setSubmitting: helpers.setSubmitting,
            resetForm: helpers.resetForm,
            onSubmit,
            onClose,
          })
        }
      >
        {({ values, isSubmitting }) => (
          <Form noValidate>
            <DialogContent>
              <Stack spacing={2}>
                <FormikTextField name="name" label="Название блюда" required />
                <FormikTextField name="type" label="Тип" select>
                  {MEAL_TYPES.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </FormikTextField>
                <FormikTextField
                  name="note"
                  label="Заметка"
                  multiline
                  minRows={3}
                  placeholder="например: быстрое блюдо, детям нравится"
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Ингредиенты
                  </Typography>
                  <FieldArray name="ingredients">
                    {({ push, remove }) => (
                      <Stack spacing={1}>
                        {values.ingredients.map((_, idx) => (
                          <Stack key={idx} direction="row" spacing={1} sx={{ width: '100%' }}>
                            <FormikTextField
                              name={`ingredients[${idx}].n`}
                              label="Название"
                              placeholder="рис"
                              sx={{ flex: 2 }}
                            />
                            <FormikTextField
                              name={`ingredients[${idx}].q`}
                              label="Кол-во"
                              type="number"
                              inputProps={{ step: 0.01, min: 0 }}
                              sx={{ flex: 0.8 }}
                            />
                            <FormikTextField
                              name={`ingredients[${idx}].u`}
                              label="Ед. (г, мл, шт…)"
                              placeholder="г"
                              sx={{ flex: 0.8 }}
                            />
                            <IconButton aria-label="Удалить ингредиент" onClick={() => remove(idx)}>
                              <CloseIcon />
                            </IconButton>
                          </Stack>
                        ))}
                        <Button
                          variant="outlined"
                          onClick={() => push({ n: '', q: '', u: '' })}
                          sx={{ alignSelf: 'flex-start', mt: 1 }}
                        >
                          Добавить ингредиент
                        </Button>
                      </Stack>
                    )}
                  </FieldArray>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Отмена</Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Сохранить
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddDishDialog;
