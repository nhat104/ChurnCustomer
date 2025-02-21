import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState, type FormEvent } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, IconButton, TextField, Link as MuiLink, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Alert } from 'src/components/alert';
import { Iconify } from 'src/components/iconify';
import { Loading } from 'src/components/loading';

import { selectAuth } from './slice/selectors';
import { authActions as actions } from './slice';

// ----------------------------------------------------------------------

export default function SigninPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { loading, dataAuth, error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formValues = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    dispatch(actions.loginRequest(formValues));
  };

  useEffect(() => {
    if (dataAuth?.access_token) {
      router.push('/');
    }
  }, [dataAuth, router]);

  useEffect(() => {
    if (error) {
      setOpenAlert(true);
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>{`Sign in - ${CONFIG.appName}`}</title>
      </Helmet>

      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
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
          Don’t have an account?
          <Link to="/sign-up">Get started</Link>
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSignIn}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
      >
        <TextField
          fullWidth
          name="email"
          label="Email address"
          defaultValue="nhatmm@gmail.com"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <MuiLink variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </MuiLink>

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

        <Button fullWidth size="large" type="submit" color="inherit" variant="contained">
          Sign in
        </Button>
      </Box>

      {loading ? <Loading /> : null}
      <Alert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        message="Incorrect email or password"
        severity="error"
      />
    </>
  );
}
