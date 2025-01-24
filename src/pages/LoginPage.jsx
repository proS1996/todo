// src/features/auth/LoginPage.jsx

import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../services/rtk-query/authApi';

const LoginPage = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();
        console.log("🚀 ~ onSubmit: ~ response:", response)
        alert('Login Successful');
      } catch (err) {
        console.error('Login failed: ', err);
        alert('Login failed');
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" marginTop="50px">
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ marginTop: 2 }}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </Button>
          {isError && (
            <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
              {error?.message || 'Login failed'}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
