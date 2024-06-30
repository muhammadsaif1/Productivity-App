import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './pages/Root';
import Home from './pages/home';
import TaskDetail from './pages/taskDetail';
import AboutUs from './pages/about-us';
import Login from './auth/login';
import Signup from './auth/signup';
import TaskProvider from './context/TaskContext';

const App = () => {
  return (
    <>
      <Router>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="task/:taskId" element={<TaskDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </TaskProvider>
      </Router>
    </>
  );
};

export default App;
