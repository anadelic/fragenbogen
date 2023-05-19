import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './Header';
import HomePage from './HomePage';
import NewIteration from './NewIterations';

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  const BrowserRoutes = () => {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="newIteration" element={<NewIteration />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  };
  return <BrowserRoutes />;
}
