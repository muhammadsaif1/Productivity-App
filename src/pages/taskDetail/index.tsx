import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';
import Text from '../../components/Custom/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import classes from './style.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Task, TaskContext } from '../../context/TaskContext';

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mainTask, editHandler, deleteHandler } = useContext(TaskContext);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Task }>(
          `https://saif-project-27e9eb091b33.herokuapp.com/api/fetchTask/${taskId}`,
        );
        if (response.data.success) {
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

    if (taskId) {
      fetchTask();
    } else {
      setError('Task ID is missing');
      setIsLoading(false);
    }
  }, [taskId]);

  const backHandler = () => {
    navigate('/');
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

  const taskIndex = mainTask.findIndex((t) => t._id === taskId);
  if (taskIndex === -1) {
    console.error('Task not found');
    return <Text variant="h4">Task not found</Text>;
  }

  return (
    <div className={classes.container}>
      <Button className={classes.backButton} onClick={backHandler}>
        <ArrowBackIcon color="success" />
      </Button>
      <div className={classes.taskDetails}>
        <div className={classes.header}>
          <Text variant="h3" className={classes.title}>
            {task.title}
          </Text>
          <div className={classes.taskButtons}>
            <Button
              variant="outlined"
              onClick={() => editHandler(taskIndex)}
              startIcon={<EditIcon />}
              className={classes.editButton}
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={() => deleteHandler(taskIndex)}
              startIcon={<DeleteIcon />}
              className={classes.deleteButton}
              size="small"
            >
              Delete
            </Button>
          </div>
        </div>

        <Text variant="h5" className={classes.label}>
          Description:
        </Text>
        <Text variant="h5" className={classes.description}>
          {task.description}
        </Text>
        <Text variant="body2" className={classes.deadline}>
          <span className={classes.deadlineText}> Due by: </span>{' '}
          {format(parseISO(task.deadline), 'dd MMM, yyyy hh:mm a')}
        </Text>
        <Text variant="caption" className={classes.updated}>
          Last Updated:{' '}
          {format(parseISO(task.createdAt), 'dd MMM, yyyy hh:mm a')}
        </Text>
      </div>
    </div>
  );
};

export default TaskDetail;
