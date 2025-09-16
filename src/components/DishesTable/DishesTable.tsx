import {
  Button,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MEAL_TYPES } from '../../constants/planner';
import {
  addDish,
  addIngredient,
  removeIngredient,
  removeDish,
  resetToTemplate,
  setDishName,
  setDishType,
  setIngredient,
} from '../../features/dishes/dishesSlice';

function DishesTable() {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((s) => s.dishes);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">📚 Справочник блюд</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => dispatch(addDish())}>
            Добавить блюдо
          </Button>
          <Button variant="outlined" onClick={() => dispatch(resetToTemplate())}>
            Сбросить к шаблону
          </Button>
        </Stack>
      </Stack>
      <Table size="small" sx={{ mt: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell width="22%">Блюдо</TableCell>
            <TableCell width={120}>Тип</TableCell>
            <TableCell>Ингредиенты (на 1 порцию)</TableCell>
            <TableCell width={120}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dishes.map((d, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <TextField
                  fullWidth
                  value={d.name}
                  onChange={(e) => dispatch(setDishName({ index: idx, name: e.target.value }))}
                />
              </TableCell>
              <TableCell>
                <TextField
                  select
                  fullWidth
                  value={d.type}
                  onChange={(e) =>
                    dispatch(
                      setDishType({
                        index: idx,
                        type: e.target.value as (typeof MEAL_TYPES)[number],
                      }),
                    )
                  }
                >
                  {MEAL_TYPES.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {d.ingredients.map((ing, i) => (
                    <Stack key={i} direction="row" spacing={1} sx={{ width: '100%' }}>
                      <TextField
                        placeholder="Название"
                        value={ing.n}
                        onChange={(e) =>
                          dispatch(
                            setIngredient({
                              dishIndex: idx,
                              ingIndex: i,
                              ingredient: { ...ing, n: e.target.value },
                            }),
                          )
                        }
                        sx={{ flex: 2 }}
                      />
                      <TextField
                        placeholder="Кол-во"
                        type="number"
                        value={ing.q}
                        onChange={(e) =>
                          dispatch(
                            setIngredient({
                              dishIndex: idx,
                              ingIndex: i,
                              ingredient: { ...ing, q: Number(e.target.value || 0) },
                            }),
                          )
                        }
                        inputProps={{ step: 0.01 }}
                        sx={{ flex: 0.6 }}
                      />
                      <TextField
                        placeholder="Ед. (г, мл, шт…)"
                        value={ing.u}
                        onChange={(e) =>
                          dispatch(
                            setIngredient({
                              dishIndex: idx,
                              ingIndex: i,
                              ingredient: { ...ing, u: e.target.value },
                            }),
                          )
                        }
                        sx={{ flex: 0.6 }}
                      />
                      <Button
                        color="error"
                        onClick={() => dispatch(removeIngredient({ dishIndex: idx, ingIndex: i }))}
                      >
                        Удалить
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(addIngredient({ dishIndex: idx }))}
                  >
                    Добавить ингредиент
                  </Button>
                  <Button color="error" onClick={() => dispatch(removeDish(idx))}>
                    Удалить
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Формат ингредиента: название | количество | ед. Пример: рис | 70 | г
      </Typography>
    </Paper>
  );
}

export default DishesTable;
