import Text from '../../components/Custom/Typography';
import { IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import classes from './style.module.css';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const currentDay: string = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  minWidth: 300,
  maxWidth: 400,
  width: '80%',
  borderRadius: 4,
};

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState<
    { title: string; desc: string; dateTime: string; deadline: string }[]
  >([]);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const openModalHandler = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'enabled';
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setTitleError(false);
    document.body.classList.remove('modal-open');
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length == 0) {
      setTitleError(true);
      return;
    }
    const dateTime: string = format(new Date(), 'dd-MMM-yyyy hh:mm:ss a');
    const deadline: string = date
      ? format(date.toDate(), 'dd MMM, yyyy hh:mm a')
      : '';

    setMainTask([...mainTask, { title, desc, dateTime, deadline }]);
    setDesc('');
    setTitle('');
    setIsModalOpen(false);
    setTitleError(false);
  };
  const deleteHandler = (indexToDelete: number) => {
    const updatedTasks = mainTask.filter((_, index) => index !== indexToDelete);
    setMainTask(updatedTasks);
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
                      <IconButton className={classes.editButton} size="small">
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
                    <Text
                      variant="caption"
                      fontWeight={500}
                      style={{ color: 'grey' }}
                    >
                      Updated by - {t.dateTime}
                    </Text>
                    <Text variant="body1" fontWeight={600}>
                      Due by - {t.deadline}
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
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={closeModalHandler}>
          <Box sx={modalStyle}>
            <form onSubmit={submitHandler}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError(false);
                }}
                fullWidth
                margin="normal"
                error={titleError}
                helperText={titleError ? '*Title is required' : ''}
              />
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                fullWidth
                margin="normal"
              />
              <div className={classes.dateContainer}>
                <label>Due by </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={date}
                    onChange={(newDate) => setDate(newDate || null)}
                  />
                </LocalizationProvider>
              </div>

              <div className={classes.modalButtons}>
                <Button type="submit" variant="contained" color="success">
                  Add Task
                </Button>
                <Button
                  onClick={closeModalHandler}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Home;
