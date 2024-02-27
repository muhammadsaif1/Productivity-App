import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/index';
import AboutUs from './pages/about-us/index';
import Stats from './pages/stats/index';
import Calender from './pages/calender/index';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'stats', element: <Stats /> },
      { path: 'calendar', element: <Calender /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
