import { RouteObject } from 'react-router';
import NotFoundPage from '../components/NotFoundPage';

export const MISC_ROUTES: RouteObject[] = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
