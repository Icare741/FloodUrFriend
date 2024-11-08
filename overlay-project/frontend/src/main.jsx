import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Control from './Control'
import Overlay from './Overlay'

const router = createBrowserRouter([
  {
    path: '/control',
    element: <Control />
  },
  {
    path: '/overlay',
    element: <Overlay />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
