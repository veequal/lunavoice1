import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.jsx'
import { ThemeProvider } from './app/providers.jsx'
import { FavoritesProvider } from './context/FavoritesProvider.jsx'
import { SubscriptionProvider } from './context/SubscriptionProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>
          <SubscriptionProvider>
            <App />
          </SubscriptionProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
