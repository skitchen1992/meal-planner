import { TextField, type TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import type { FC } from 'react';

type FormikTextFieldProps = {
  name: string;
} & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'>;

export const FormikTextField: FC<FormikTextFieldProps> = ({ name, helperText, ...rest }) => {
  const [field, meta] = useField<string>(name);

  const showError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      {...field}
      {...rest}
      name={name}
      error={showError}
      helperText={showError ? meta.error : helperText}
      fullWidth={rest.fullWidth ?? true}
    />
  );
};

export default FormikTextField;
