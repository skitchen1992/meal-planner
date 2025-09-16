import { Button, Stack, Typography, Paper } from '@mui/material';

import { useShoppingList } from '../hooks/useShoppingList';

// Replaced custom Card/MutedTextSmall with MUI Paper/Typo

function ShoppingList() {
  const { rows, summary, copyText } = useShoppingList();

  const handleCopy = async () => {
    if (!rows.length) {
      return;
    }
    try {
      await navigator.clipboard.writeText(copyText);
    } catch (error) {
      console.warn('Clipboard write failed', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">🛒 Список покупок (по выбранным дням)</Typography>
        <Button onClick={handleCopy}>Копировать</Button>
      </Stack>
      <div style={{ marginTop: 8 }}>
        {!rows.length ? (
          <Typography color="text.secondary">
            Выберите блюда — список покупок появится здесь.
          </Typography>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {rows.map((r) => (
              <li key={`${r.name}|${r.unit}`}>
                {`${r.name} — ${r.qty % 1 === 0 ? r.qty : r.qty.toFixed(2)} ${r.unit || ''}`.trim()}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {summary}
      </Typography>
    </Paper>
  );
}

export default ShoppingList;
