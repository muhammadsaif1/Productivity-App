import Text from '../../components/Custom/Typography';
import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import classes from './style.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const cancelHandler = () => {
    setEmailError(false);
    setPasswordError(false);
    setEmail('');
    setPassword('');
    setIsLoading(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length === 0 || !email.length) {
      setEmailError(true);
      return;
    }
    if (password.length === 0 || !password.length) {
      setPasswordError(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://saif-project-27e9eb091b33.herokuapp.com/api/signin',
        {
          email,
          password,
        },
      );
      localStorage.setItem('token', response.data.token);

      cancelHandler();
      navigate('/');
      authContext?.login();

      console.log('Signin successful', response.data);
    } catch (error) {
      console.error('Signin failed', error);
    }
    setIsLoading(false);
  };

  return (
    <>
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
            Dont't have an account? register
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signin;
