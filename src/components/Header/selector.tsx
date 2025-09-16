import { createSelector } from 'reselect';

import { getPeople, getServingsPerPerson } from '../../features/settings/settingsSlice';

const selectHeaderProps = createSelector(
  [getPeople, getServingsPerPerson],
  (people, servingsPerPerson) => ({
    people,
    servingsPerPerson,
  }),
);

export default selectHeaderProps;
