import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Providers } from '@/app/Providers';
import { ScrollExperience } from '@/app/ScrollExperience';

import '@/styles/fonts.css';
import '@/styles/tokens.css';
import '@/styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollExperience />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
