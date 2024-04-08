import React, { useState } from 'react';
import Text from '../../components/Custom/Typography';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import TaskFormModal from './TaskFormModal';
import classes from './style.module.css';

const currentDay: string = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
});

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [mainTask, setMainTask] = useState<
    { title: string; desc: string; dateTime: string; deadline: string }[]
  >([]);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setTitleError(false);
    setDesc('');
    setTitle('');
    setEditingTaskIndex(null);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) {
      setTitleError(true);
      return;
    }

    const dateTime: string = format(new Date(), 'dd MMM, yyyy hh:mm:ss a');
    const deadline: string = date
      ? format(date.toDate(), 'dd MMM, yyyy hh:mm a')
      : '';

    if (editingTaskIndex !== null) {
      // Editing an existing task
      const updatedMainTask = [...mainTask];
      updatedMainTask[editingTaskIndex] = { title, desc, dateTime, deadline };
      setMainTask(updatedMainTask);
      setEditingTaskIndex(null); // Reset editingTaskIndex
    } else {
      // Adding a new task
      setMainTask([...mainTask, { title, desc, dateTime, deadline }]);
    }

    setDesc('');
    setTitle('');
    setIsModalOpen(false);
    setTitleError(false);
  };

  const deleteHandler = (indexToDelete: number) => {
    const updatedTasks = mainTask.filter((_, index) => index !== indexToDelete);
    setMainTask(updatedTasks);
  };
  const editHandler = (index: number) => {
    const taskToEdit = mainTask[index];
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.desc);
    setDate(dayjs(taskToEdit.deadline));
    setEditingTaskIndex(index);
    openModalHandler();
  };

  return (
    <div className={classes.head}>
      <div>
        <Text variant="h3" className={classes.heading}>
          Welcome to the Productivity App
        </Text>
        <Text variant="h5" className={classes.tagline}>
          Lets get Productive today - {currentDay}
        </Text>
      </div>
      <div style={{ position: 'relative' }}>
        <TaskFormModal
          isModalOpen={isModalOpen}
          closeModalHandler={closeModalHandler}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          date={date}
          setDate={setDate}
          submitHandler={submitHandler}
          titleError={titleError}
          editingTaskIndex={editingTaskIndex}
        />

        {mainTask.length > 0 ? (
          <div className={classes.tasksrender}>
            {mainTask.map((t, i) => (
              <li key={i} className={classes.taskList}>
                <div className={classes.task}>
                  <div className={classes.taskContainer}>
                    <Text variant="h5" className={classes.taskTitle}>
                      {t.title}
                    </Text>
                    <div className="taskButtons">
                      <IconButton
                        onClick={() => {
                          editHandler(i);
                        }}
                        className={classes.editButton}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deleteHandler(i);
                        }}
                        className={classes.deleteButton}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>

                  <Text variant="body1" className={classes.taskDesc}>
                    {t.desc}
                  </Text>
                  <div className={classes.dateContainer}>
                    <Text variant="body1" fontWeight={600}>
                      Due by : {t.deadline}
                    </Text>
                    <Text
                      variant="caption"
                      fontWeight={500}
                      sx={{ mt: '0.35rem', color: 'grey', fontSize: '10px' }}
                    >
                      Last updated : {t.dateTime}
                    </Text>
                  </div>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <Text className={classes.notaskText} variant="h4" fontWeight={'bold'}>
            No Tasks to Display
          </Text>
        )}

        {mainTask.length > 0 ? (
          <Button
            onClick={openModalHandler}
            variant="outlined"
            className={classes.plusButton}
          >
            <AddIcon />
          </Button>
        ) : (
          <Button
            onClick={openModalHandler}
            variant="outlined"
            className={classes.modalOpenButton}
          >
            Add Task <AddIcon className={classes.plusIcon} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
