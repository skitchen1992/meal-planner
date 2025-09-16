import { Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LS_KEYS } from '../constants/planner';
import { setFilterDays } from '../features/filter/filterSlice';
import { setPeople, setServingsPerPerson } from '../features/settings/settingsSlice';
import { resetWeek, setWeek } from '../features/week/weekSlice';
import type { WeekState } from '../features/week/weekSlice';

import { GhostButton, Tag, Pill } from './ui/designSystem';


function Header() {
  const dispatch = useAppDispatch();
  const people = useAppSelector((s) => s.settings.people);
  const servingsPerPerson = useAppSelector((s) => s.settings.servingsPerPerson);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [snack, setSnack] = useState<string | null>(null);

  const notify = (msg: string) => setSnack(msg);

  const handleSave = () => {
    const settings = { people, servingsPerPerson };
    try {
      localStorage.setItem(LS_KEYS.SETTINGS, JSON.stringify(settings));
      const weekRaw = JSON.stringify((window as any).store?.getState?.().week);
      if (weekRaw) localStorage.setItem(LS_KEYS.WEEK, weekRaw);
      const dishesRaw = JSON.stringify((window as any).store?.getState?.().dishes);
      if (dishesRaw) localStorage.setItem(LS_KEYS.DISHES, dishesRaw);
    } catch {}
    notify('Меню сохранено ✅');
  };

  const handleResetAll = () => {
    if (!confirm('Полный сброс данных (меню, блюда, настройки)?')) return;
    try {
      localStorage.removeItem(LS_KEYS.WEEK);
      localStorage.removeItem(LS_KEYS.DISHES);
      localStorage.removeItem(LS_KEYS.SETTINGS);
      localStorage.removeItem(LS_KEYS.FILTER);
    } catch {}
    dispatch(setPeople(2));
    dispatch(setServingsPerPerson(1));
    dispatch(resetWeek());
    notify('Сброшено ✅');
  };

  const handlePrint = () => window.print();

  const handleExport = () => {
    const state = (window as any).store?.getState?.();
    const data = {
      version: 2,
      settings: { people, servingsPerPerson },
      week: state?.week,
      dishes: state?.dishes,
      filterDays: state?.filterDays,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'meal-planner-export.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleTriggerImport = () => fileInputRef.current?.click();

  const handleImport: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (data?.settings) {
          if (typeof data.settings.people === 'number') dispatch(setPeople(data.settings.people));
          if (typeof data.settings.servingsPerPerson === 'number')
            dispatch(setServingsPerPerson(data.settings.servingsPerPerson));
        }
        if (data?.week) dispatch(setWeek(data.week as WeekState));
        if (Array.isArray(data?.filterDays)) dispatch(setFilterDays(data.filterDays));
        notify('Данные импортированы ✅');
      } catch (err) {
        alert('Ошибка импорта');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" component="h1" sx={{ m: 0 }}>
          Планировщик меню на неделю
        </Typography>
        <Tag>
          <Typography component="span" color="text.secondary" fontWeight={600} sx={{ mr: 0.5 }}>
            Баз. порций на приём:
          </Typography>
          <Pill id="serv-pill">{people * servingsPerPerson}</Pill>
        </Tag>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Typography component="label" htmlFor="servings" color="text.secondary" fontWeight={600}>
          Порций на человека:
        </Typography>
        <TextField
          id="servings"
          type="number"
          value={servingsPerPerson}
          onChange={(e) =>
            dispatch(
              setServingsPerPerson(
                Math.max(1, Math.min(8, Math.trunc(Number(e.target.value) || 1))),
              ),
            )
          }
          inputProps={{ min: 1, step: 1, 'aria-label': 'servings per person' }}
          sx={{ maxWidth: 110 }}
        />
        <Typography component="label" htmlFor="people" color="text.secondary" fontWeight={600}>
          Людей:
        </Typography>
        <TextField
          id="people"
          type="number"
          value={people}
          onChange={(e) =>
            dispatch(setPeople(Math.max(1, Math.min(32, Math.trunc(Number(e.target.value) || 1)))))
          }
          inputProps={{ min: 1, step: 1, 'aria-label': 'people' }}
          sx={{ maxWidth: 110 }}
        />
        <Button variant="contained" onClick={handleSave}>
          Сохранить меню
        </Button>
        <Button color="warning" onClick={() => dispatch(resetWeek())}>
          Очистить неделю
        </Button>
        <Button color="error" onClick={handleResetAll}>
          Сбросить всё
        </Button>
        <GhostButton onClick={handlePrint}>Печать</GhostButton>
        <GhostButton onClick={handleExport}>Экспорт JSON</GhostButton>
        <GhostButton onClick={handleTriggerImport}>Импорт JSON</GhostButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
      </Stack>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={1500}
        onClose={() => setSnack(null)}
        message={snack || ''}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Stack>
  );
}

export default Header;
