import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { STATIC_ROUTES } from "../../routes";
import { AuthMain } from "../../shared/components/AuthMain";
import { FormikField } from "../../shared/components/FormikField";
import { ResponseError } from "../../shared/components/ResponseError";
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
      <AuthMain>
        <Avatar className="login-icon">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <ResponseError error={loginError} textAlign="center" />
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
                      <Link to={STATIC_ROUTES.register} variant="body2">
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
      </AuthMain>
      <style jsx>
        {`
          :global(.login-icon) {
            margin: 8px;
            background-color: #2196f3;
          }
          .login-form {
            width: 100%;
            margin-top: 8px;
          }
          :global(.login-form .submit-btn) {
            margin: 24px 0px 16px;
          }
          :global(.response-error) {
            margin-top: 10px;
          }
        `}
      </style>
    </>
  );
};

export default Login;
