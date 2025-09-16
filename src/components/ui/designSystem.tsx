import { Box, Button, Chip as MuiChip, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Card equivalent for .card
export const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 14,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
}));

// Tag container for .tag
export const Tag = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  padding: '6px 10px',
  borderRadius: 999,
}));

// Pill for .pill
export const Pill = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  padding: '2px 8px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
}));

// Chip for .chip
export const Chip = styled(MuiChip)(({ theme }) => ({
  borderRadius: 999,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiChip-label': { paddingInline: 10, paddingBlock: 6 },
}));

// Ghost button equivalent of .ghost
export const GhostButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  textTransform: 'none',
}));

// Grid for planner .grid
export const GridPlanner = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 10,
  gridTemplateColumns: '140px repeat(3, 1fr)',
  [theme.breakpoints.down(900)]: {
    gridTemplateColumns: '110px 1fr',
    '& .cell.meal': { gridColumn: '2 / -1' },
  },
}));

// Cell for .cell
export const Cell = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: 8,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  '&.head': {
    background: 'transparent',
    border: 'none',
    color: theme.palette.text.secondary,
    fontWeight: 800,
  },
  '&.day': {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 700,
  },
  '&.meal': {},
}));

// Meal cell wrapper for .mealCell
export const MealCell = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 78px',
  gap: 8,
  alignItems: 'center',
  [theme.breakpoints.down(900)]: {
    gridTemplateColumns: '1fr',
  },
}));

// Quantity wrapper for .qtyWrap
export const QtyWrap = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 6,
  alignItems: 'center',
  '& .lbl': {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  '& input': {
    maxWidth: 68,
    textAlign: 'center',
  },
}));

// Muted small text for .muted.small
export const MutedTextSmall = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
}));
