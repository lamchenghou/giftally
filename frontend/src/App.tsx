import './App.css';
import { ALL_ROUTES } from './routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { wrapRoutes } from './utils/RouteUtility';
import { ConfigProvider } from 'antd';
import { APP_THEME } from './utils/theme';

function App() {
  // TODO: layout antd
  const wrappedRoutes = wrapRoutes(ALL_ROUTES);
  const router = createBrowserRouter(wrappedRoutes);

  return (
    <ConfigProvider theme={APP_THEME}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
