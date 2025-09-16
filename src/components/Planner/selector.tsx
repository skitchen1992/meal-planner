import { createSelector } from 'reselect';

import { getDishes } from '../../features/dishes/dishesSlice';
import { getWeek } from '../../features/week/weekSlice';

const selectPlannerProps = createSelector([getWeek, getDishes], (week, dishes) => ({
  week,
  dishes,
}));

export default selectPlannerProps;
