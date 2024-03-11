import { RouteObject } from 'react-router';
import { DASHBOARD_ROUTES } from './DashboardRoutes';
import { MISC_ROUTES } from './MiscRoutes';
import { TEAM_LIST_ROUTES } from './TeamListRoutes';

export const ALL_ROUTES: RouteObject[] = [
  ...DASHBOARD_ROUTES,
  ...TEAM_LIST_ROUTES,
  ...MISC_ROUTES,
];
