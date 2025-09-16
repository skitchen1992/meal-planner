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
    } catch (error) {
      console.warn('Persist settings failed', error);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.WEEK, JSON.stringify(week));
    } catch (error) {
      console.warn('Persist week failed', error);
    }
  }, [week]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.DISHES, JSON.stringify(dishes));
    } catch (error) {
      console.warn('Persist dishes failed', error);
    }
  }, [dishes]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.FILTER, JSON.stringify(filterDays));
    } catch (error) {
      console.warn('Persist filterDays failed', error);
    }
  }, [filterDays]);
}
