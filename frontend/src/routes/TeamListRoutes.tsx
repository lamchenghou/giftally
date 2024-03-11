import { RouteObject } from 'react-router';
import TeamListPage from '../features/teamList/TeamListPage';

export const TEAM_LIST_ROUTES: RouteObject[] = [
  {
    path: '/team-list',
    element: <TeamListPage />,
  },
];
