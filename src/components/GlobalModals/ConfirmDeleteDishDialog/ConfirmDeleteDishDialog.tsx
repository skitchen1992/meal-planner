import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import type { FC } from 'react';

type ConfirmDeleteDishDialogProps = {
  open: boolean;
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmDeleteDishDialog: FC<ConfirmDeleteDishDialogProps> = ({
  open,
  name,
  onCancel,
  onConfirm,
}) => {
  const titleId = 'confirm-delete-dish-title';
  const descriptionId = 'confirm-delete-dish-description';

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="xs"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <DialogTitle id={titleId}>Подтвердите удаление</DialogTitle>
      <DialogContent>
        <Typography id={descriptionId}>Удалить блюдо «{name}»?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button color="error" variant="contained" onClick={onConfirm} autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDishDialog;
