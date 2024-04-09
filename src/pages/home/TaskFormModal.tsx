import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button } from '@mui/material';
import dayjs from 'dayjs';
import classes from './style.module.css';

interface TaskFormModalProps {
  isModalOpen: boolean;
  closeModalHandler: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  date: dayjs.Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  titleError: boolean;
  editingTaskIndex: number | null;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isModalOpen,
  closeModalHandler,
  title,
  setTitle,
  desc,
  setDesc,
  date,
  setDate,
  submitHandler,
  titleError,
  editingTaskIndex,
}) => {
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
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Add Task
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