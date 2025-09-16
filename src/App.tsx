import { Container, Stack } from '@mui/material';

import DishesTable from './components/DishesTable/DishesTable';
import FilterBar from './components/FilterBar/FilterBar';
import GlobalModals from './components/GlobalModals';
import GlobalSnackbar from './components/GlobalSnackbar';
import Header from './components/Header/Header';
import Planner from './components/Planner/Planner';
import ShoppingList from './components/ShoppingList/ShoppingList';
import { usePersistState } from './hooks/usePersistState';

function App() {
  usePersistState();

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} mt={4}>
        <Header />
        <Planner />
        <FilterBar />
        <ShoppingList />
        <DishesTable />
        <GlobalSnackbar />
        <GlobalModals />
      </Stack>
    </Container>
  );
}

export default App;
