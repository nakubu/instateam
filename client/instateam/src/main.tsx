import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import AddMember, { action as addAction } from './routes/add';
import EditMember, {
  action as editAction,
  loader as editLoader,
} from './routes/edit';
import Index from './routes/index';
import Root, { loader as rootLoader } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'add',
            element: <AddMember />,
            action: addAction,
          },
          {
            path: 'members/:id',
            element: <EditMember />,
            loader: editLoader,
            action: editAction,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
