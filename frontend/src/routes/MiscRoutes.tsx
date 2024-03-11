import { RouteObject } from 'react-router';
import ErrorStatusPage from '../components/ErrorStatusPage';
import HomePage from '../components/Homepage';

export const MISC_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <ErrorStatusPage errorImg="govtech-not-found.png" />,
  },
];
