import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/index';
import AboutUs from './pages/about-us/index';
import Stats from './pages/stats/index';
import Calender from './pages/calender/index';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/aboutus', element: <AboutUs /> },
  { path: '/stats', element: <Stats /> },
  { path: '/calender', element: <Calender /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
