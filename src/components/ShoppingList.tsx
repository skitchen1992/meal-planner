import { Button, Stack, Typography } from '@mui/material'
import { Card, MutedTextSmall } from './ui/designSystem'
import { useShoppingList } from '../hooks/useShoppingList'

function ShoppingList() {
  const { rows, summary, copyText } = useShoppingList()

  const handleCopy = async () => {
    if (!rows.length) return
    try {
      await navigator.clipboard.writeText(copyText)
    } catch {}
  }

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">🛒 Список покупок (по выбранным дням)</Typography>
        <Button onClick={handleCopy}>Копировать</Button>
      </Stack>
      <div style={{ marginTop: 8 }}>
        {!rows.length ? (
          <Typography color="text.secondary">Выберите блюда — список покупок появится здесь.</Typography>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {rows.map((r) => (
              <li key={`${r.name}|${r.unit}`}>{`${r.name} — ${r.qty % 1 === 0 ? r.qty : r.qty.toFixed(2)} ${
                r.unit || ''
              }`.trim()}</li>
            ))}
          </ul>
        )}
      </div>
      <MutedTextSmall sx={{ marginTop: 1 }}>{summary}</MutedTextSmall>
    </Card>
  )
}

export default ShoppingList


