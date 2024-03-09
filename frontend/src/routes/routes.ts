import { RouteObject } from 'react-router';
import { DASHBOARD_ROUTES } from './DashboardRoutes';
import { MISC_ROUTES } from './MiscRoutes';

export const ALL_ROUTES: RouteObject[] = [...DASHBOARD_ROUTES, ...MISC_ROUTES];
