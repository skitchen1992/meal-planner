import { Stack, Typography, Button, Chip } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DAYS } from '../../constants/planner';
import {
  getFilterDays,
  setAll,
  setWeekend,
  setWork,
  toggleDay,
} from '../../features/filter/filterSlice';

function FilterBar() {
  const dispatch = useAppDispatch();
  const filterDays = useAppSelector(getFilterDays);

  const handleSetAll = () => {
    dispatch(setAll());
  };

  const handleSetWork = () => {
    dispatch(setWork());
  };

  const handleSetWeekend = () => {
    dispatch(setWeekend());
  };

  const handleToggleDay = (d: string) => () => {
    dispatch(toggleDay(d));
  };

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
            onClick={handleToggleDay(d)}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={handleSetAll}>
          Все
        </Button>
        <Button variant="outlined" onClick={handleSetWork}>
          Будни
        </Button>
        <Button variant="outlined" onClick={handleSetWeekend}>
          Выходные
        </Button>
      </Stack>
    </Stack>
  );
}

export default FilterBar;
