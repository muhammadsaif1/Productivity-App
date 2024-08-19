import React from 'react';
import { Typography, Box } from '@mui/material';

interface ErrorComponentProps {
  message: string;
  retry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, retry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        Error: {message}
      </Typography>
      {retry && <button onClick={retry}>Retry</button>}
    </Box>
  );
};

export default ErrorComponent;
