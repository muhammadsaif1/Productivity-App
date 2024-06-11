import React, { useState, useEffect } from 'react';
import Text from '../../components/Custom/Typography';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import dayjs from 'dayjs';
import TaskFormModal from './TaskFormModal';
import classes from './style.module.css';
import axios, { AxiosError } from 'axios';

const currentDay: string = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
});

interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  deadline: string;
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Task[] }>(
          'https://saif-project-27e9eb091b33.herokuapp.com/api/fetchTasks',
        );
        if (response.data.success) {
          const data = response.data.data.map((item) => ({
            title: item.title,
            description: item.description,
            _id: item._id,
            createdAt: item.createdAt,
            deadline: item.deadline,
          }));
          setMainTask(data);
        } else {
          console.error('Failed to fetch tasks:', response.data);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error(
          'Error fetching tasks:',
          error.message,
          error.response?.data,
        );
      }
    };

    fetchTasks();
    console.log(mainTask);
  }, []);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setTitleError(false);
    setDescriptionError(false);
    setDesc('');
    setTitle('');
    setEditingTaskIndex(null);
    setDate(dayjs());
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 1 || !title.length) {
      setTitleError(true);
      return;
    }
    if (desc.length < 1 || !desc.length) {
      setDescriptionError(true);
      return;
    }

    const deadline: string = date
      ? format(date.toDate(), 'dd MMM, yyyy hh:mm a')
      : '';

    const taskPayload = { title, description: desc, deadline };

    try {
      const response = await axios.post(
        'https://saif-project-27e9eb091b33.herokuapp.com/api/createTask',
        taskPayload,
      );

      if (response.data.success) {
        const updatedTask: Task = response.data.data;
        let updatedMainTask = [...mainTask];
        updatedMainTask = [...mainTask, updatedTask];
        setMainTask(updatedMainTask);
      } else {
        console.error('Failed to create task:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating task:', error.message);
        console.log('Error response:', error.response);
        console.log('Error response data:', error.response?.data);
      } else {
        console.error('Non-Axios error occurred:', error);
      }
    }

    closeModalHandler();
  };

  const deleteHandler = async (indexToDelete: number) => {
    const taskId = mainTask[indexToDelete]?._id;
    if (!taskId) {
      console.error('Task ID is missing for the task to be deleted.');
      return;
    }
    try {
      console.log('Deleting task...');
      console.log('Deleting task id', taskId);

      const response = await axios.delete(
        `https://saif-project-27e9eb091b33.herokuapp.com/api/deleteTask/${taskId}`,
      );
      if (response.data.success) {
        const updatedTasks = mainTask.filter(
          (_, index) => index !== indexToDelete,
        );
        setMainTask(updatedTasks);
      } else {
        console.error('Failed to delete task:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error deleting task:', error.message);
        console.log('Error response:', error.response);
        console.log('Error response data:', error.response?.data);
      } else {
        console.error('Non-Axios error occurred:', error);
      }
    }
  };

  const editHandler = (index: number) => {
    const taskToEdit = mainTask[index];
    if (!taskToEdit) {
      console.error('Task to edit is not found.');
      return;
    }
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.description);
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
          descriptionError={descriptionError}
          editingTaskIndex={editingTaskIndex}
        />

        {mainTask && mainTask.length > 0 ? (
          <div className={classes.tasksrender}>
            {mainTask.map((t, i) => {
              return (
                <li key={t?._id ?? i} className={classes.taskList}>
                  {t ? (
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
                        {t.description}
                      </Text>
                      <div className={classes.dateContainer}>
                        <Text variant="body1" fontWeight={600}>
                          Due by: {format(t.deadline, 'dd MMM, yyyy hh:mm a')}
                        </Text>
                        <Text
                          variant="caption"
                          fontWeight={500}
                          sx={{
                            mt: '0.35rem',
                            color: 'grey',
                            fontSize: '10px',
                          }}
                        >
                          Updated by:{' '}
                          {format(
                            parseISO(t.createdAt),
                            'dd MMM, yyyy hh:mm a',
                          )}
                        </Text>
                      </div>
                    </div>
                  ) : (
                    <Text
                      className={classes.notaskText}
                      variant="body1"
                      color="error"
                    >
                      Error: Task data is missing.
                    </Text>
                  )}
                </li>
              );
            })}
          </div>
        ) : (
          <Text className={classes.notaskText} variant="h4" fontWeight={'bold'}>
            No Tasks to Display
          </Text>
        )}

        <Button
          onClick={openModalHandler}
          variant="outlined"
          className={
            mainTask.length > 0 ? classes.plusButton : classes.modalOpenButton
          }
        >
          Add Task <AddIcon />
        </Button>
      </div>
    </div>
  );
};

export default Home;
