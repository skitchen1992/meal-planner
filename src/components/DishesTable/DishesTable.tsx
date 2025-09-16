import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetToTemplate } from '../../features/dishes/dishesSlice';
import { openModal } from '../../features/ui/uiSlice';

function DishesTable() {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((s) => s.dishes);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">📚 Справочник блюд</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => dispatch(openModal({ type: 'addDish', payload: null }))}
          >
            Добавить блюдо
          </Button>
          <Button variant="outlined" onClick={() => dispatch(resetToTemplate())}>
            Сбросить к шаблону
          </Button>
        </Stack>
      </Stack>
      <List sx={{ mt: 1 }}>
        {dishes.map((d, idx) => (
          <ListItem
            key={`${d.name}-${idx}`}
            sx={{ pr: 16 }}
            secondaryAction={
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  aria-label="Редактировать блюдо"
                  onClick={() =>
                    dispatch(openModal({ type: 'addDish', payload: { index: idx, dish: d } }))
                  }
                >
                  <EditIcon />
                </IconButton>
                <Button
                  color="error"
                  onClick={() =>
                    dispatch(
                      openModal({
                        type: 'confirmDeleteDish',
                        payload: { index: idx, name: d.name },
                      }),
                    )
                  }
                >
                  Удалить
                </Button>
              </Stack>
            }
          >
            <ListItemText
              primary={`${d.name} — ${d.type}`}
              slotProps={{ secondary: { sx: { whiteSpace: 'normal', overflowWrap: 'anywhere' } } }}
              secondary={
                <>
                  <Typography variant="body2">
                    {d.ingredients.map((i) => `${i.name} ${i.quantity}${i.unit}`).join(', ')}
                  </Typography>
                  <Typography variant="body1">
                    {d.note && d.note.trim() ? `Заметка: ${d.note.trim()}` : null}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default DishesTable;
