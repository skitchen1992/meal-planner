import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,
  shape: { borderRadius: 12 },
  spacing: 8,
  typography: {
    fontFamily: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'sans-serif'].join(
      ', ',
    ),

    h1: { fontSize: '2rem', fontWeight: 800, lineHeight: 1.25 },
    h2: { fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.25 },
    h3: { fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.25 },
    h4: { fontSize: '1rem', fontWeight: 800, lineHeight: 1.25 },
    h5: { fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.25 },
    h6: { fontSize: '0.75rem', fontWeight: 700, lineHeight: 1.25 },

    subtitle1: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.4 },

    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.4 },

    caption: { fontSize: '0.75rem', lineHeight: 1.3 },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    button: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.25, textTransform: 'none' },
  },

  components: {},
});
