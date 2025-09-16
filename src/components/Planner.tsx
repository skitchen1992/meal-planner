import { Box, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { DAYS, MEALS } from '../constants/planner';
import { setCellDish, setCellQty } from '../features/week/weekSlice';

// Replaced custom layout components with MUI Box/Paper

function Planner() {
  const dispatch = useAppDispatch();
  const week = useAppSelector((s) => s.week);
  const dishes = useAppSelector((s) => s.dishes);

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: { xs: '110px 1fr', md: '140px repeat(3, 1fr)' },
        }}
      >
        <Box
          sx={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'text.secondary',
            fontWeight: 800,
          }}
        >
          День
        </Box>
        {MEALS.map((m) => (
          <Box
            key={m}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'text.secondary',
              fontWeight: 800,
            }}
          >
            {m}
          </Box>
        ))}
        {DAYS.map((day) => (
          <Fragment key={day}>
            <Box
              key={`${day}-label`}
              sx={{
                backgroundColor: 'background.paper',
                p: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 700,
              }}
            >
              {day}
            </Box>
            {MEALS.map((meal) => {
              const entry = week[day][meal];
              const options = dishes
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
                .filter((d) => d.type === 'Любое' || d.type === meal);
              return (
                <Box
                  key={`${day}-${meal}`}
                  sx={{
                    backgroundColor: 'background.paper',
                    p: 1,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    gridColumn: { xs: '2 / -1', md: 'auto' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: '1fr 78px' },
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Select
                      displayEmpty
                      value={entry.dish}
                      onChange={(e) =>
                        dispatch(
                          setCellDish({
                            day,
                            meal,
                            dish: typeof e.target.value === 'string' ? e.target.value : '',
                          }),
                        )
                      }
                      renderValue={(value) => (value ? value : '— не выбрано —')}
                    >
                      <MenuItem value="">— не выбрано —</MenuItem>
                      {options.map((d) => (
                        <MenuItem key={d.name} value={d.name}>
                          {d.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
                        Порц.:
                      </Typography>
                      <TextField
                        type="number"
                        inputProps={{ min: 0, step: 0.5 }}
                        value={entry.qty}
                        onChange={(e) =>
                          dispatch(setCellQty({ day, meal, qty: Number(e.target.value || 0) }))
                        }
                        sx={{ maxWidth: 78 }}
                      />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Fragment>
        ))}
      </Box>
    </Paper>
  );
}

export default Planner;
