import React, { ReactNode } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface CustomTypographyProps extends TypographyProps {
  children: ReactNode;
}
const Text: React.FC<CustomTypographyProps> = ({ children }) => {
  return (
    <Typography
      style={{
        fontFamily: '"Epilogue", sans-serif',
        color: '#01001F',
      }}
    >
      {children}
    </Typography>
  );
};
export default Text;
