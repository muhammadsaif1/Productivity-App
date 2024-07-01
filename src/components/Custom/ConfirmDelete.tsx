import React, { useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  styled,
  CircularProgress,
} from '@mui/material';
import { TaskContext } from '../../context/TaskContext';

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    background: '#ffffff',
    borderRadius: '15px',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({
  color: '#000000',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
}));

const StyledDialogContentText = styled(DialogContentText)(() => ({
  color: '#000000',
  textAlign: 'center',
  fontSize: '1.2rem',
}));

const StyledButton = styled(Button)(() => ({
  fontWeight: 'bold',
  color: '#000000',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: '#C3C3C3',
  },
}));

const ConfirmDelete: React.FC = () => {
  const { isDialogOpen, confirmDeleteHandler, isDeleting, closeDialog } =
    useContext(TaskContext);

  return (
    <StyledDialog open={isDialogOpen} onClose={closeDialog}>
      <StyledDialogTitle>Confirm Deletion</StyledDialogTitle>
      <DialogContent>
        <StyledDialogContentText>
          Are you sure you want to delete this task?
        </StyledDialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledButton variant="outlined" onClick={closeDialog} color="primary">
          No
        </StyledButton>
        <StyledButton onClick={confirmDeleteHandler} color="primary" autoFocus>
          {isDeleting ? <CircularProgress size={24} color="inherit" /> : 'Yes'}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ConfirmDelete;
