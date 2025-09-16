import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';

import { FormikTextField } from './FormikTextField';

type DemoValues = {
  name: string;
  servings: number | '';
};

const validationSchema = Yup.object({
  // ^ Require at least 2 letters, allow spaces
  name: Yup.string().trim().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  // ^ Integer >= 1
  servings: Yup.number()
    .typeError('Должно быть числом')
    .integer('Только целые значения')
    .min(1, 'Минимум 1')
    .required('Обязательное поле'),
});

const initialValues: DemoValues = {
  name: '',
  servings: '',
};

export const FormikDemo: FC = () => {
  return (
    <Box>
      <Formik<DemoValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (_values, { setSubmitting, resetForm }) => {
          try {
            await new Promise((r) => setTimeout(r, 500));
            // Intentionally no console.log in production code
            resetForm();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Stack spacing={2}>
              <FormikTextField name="name" label="Название блюда" required />
              <FormikTextField
                name="servings"
                label="Порции"
                required
                type="number"
                inputProps={{ min: 1 }}
              />
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Сохранить
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormikDemo;
