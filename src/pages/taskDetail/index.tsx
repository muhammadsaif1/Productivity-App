import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, IconButton } from '@mui/material';
import Text from '../../components/Custom/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import classes from './style.module.css';

interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  deadline: string;
}

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Task }>(
          `https://saif-project-27e9eb091b33.herokuapp.com/api/fetchTask/${taskId}`,
        );
        if (response.data.success) {
          console.log('Task fetched successfully:', response.data.data);
          setTask(response.data.data);
        } else {
          console.error('Task not found in response:', response);
          setError('Task not found');
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError('Error fetching task details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, []);

  const deleteHandler = async () => {
    if (!taskId) {
      console.error('Task ID is missing for the task to be deleted.');
      return;
    }
    try {
      const response = await axios.delete(
        `https://saif-project-27e9eb091b33.herokuapp.com/api/deleteTask/${taskId}`,
      );
      if (response.data.success) {
        navigate('/');
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

  const editHandler = () => {
    if (!task) {
      console.error('Task to edit is not found.');
      return;
    }
    navigate('/', {
      state: {
        taskToEdit: task,
      },
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Text variant="h4">{error}</Text>;
  }

  if (!task) {
    return <Text variant="h4">Task not found</Text>;
  }

  return (
    <div className={classes.container}>
      <Text variant="h3" className={classes.title}>
        {task.title}
      </Text>
      <Text variant="body1" className={classes.description}>
        {task.description}
      </Text>
      <Text variant="body2" className={classes.deadline}>
        Due by: {format(parseISO(task.deadline), 'dd MMM, yyyy hh:mm a')}
      </Text>
      <Text variant="caption" className={classes.updated}>
        Updated by: {format(parseISO(task.createdAt), 'dd MMM, yyyy hh:mm a')}
      </Text>
      <div className={classes.actions}>
        <IconButton onClick={editHandler} className={classes.editButton}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={deleteHandler} className={classes.deleteButton}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskDetail;
