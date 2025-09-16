import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from '@mui/material'
import { theme } from './theme'

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <StrictMode>
    {getInitColorSchemeScript()}
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </CssVarsProvider>
  </StrictMode>,
)

// Expose store for export/import snapshotting (UI uses it; not for production)
;(window as any).store = store
