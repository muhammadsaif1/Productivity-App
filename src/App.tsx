import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './pages/Root';
import Home from './pages/home';
import TaskDetail from './pages/taskDetail';
import Login from './pages/login';
import Signup from './pages/signup';
import TaskProvider from './context/TaskContext';
import AuthProvider from './context/AuthContext';

import { PrivateRoute } from './components/Custom/PrivateRoute';
import AboutMe from './pages/about-me';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route
                index
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="about-me" element={<AboutMe />} />
              <Route
                path="task/:taskId"
                element={
                  <PrivateRoute>
                    <TaskDetail />
                  </PrivateRoute>
                }
              />
              <Route path="signin" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
