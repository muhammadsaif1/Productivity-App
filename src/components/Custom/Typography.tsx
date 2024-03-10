import React, { ReactNode } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface CustomTypographyProps extends TypographyProps {
  children: ReactNode;
}
const Text: React.FC<CustomTypographyProps> = ({ children, ...props }) => {
  return (
    <Typography
      style={{
        fontFamily: '"Epilogue", sans-serif',
        color: '#06002A',
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};
export default Text;
