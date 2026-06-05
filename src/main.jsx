import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SettingsProvider } from './contexts/SettingsContext'
import { UserProvider } from './contexts/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SettingsProvider>
  </StrictMode>,
)
