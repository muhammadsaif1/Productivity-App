import Text from '../../components/Custom/Typography';
import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import classes from './style.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ErrorBoundary from '../../components/Error/ErrorBoundary';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const cancelHandler = () => {
    setEmailError(false);
    setPasswordError(false);
    setEmail('');
    setPassword('');
    setIsLoading(false);
    setServerError(null);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://todo-backend-saif.netlify.app/api/signin',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } },
      );
      localStorage.setItem('token', response.data.token);

      cancelHandler();
      navigate('/');
      authContext?.login();

      console.log('Signin successful', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setServerError(
            error.response.data.message ||
              'An error occurred while signing in.',
          );
        } else if (error.request) {
          setServerError(
            'No response from the server. Please try again later.',
          );
        } else {
          setServerError('An unexpected error occurred.');
        }
      } else {
        setServerError('An unexpected error occurred.');
      }
    }

    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <div className={classes.container}>
        <Text
          className={classes.mainText}
          fontSize={'1.75rem'}
          fontWeight={700}
        >
          Sign in to your Account
        </Text>
        <form onSubmit={submitHandler} className={classes.form}>
          <label className={classes.label} htmlFor="email">
            <Text fontWeight={600}>Email</Text>
          </label>
          <TextField
            id="email"
            label="email"
            variant="outlined"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(false);
            }}
            error={emailError}
            helperText={emailError ? '*Email is required' : ''}
          />
          <label className={classes.label} htmlFor="password">
            <Text fontWeight={600}>Password</Text>
          </label>
          <TextField
            id="password"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(false);
            }}
            error={passwordError}
            helperText={passwordError ? '*Password is required' : ''}
          />
          {serverError && (
            <div className={classes.errorContainer}>
              <Text className={classes.errorText} color="error">
                {serverError}
              </Text>
            </div>
          )}
          <div className={classes.buttonContainer}>
            <Button
              size="large"
              onClick={cancelHandler}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="success"
            >
              {!isLoading ? (
                'Sign In'
              ) : (
                <CircularProgress size={16} color="inherit" />
              )}
            </Button>
          </div>
          <Link
            to={'/signup'}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Don’t have an account? Register
          </Link>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default Signin;
