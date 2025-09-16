import { createTheme } from '@mui/material/styles'

// Design tokens extracted from meal-planner.html
// Base dark palette
const darkTokens = {
  background: '#0f172a', // page background
  surface: '#111827', // card
  muted: '#1f2937', // muted surface
  border: '#374151', // borders
  text: '#e5e7eb', // primary text
  subtext: '#9ca3af', // secondary text
  primary: '#22c55e', // accent / primary
  error: '#ef4444', // bad
  warning: '#f59e0b', // warn
  success: '#22c55e', // good
}

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      // For now mirror dark tokens but slightly adjusted via MUI; we focus on dark first
      palette: {
        mode: 'light',
        primary: { main: darkTokens.primary },
        secondary: { main: '#0ea5e9' },
        error: { main: darkTokens.error },
        warning: { main: darkTokens.warning },
        success: { main: darkTokens.success },
        background: {
          default: '#ffffff',
          paper: '#f8fafc',
        },
        text: {
          primary: '#0b1226',
          secondary: '#334155',
        },
        divider: '#e5e7eb',
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: { main: darkTokens.primary },
        secondary: { main: '#0ea5e9' },
        error: { main: darkTokens.error },
        warning: { main: darkTokens.warning },
        success: { main: darkTokens.success },
        background: {
          default: darkTokens.background,
          paper: darkTokens.surface,
        },
        text: {
          primary: darkTokens.text,
          secondary: darkTokens.subtext,
        },
        divider: darkTokens.border,
      },
    },
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Inter',
      'sans-serif',
    ].join(', '),
    h1: { fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 },
    h2: { fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.25 },
    h3: { fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.3 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '.875rem', lineHeight: 1.45 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'saturate(140%) blur(8px)',
          boxShadow: '0 8px 28px rgba(0,0,0,.35)',
          borderRadius: 14,
          border: '1px solid var(--mui-palette-divider)',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 700,
          textTransform: 'none',
          paddingInline: 14,
          paddingBlock: 10,
          transition: 'transform .04s ease, opacity .2s ease',
          '&:hover': { transform: 'translateY(-1px)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          background: 'var(--mui-palette-background-paper)',
        },
        notchedOutline: {
          borderColor: 'var(--mui-palette-divider)',
        },
      },
    },
  },
})


