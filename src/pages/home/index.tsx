import Text from '../../components/Custom/Typography';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import classes from './style.module.css';
import React, { useState } from 'react';
import PlusIcon from '../../components/Icons/PlusIcon';
import Modal from '../../components/Modal/Modal';

const Home: React.FC = () => {
  const currentDay: string = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState<{ title: string; desc: string }[]>(
    [],
  );

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setDesc('');
    setTitle('');
    setIsModalOpen(false);
  };
  let renderTask: React.ReactNode = (
    <div className={classes.noTasks}>
      <Text variant="h4">No Tasks to display </Text>
      <Text className={classes.addTask} variant="h5">
        Add a Task{' '}
      </Text>
      <Button
        className={classes.addButton}
        onClick={openModalHandler}
        variant="contained"
        color="primary"
        size="large"
      >
        <PlusIcon />
      </Button>
    </div>
  );

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className={classes.taskList}>
        <div className={classes.task}>
          <Text variant="h5" className={classes.taskTitle}>
            {t.title}
          </Text>
          <Text variant="body1" className={classes.taskDesc}>
            {t.desc}
          </Text>
        </div>
      </li>
    ));
  }
  return (
    <div className={classes.head}>
      <div>
        <Text variant="h2" className={classes.heading}>
          Welcome to the Productivity App
        </Text>
        <Text variant="body1" className={classes.tagline}>
          Lets get Productive today - [{currentDay}]
        </Text>
      </div>
      <div className={classes.noTasks}>{renderTask}</div>
      {isModalOpen && (
        <Modal onClose={closeModalHandler}>
          <form onSubmit={submitHandler} className={classes.form}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Add Task
            </Button>
            <Button
              onClick={closeModalHandler}
              variant="contained"
              color="error"
              size="large"
            >
              Cancel
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Home;

//npm run format
