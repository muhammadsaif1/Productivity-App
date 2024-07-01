import React, { useContext } from 'react';
import Text from '../../components/Custom/Typography';
import { Button, CircularProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import classes from './style.module.css';
import { NavLink } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const currentDay: string = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
});

const Home: React.FC = () => {
  const { mainTask, deleteHandler, isLoading, editHandler, openModalHandler } =
    useContext(TaskContext);

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
        {isLoading ? (
          <div className="loader">
            <CircularProgress size={80} />
          </div>
        ) : mainTask && mainTask.length > 0 ? (
          <div className={classes.tasksrender}>
            {mainTask.map((t, i) => {
              return (
                <li key={t?._id ?? i} className={classes.taskList}>
                  {t ? (
                    <div className={classes.task}>
                      <div className={classes.taskContainer}>
                        <Text variant="h5" className={classes.taskTitle}>
                          <NavLink
                            className={classes.link}
                            to={`/task/${t._id}`}
                          >
                            {t.title}
                          </NavLink>
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
            No tasks to display
          </Text>
        )}
        {isLoading ? (
          ''
        ) : (
          <Button
            onClick={openModalHandler}
            variant="outlined"
            className={
              mainTask.length > 0 ? classes.plusButton : classes.modalOpenButton
            }
          >
            Add Task <AddIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
