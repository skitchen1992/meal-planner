import { Chip, Stack, TextField, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPeople, setServingsPerPerson } from '../../features/settings/settingsSlice';
import DataControls from '../DataControls/DataControls';
import HeaderControls from '../HeaderControls';

import selector from './selector';

const Header = () => {
  const dispatch = useAppDispatch();

  const { people, servingsPerPerson } = useAppSelector(selector);

  const handleServingsPerPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setServingsPerPerson(Math.max(1, Math.min(8, Math.trunc(Number(e.target.value) || 1)))),
    );
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPeople(Math.max(1, Math.min(32, Math.trunc(Number(e.target.value) || 1)))));
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" component="h1" sx={{ m: 0 }}>
          Планировщик меню на неделю
        </Typography>
        <Chip color="secondary" label={`Баз. порций на приём: ${people * servingsPerPerson}`} />
      </Stack>

      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography component="label" htmlFor="servings" color="text.secondary" fontWeight={600}>
          Порций на человека:
        </Typography>
        <TextField
          id="servings"
          size="small"
          type="number"
          value={servingsPerPerson}
          onChange={handleServingsPerPersonChange}
          inputProps={{ min: 1, step: 1, 'aria-label': 'servings per person' }}
          sx={{ maxWidth: 60 }}
        />
        <Typography component="label" htmlFor="people" color="text.secondary" fontWeight={600}>
          Людей:
        </Typography>
        <TextField
          id="people"
          size="small"
          type="number"
          value={people}
          onChange={handlePeopleChange}
          inputProps={{ min: 1, step: 1, 'aria-label': 'people' }}
          sx={{ maxWidth: 100 }}
        />
        <HeaderControls />
      </Stack>

      <DataControls />
    </Stack>
  );
};

export default Header;
