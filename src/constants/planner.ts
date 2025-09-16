export const DAYS = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export const MEALS = ['Завтрак', 'Обед', 'Ужин'] as const;
export type MealType = (typeof MEALS)[number];

export const MEAL_TYPES = ['Любое', ...MEALS] as const;
export type MealFilterType = (typeof MEAL_TYPES)[number];

export const LS_KEYS = {
  DISHES: 'mealPlanner.dishes.v2',
  WEEK: 'mealPlanner.week.v2',
  SETTINGS: 'mealPlanner.settings.v1',
  FILTER: 'mealPlanner.filterDays.v1',
} as const;
