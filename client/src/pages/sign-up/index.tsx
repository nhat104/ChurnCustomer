import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState, type FormEvent } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Alert } from 'src/components/alert';
import { Iconify } from 'src/components/iconify';
import { Loading } from 'src/components/loading';

import { selectAuth } from '../sign-in/slice/selectors';
import { authActions as actions } from '../sign-in/slice';

// ----------------------------------------------------------------------

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { loading, dataAuth, error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formValues = {
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };
    const { confirmPassword, ...signupData } = formValues;

    if (formValues.password !== confirmPassword) {
      setMessage('Password and confirm password do not match');
      setOpenAlert(true);
      return;
    }

    dispatch(actions.signupRequest(signupData));
  };

  useEffect(() => {
    if (dataAuth?.access_token) {
      router.push('/');
    }
  }, [dataAuth, router]);

  useEffect(() => {
    if (error) {
      setOpenAlert(true);
      setMessage(error);
      dispatch(actions.resetAuth());
    }
  }, [dispatch, error]);

  return (
    <>
      <Helmet>
        <title>{`Sign up - ${CONFIG.appName}`}</title>
      </Helmet>

      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign up</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            '& a': {
              ml: 0.5,
              fontWeight: '600',
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
            },
          }}
        >
          Already have an account?&nbsp;
          <Link to="/sign-in" color="inherit">
            Sign in
          </Link>
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSignIn}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
      >
        <TextField
          fullWidth
          name="firstName"
          label="First Name"
          defaultValue="Mai Minh"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="lastName"
          label="Last Name"
          defaultValue="Nhat"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="email"
          label="Email address"
          defaultValue="nhatmm@gmail.com"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          defaultValue="123456"
          InputLabelProps={{ shrink: true }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          defaultValue="123456"
          InputLabelProps={{ shrink: true }}
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify
                    icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Button fullWidth size="large" type="submit" color="inherit" variant="contained">
          Sign up
        </Button>
      </Box>

      {loading ? <Loading /> : null}
      <Alert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        message={message}
        severity="error"
      />
    </>
  );
}
