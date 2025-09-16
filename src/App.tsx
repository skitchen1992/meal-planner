import { Button, Container, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'
import './App.css'
import { useState } from 'react'
import { addMeal, removeMeal } from './features/meals/mealsSlice'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Header from './components/Header'
import Planner from './components/Planner'
import FilterBar from './components/FilterBar'
import ShoppingList from './components/ShoppingList'
import DishesTable from './components/DishesTable'

function App() {
  const dispatch = useAppDispatch()
  const meals = useAppSelector((state) => state.meals.items)
  const [title, setTitle] = useState('')
  const [calories, setCalories] = useState<number | ''>('')

  const handleAdd = () => {
    if (!title || calories === '' || Number.isNaN(Number(calories))) return
    dispatch(
      addMeal({
        id: crypto.randomUUID(),
        title,
        calories: Number(calories),
      }),
    )
    setTitle('')
    setCalories('')
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={3} mt={4}>
        <Header />
        <Planner />
        <FilterBar />
        <ShoppingList />
        <DishesTable />
        <TextField
          label="Meal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ 'aria-label': 'meal title' }}
        />
        <TextField
          label="Calories"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value === '' ? '' : Number(e.target.value))}
          inputProps={{ 'aria-label': 'meal calories', min: 0 }}
        />
        <Button variant="contained" onClick={handleAdd} aria-label="add meal">
          Add Meal
        </Button>
        <List aria-label="meals list">
          {meals.map((meal) => (
            <ListItem
              key={meal.id}
              secondaryAction={
                <Button color="error" onClick={() => dispatch(removeMeal(meal.id))} aria-label={`remove ${meal.title}`}>
                  Remove
                </Button>
              }
            >
              <ListItemText primary={meal.title} secondary={`${meal.calories} kcal`} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  )
}

export default App
