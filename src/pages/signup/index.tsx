import Text from '../../components/Custom/Typography';
import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import classes from './style.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../../components/Error/ErrorBoundary';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const cancelHandler = () => {
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoading(false);
    setServerError(null);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null); // Reset server error on new submission attempt

    if (username.length === 0) {
      setUsernameError(true);
      return;
    }
    if (email.length === 0) {
      setEmailError(true);
      return;
    }
    if (password.length === 0 || !/^(?=.*[0-9])/.test(password)) {
      setPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://productivity-app-backend-rho.vercel.app/api/signup',
        { username, email, password },
      );
      cancelHandler();
      console.log('Registration successful', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setServerError(
            error.response.data.message ||
              'An error occurred during registration.',
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
          Create a new Account
        </Text>
        <form onSubmit={submitHandler} className={classes.form}>
          <label className={classes.label} htmlFor="username">
            <Text fontWeight={600}>Username</Text>
          </label>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            value={username}
            fullWidth
            onChange={(e) => {
              setUsername(e.target.value);
              if (usernameError) setUsernameError(false);
            }}
            error={usernameError}
            helperText={usernameError ? '*Username is required' : ''}
          />
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
            <span>Must contain at least one number [0-9]</span>
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
            helperText={
              passwordError
                ? '*Password is required and must contain at least one number'
                : ''
            }
          />
          <label className={classes.label} htmlFor="confirmPassword">
            <Text fontWeight={600}>Confirm Password</Text>
          </label>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            fullWidth
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) setConfirmPasswordError(false);
            }}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "Passwords don't match" : ''}
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
                'Register'
              ) : (
                <CircularProgress size={16} color="inherit" />
              )}
            </Button>
          </div>
          <Link
            to={'/signin'}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Already have an account? Login here
          </Link>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default Signup;
