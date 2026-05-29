import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from  './App'
import  {VisitorProvider} from './context/VisitorContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VisitorProvider>
      <App />
    </VisitorProvider>
  </StrictMode>,
)
