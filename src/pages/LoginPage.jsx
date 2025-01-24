import {
  Button,
  Typography,
  Container,
  IconButton,
  styled,
  Grid
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../services/rtk-query/authApi";
import FormTextField from "../components/form/FormTextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormBg = styled(Grid)(({ theme }) => ({
  borderRadius: "15px",
  padding: theme.spacing(8, 6),
  justifyContent: "center",
  alignItems: "center",
  background: "#F2F2F2",
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(6)
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(2.2)
  }
}));

const LoginPage = () => {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();
        if(response){
          navigate("/")
        }
      } catch (err) {
        console.error("Login failed: ", err);
        alert("Login failed");
      }
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs">
        <FormBg item container gap={2}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>

            <FormTextField
              isFullWidth
              name="username"
              label="Username"
              placeholder={"please enter user name!"}
              value={formik.values.username}
              onChange={formik.handleChange("username")}
              errorMsg={formik.touched.username ? formik.errors.username : ""}
              onBlur={formik.handleBlur("username")}
            />
            
            <FormTextField
              placeholder={"enter your password here"}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              onChange={formik.handleChange}
              label={"Password"}
              errorMsg={formik.touched.password && formik.errors.password}
              focused
              endIcon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  color="secondary"
                  size="small"
                ></IconButton>
              }
            />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ marginTop: 2 }}
            >
              {isLoading ? "Logging In..." : "Login"}
            </Button>
            {isError && (
              <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
                {error?.message || "Login failed"}
              </Typography>
            )}
          </form>
        </FormBg>
    </Container>
  );
};

export default LoginPage;
