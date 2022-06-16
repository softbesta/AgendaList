import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';

import { ROUTES } from '../config/constants';

const AppRoutes = () => {
  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes;