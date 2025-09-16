import { Button } from '@mui/material';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LS_KEYS } from '../../constants/planner';
import { setPeople, setServingsPerPerson } from '../../features/settings/settingsSlice';
import { showSnackbar } from '../../features/ui/uiSlice';
import { resetWeek } from '../../features/week/weekSlice';

import selector from './selector';

const HeaderControls: React.FC = () => {
  const dispatch = useAppDispatch();

  const { people, servingsPerPerson, week, dishes } = useAppSelector(selector);

  const handleSave = () => {
    const settings = { people, servingsPerPerson };

    try {
      localStorage.setItem(LS_KEYS.SETTINGS, JSON.stringify(settings));
      const weekRaw = JSON.stringify(week);
      if (weekRaw) {
        localStorage.setItem(LS_KEYS.WEEK, weekRaw);
      }
      const dishesRaw = JSON.stringify(dishes);
      if (dishesRaw) {
        localStorage.setItem(LS_KEYS.DISHES, dishesRaw);
      }
    } catch (error) {
      console.warn('Failed to save to localStorage', error);
    }

    dispatch(showSnackbar({ message: 'Меню сохранено ✅' }));
  };

  const handleResetAll = () => {
    if (!confirm('Полный сброс данных (меню, блюда, настройки)?')) {
      return;
    }
    try {
      localStorage.removeItem(LS_KEYS.WEEK);
      localStorage.removeItem(LS_KEYS.DISHES);
      localStorage.removeItem(LS_KEYS.SETTINGS);
      localStorage.removeItem(LS_KEYS.FILTER);
    } catch (error) {
      console.warn('Failed to cleanup localStorage', error);
    }
    dispatch(setPeople(2));
    dispatch(setServingsPerPerson(1));
    dispatch(resetWeek());
    dispatch(showSnackbar({ message: 'Сброшено ✅' }));
  };

  const handleClearWeek = () => {
    if (!confirm('Очистить выбранные блюда за неделю?')) {
      return;
    }
    dispatch(resetWeek());
    dispatch(showSnackbar({ message: 'Неделя очищена ✅' }));
  };

  return (
    <>
      <Button variant="contained" onClick={handleSave}>
        Сохранить меню
      </Button>
      <Button color="warning" onClick={handleClearWeek}>
        Очистить неделю
      </Button>
      <Button color="error" onClick={handleResetAll}>
        Сбросить всё
      </Button>
    </>
  );
};

export default HeaderControls;
