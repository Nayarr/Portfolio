import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Providers } from '@/app/Providers';
import { ScrollExperience } from '@/app/ScrollExperience';

import '@/styles/tokens.css';
import '@/styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollExperience />,
  },
  {
    path: '/explore',
    // Mode exploration 3D : charge en lazy, hors du bundle principal.
    lazy: async () => {
      const { ExploreRoom } = await import('@/app/ExploreRoom');
      return { element: <ExploreRoom /> };
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
