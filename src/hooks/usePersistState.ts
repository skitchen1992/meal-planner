import { useEffect } from 'react';

import { useAppSelector } from '../app/hooks';
import { LS_KEYS } from '../constants/planner';

// Persists core slices to localStorage when they change
export function usePersistState() {
  const settings = useAppSelector((s) => s.settings);
  const week = useAppSelector((s) => s.week);
  const dishes = useAppSelector((s) => s.dishes);
  const filterDays = useAppSelector((s) => s.filterDays);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.WEEK, JSON.stringify(week));
    } catch {}
  }, [week]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.DISHES, JSON.stringify(dishes));
    } catch {}
  }, [dishes]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.FILTER, JSON.stringify(filterDays));
    } catch {}
  }, [filterDays]);
}
