import { Stack, Typography, Button, Chip } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { DAYS } from '../constants/planner';
import { setAll, setWeekend, setWork, toggleDay } from '../features/filter/filterSlice';

// Replaced custom Chip/GhostButton with MUI Chip/Button

function FilterBar() {
  const dispatch = useAppDispatch();
  const filterDays = useAppSelector((s) => s.filterDays);

  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      <Typography color="text.secondary" fontWeight={600} component="span">
        Показывать покупки для:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
        {DAYS.map((d) => (
          <Chip
            key={d}
            color={filterDays.includes(d) ? 'primary' : 'default'}
            variant={filterDays.includes(d) ? 'filled' : 'outlined'}
            label={d}
            onClick={() => dispatch(toggleDay(d))}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={() => dispatch(setAll())}>
          Все
        </Button>
        <Button variant="outlined" onClick={() => dispatch(setWork())}>
          Будни
        </Button>
        <Button variant="outlined" onClick={() => dispatch(setWeekend())}>
          Выходные
        </Button>
      </Stack>
    </Stack>
  );
}

export default FilterBar;
