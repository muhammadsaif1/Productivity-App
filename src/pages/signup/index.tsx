import Text from '../../components/Custom/Typography';
import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import classes from './style.module.css';
import axios from 'axios';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);

  const cancelHandler = () => {
    setConfirmPasswordError(false);
    setEmailError(false);
    setPasswordError(false);
    setUsernameError(false);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoading(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length === 0 || !username.length) {
      setUsernameError(true);
      return;
    }
    if (email.length === 0 || !email.length) {
      setEmailError(true);
      return;
    }
    if (password.length === 0 || !password.length) {
      setPasswordError(true);
      return;
    }
    if (!/^(?=.*[0-9])/.test(password)) {
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
        'https://saif-project-27e9eb091b33.herokuapp.com/api/signup',
        {
          username,
          email,
          password,
        },
      );
      cancelHandler();
      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <>
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
            <Text fontWeight={600}> Password</Text>
            <span>must contain atleast one numer[0-9]</span>
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
          <TextField
            id="changePassword"
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
            helperText={confirmPasswordError ? "Password doesn't match" : ''}
          />
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
        </form>
      </div>
    </>
  );
};

export default Signup;
