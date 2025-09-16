import Snackbar from '@mui/material/Snackbar';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideSnackbar } from '../../features/ui/uiSlice';

function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const snackbarMessage = useAppSelector((state) => state.ui.snackbarMessage);
  const snackbarDurationMs = useAppSelector((state) => state.ui.snackbarDurationMs);

  return (
    <Snackbar
      open={Boolean(snackbarMessage)}
      autoHideDuration={snackbarDurationMs}
      onClose={() => dispatch(hideSnackbar())}
      message={snackbarMessage || ''}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
}

export default GlobalSnackbar;
