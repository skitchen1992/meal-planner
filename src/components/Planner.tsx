import { MenuItem, Select, TextField } from '@mui/material'
import { Card } from './ui/designSystem'
import { GridPlanner, Cell, MealCell, QtyWrap } from './ui/designSystem'
import { DAYS, MEALS } from '../constants/planner'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setCellDish, setCellQty } from '../features/week/weekSlice'

function Planner() {
  const dispatch = useAppDispatch()
  const week = useAppSelector((s) => s.week)
  const dishes = useAppSelector((s) => s.dishes)

  return (
    <Card>
      <GridPlanner>
        <Cell className="cell head">День</Cell>
        {MEALS.map((m) => (
          <Cell key={m} className="cell head">
            {m}
          </Cell>
        ))}
        {DAYS.map((day) => (
          <>
            <Cell key={`${day}-label`} className="cell day">
              {day}
            </Cell>
            {MEALS.map((meal) => {
              const entry = week[day][meal]
              const options = dishes
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
                .filter((d) => d.type === 'Любое' || d.type === meal)
              return (
                <Cell key={`${day}-${meal}`} className="cell meal">
                  <MealCell>
                    <Select
                      displayEmpty
                      value={entry.dish}
                      onChange={(e) =>
                        dispatch(
                          setCellDish({ day, meal, dish: typeof e.target.value === 'string' ? e.target.value : '' }),
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
                    <QtyWrap>
                      <span className="lbl">Порц.:</span>
                      <TextField
                        type="number"
                        inputProps={{ min: 0, step: 0.5 }}
                        value={entry.qty}
                        onChange={(e) => dispatch(setCellQty({ day, meal, qty: Number(e.target.value || 0) }))}
                        sx={{ maxWidth: 78 }}
                      />
                    </QtyWrap>
                  </MealCell>
                </Cell>
              )
            })}
          </>
        ))}
      </GridPlanner>
    </Card>
  )
}

export default Planner


