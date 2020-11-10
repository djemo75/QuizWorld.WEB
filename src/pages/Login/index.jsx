import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik } from "formik";
import React, { useContext } from "react";

import imageBackground from "../../assets/auth-background.jpg";
import { AuthContext } from "../../context/AuthContext";
import { STATIC_ROUTES } from "../../routes";
import { FormikField } from "../../shared/components/FormikField";
import { loginSchema } from "../../validationSchemas/loginSchema";

const Login = (props) => {
  const { login, loginLoading, loginError } = useContext(AuthContext);

  const handleSubmit = (values, actions) => {
    login(values);
  };

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <>
      <Grid container component="main" className="root">
        <Grid item xs={false} sm={4} md={7}>
          <img src={imageBackground} className="image" alt="QuizWorld" />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="content">
            <Avatar className="login-icon">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <div className="login-error">{loginError && loginError}</div>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleSubmit }) => {
                return (
                  <>
                    <form className="login-form" noValidate>
                      <FormikField
                        label="Username"
                        name="username"
                        error={touched.username && errors.username}
                        fullWidth
                        required
                      />
                      <FormikField
                        label="Password"
                        name="password"
                        error={touched.password && errors.password}
                        type="password"
                        fullWidth
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="submit-btn"
                        onClick={handleSubmit}
                        fullWidth
                        disabled={loginLoading}
                      >
                        Login
                      </Button>
                      <Grid container>
                        <Grid item xs />
                        <Grid item>
                          <Link href={STATIC_ROUTES.register} variant="body2">
                            {"Don't have an account?"}
                          </Link>
                        </Grid>
                      </Grid>
                      <Box mt={5}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          align="center"
                        >
                          Copyright © QuizWorld {new Date().getFullYear()}
                        </Typography>
                      </Box>
                    </form>
                  </>
                );
              }}
            </Formik>
          </div>
        </Grid>
      </Grid>
      <style jsx>
        {`
          .root {
            height: 100vh;
          }
          .image {
            background-repeat: no-repeat;
            background-color: gray;
            background-position: center;
            object-fit: cover;
            height: 100%;
            width: 100%;
            background-size: cover;
          }
          @media (max-width: 600px) {
            .image {
              display: none;
            }
          }
          .content {
            height: 100%;
            margin: 0px 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          :global(.content .login-icon) {
            margin: 8px;
            background-color: #f50057;
          }
          .login-form {
            width: 100%;
            margin-top: 8px;
          }
          :global(.content .login-form .submit-btn) {
            margin: 24px 0px 16px;
          }
          .login-error {
            color: red;
            margin-top: 10px;
          }
        `}
      </style>
    </>
  );
};

export default Login;
