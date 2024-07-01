import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import TaskFormModal from './home/TaskFormModal';
import ConfirmDelete from '../components/Custom/ConfirmDelete';

function RootLayout() {
  return (
    <Fragment>
      <Navbar />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </main>
      <ConfirmDelete />
      <TaskFormModal />
    </Fragment>
  );
}

export default RootLayout;
