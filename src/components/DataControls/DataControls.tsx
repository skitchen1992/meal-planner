import { Button, Grid } from '@mui/material';
import React, { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFilterDays } from '../../features/filter/filterSlice';
import { setPeople, setServingsPerPerson } from '../../features/settings/settingsSlice';
import { showSnackbar } from '../../features/ui/uiSlice';
import { setWeek } from '../../features/week/weekSlice';

import selector from './selector';

const DataControls: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const { people, servingsPerPerson, week, dishes, filterDays } = useAppSelector(selector);

  const handleTriggerImport = () => fileInputRef.current?.click();

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const data = {
      version: 2,
      settings: { people, servingsPerPerson },
      week,
      dishes,
      filterDays,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'meal-planner-export.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleImport: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (data?.settings) {
          if (typeof data.settings.people === 'number') {
            dispatch(setPeople(data.settings.people));
          }
          if (typeof data.settings.servingsPerPerson === 'number') {
            dispatch(setServingsPerPerson(data.settings.servingsPerPerson));
          }
        }
        if (data?.week) {
          dispatch(setWeek(data.week));
        }
        if (Array.isArray(data?.filterDays)) {
          dispatch(setFilterDays(data.filterDays));
        }
        dispatch(showSnackbar({ message: 'Данные импортированы ✅' }));
      } catch (error) {
        console.warn('Import JSON failed', error);
        alert('Ошибка импорта');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <Grid container gap={2}>
      <Button variant="outlined" onClick={handlePrint}>
        Печать
      </Button>
      <Button variant="outlined" onClick={handleExport}>
        Экспорт JSON
      </Button>
      <Button variant="outlined" onClick={handleTriggerImport}>
        Импорт JSON
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={handleImport}
      />
    </Grid>
  );
};

export default DataControls;
