import { RouteObject } from 'react-router';
import RedemptionDashboard from '../features/giftRedemption/RedemptionDashboard';

export const DASHBOARD_ROUTES: RouteObject[] = [
  {
    path: '/redemption-dashboard',
    element: <RedemptionDashboard />,
  },
];
