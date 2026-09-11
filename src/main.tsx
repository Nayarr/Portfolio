import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Providers } from '@/app/Providers';
import { Deck } from '@/app/Deck';

import '@/styles/fonts.css';
import '@/styles/tokens.css';
import '@/styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Deck />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
