import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import TaskFormModal from './home/TaskFormModal';

function RootLayout() {
  return (
    <Fragment>
      <Navbar />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </main>
      <TaskFormModal />
    </Fragment>
  );
}

export default RootLayout;
