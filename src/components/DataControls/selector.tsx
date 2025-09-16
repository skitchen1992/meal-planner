import { createSelector } from 'reselect';

import { getDishes } from '../../features/dishes/dishesSlice';
import { getFilterDays } from '../../features/filter/filterSlice';
import { getPeople, getServingsPerPerson } from '../../features/settings/settingsSlice';
import { getWeek } from '../../features/week/weekSlice';

const selectDataControlsProps = createSelector(
  [getPeople, getServingsPerPerson, getWeek, getDishes, getFilterDays],
  (people, servingsPerPerson, week, dishes, filterDays) => ({
    people,
    servingsPerPerson,
    week,
    dishes,
    filterDays,
  }),
);

export default selectDataControlsProps;
