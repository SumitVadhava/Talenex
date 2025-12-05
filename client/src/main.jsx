import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

createRoot(document.getElementById('root')).render(
    <main>
      <App />
    </main>
)
