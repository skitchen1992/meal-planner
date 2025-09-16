import { useMemo } from 'react'
import { useAppSelector } from '../app/hooks'
import { DAYS } from '../constants/planner'

type Row = { name: string; qty: number; unit: string }

function roundSmart(x: number) {
  return Math.round(x * 100) / 100
}

function fmtQty(q: number) {
  return q % 1 === 0 ? q.toString() : q.toFixed(2).replace(/\.00$/, '')
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

export function useShoppingList() {
  const people = useAppSelector((s) => s.settings.people)
  const servPer = useAppSelector((s) => s.settings.servingsPerPerson)
  const week = useAppSelector((s) => s.week)
  const dishes = useAppSelector((s) => s.dishes)
  const filterDays = useAppSelector((s) => s.filterDays)

  const list = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const day of DAYS) {
      if (!filterDays.includes(day)) continue
      for (const meal of Object.keys(week[day])) {
        const entry = week[day][meal]
        const dishName = entry.dish
        const cellQty = entry.qty ?? 1
        if (!dishName) continue
        const dish = dishes.find((d) => d.name === dishName)
        if (!dish) continue
        dish.ingredients.forEach((ing) => {
          const key = `${ing.n.trim().toLowerCase()}|${ing.u || ''}`
          const add = (Number(ing.q) || 0) * people * servPer * (Number(cellQty) || 1)
          counts[key] = (counts[key] || 0) + add
        })
      }
    }
    const rows: Row[] = Object.entries(counts)
      .map(([key, qty]) => {
        const [name, unit] = key.split('|')
        return { name: capitalize(name), qty: roundSmart(qty), unit }
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
    return { rows, total: rows.length }
  }, [people, servPer, week, dishes, filterDays])

  return {
    rows: list.rows,
    total: list.total,
    summary: `Покупок: ${list.total}. Дни: ${filterDays.join(', ')}. Баз. порций на приём: ${people * servPer}.`,
    copyText: list.rows.map((r) => `- ${r.name} — ${fmtQty(r.qty)} ${r.unit || ''}`.trim()).join('\n'),
  }
}


