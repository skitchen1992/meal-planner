import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App.tsx';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { theme } from './theme';

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <InitColorSchemeScript defaultMode="system" />
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);

// Expose store for export/import snapshotting (UI uses it; not for production)
(window as any).store = store;
