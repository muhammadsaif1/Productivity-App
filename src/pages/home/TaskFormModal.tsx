import React, { useContext } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button, CircularProgress } from '@mui/material';
import classes from './style.module.css';
import { TaskContext } from '../../context/TaskContext';

const TaskFormModal: React.FC = () => {
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
  const {
    isModalOpen,
    closeModalHandler,
    submitHandler,
    title,
    setTitle,
    titleError,
    desc,
    setDesc,
    descriptionError,
    date,
    setDate,
    editingTaskIndex,
    addingTask,
  } = useContext(TaskContext);
  return (
    <Modal open={isModalOpen} onClose={closeModalHandler}>
      <Box sx={modalStyle}>
        <form onSubmit={submitHandler}>
          <label>Title </label>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
            margin="normal"
            error={titleError}
            helperText={titleError ? '*Title is required' : ''}
          />

          <label>Description </label>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
            margin="normal"
            error={descriptionError}
            helperText={descriptionError ? '*Description is required' : ''}
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
            {editingTaskIndex !== null ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={addingTask}
              >
                {addingTask ? <CircularProgress size={20} /> : 'Update'}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={addingTask}
              >
                {addingTask ? <CircularProgress size={20} /> : 'Add Task'}
              </Button>
            )}
            <Button
              onClick={closeModalHandler}
              variant="contained"
              color="inherit"
              sx={{ bgcolor: 'white', color: 'black' }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskFormModal;
