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
import { registerSchema } from "../../validationSchemas/registerSchema";

const Register = (props) => {
  const { register, registerLoading, registerError } = useContext(AuthContext);

  const handleSubmit = (values, actions) => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    register(payload);
  };

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <>
      <AuthMain>
        <Avatar className="register-icon">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <ResponseError error={registerError} textAlign="center" />
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleSubmit }) => {
            return (
              <>
                <form className="register-form" noValidate>
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
                  <FormikField
                    label="Confirm Password"
                    name="confirmPassword"
                    error={touched.confirmPassword && errors.confirmPassword}
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
                    disabled={registerLoading}
                  >
                    Register
                  </Button>
                  <Grid container>
                    <Grid item xs />
                    <Grid item>
                      <Link to={STATIC_ROUTES.login} variant="body2">
                        {"Have an account? Login"}
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
          :global(.register-icon) {
            margin: 8px;
            background-color: #2196f3;
          }
          .register-form {
            width: 100%;
            margin-top: 8px;
          }
          :global(.register-form .submit-btn) {
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

export default Register;
