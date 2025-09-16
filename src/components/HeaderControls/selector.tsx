import { createSelector } from 'reselect';

import { getDishes } from '../../features/dishes/dishesSlice';
import { getPeople, getServingsPerPerson } from '../../features/settings/settingsSlice';
import { getWeek } from '../../features/week/weekSlice';

const selectHeaderControlsProps = createSelector(
  [getPeople, getServingsPerPerson, getWeek, getDishes],
  (people, servingsPerPerson, week, dishes) => ({
    people,
    servingsPerPerson,
    week,
    dishes,
  }),
);

export default selectHeaderControlsProps;
