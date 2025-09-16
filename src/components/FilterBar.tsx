import { Stack, Typography } from '@mui/material'
import { Chip, GhostButton } from './ui/designSystem'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { DAYS } from '../constants/planner'
import { setAll, setWeekend, setWork, toggleDay } from '../features/filter/filterSlice'

function FilterBar() {
  const dispatch = useAppDispatch()
  const filterDays = useAppSelector((s) => s.filterDays)

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
        <GhostButton onClick={() => dispatch(setAll())}>Все</GhostButton>
        <GhostButton onClick={() => dispatch(setWork())}>Будни</GhostButton>
        <GhostButton onClick={() => dispatch(setWeekend())}>Выходные</GhostButton>
      </Stack>
    </Stack>
  )
}

export default FilterBar


