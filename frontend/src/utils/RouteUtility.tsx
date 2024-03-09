import { RouteObject } from 'react-router';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from '../components/MainLayout';

export const wrapRoutes = (routes: RouteObject[]): RouteObject[] => {
  const wrappedRoutes = routes.map((route) => {
    const { children, element } = route;

    const wrappedChildrenIfAny = children ? wrapRoutes(children) : children;

    return {
      ...route,
      element: (
        <MainLayout>
          <ErrorBoundary fallback={<h1>{'Error detected!'}</h1>}>
            {element}
          </ErrorBoundary>
        </MainLayout>
      ),
      children: wrappedChildrenIfAny,
    } as RouteObject;
  });
  return wrappedRoutes;
};
