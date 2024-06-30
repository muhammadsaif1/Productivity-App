import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import TaskProvider from './context/TaskContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <TaskProvider> */}
    <App />
    {/* </TaskProvider> */}
  </React.StrictMode>,
);
