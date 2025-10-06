import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import StartPage from './pages/StartPage'
import RoundPage from './pages/RoundPage'
import ResultsPage from './pages/ResultsPage'
import ReflectionPage from './pages/ReflectionPage'

const router = createHashRouter([
  { path: '/', element: <StartPage /> },
  { path: '/round', element: <RoundPage /> },
  { path: '/results', element: <ResultsPage /> },
  { path: '/reflect', element: <ReflectionPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
