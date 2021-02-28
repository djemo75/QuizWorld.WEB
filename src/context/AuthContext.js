import jwt from "jsonwebtoken";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { STATIC_ROUTES } from "../routes";
import { getProfileRequest, loginRequest, registerRequest } from "../services";
import { LoadingScreen } from "../shared/components/LoadingScreen";
import { successNotification } from "../utils/notifications";

export const AuthContext = createContext();

const DEFAULT_STATE = {
  user: null,
  loading: true,
  error: null,
  //
  loginLoading: false,
  loginError: null,
  //
  registerLoading: false,
  registerError: null,
};

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const history = useHistory();

  useEffect(() => {
    getProfile();
  }, []); // eslint-disable-line

  const getProfile = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      if (jwt.decode(token)) {
        try {
          setState(DEFAULT_STATE);
          const { data } = await getProfileRequest();
          setState((s) => ({ ...s, loading: false, user: data }));
        } catch (error) {
          setState((s) => ({ ...s, loading: false, error: error.message }));
        }
      } else {
        logout();
      }
    } else {
      setState((s) => ({ ...s, loading: false, user: null, error: null }));
    }
  };

  const login = async (values) => {
    try {
      setState((s) => ({ ...s, loginLoading: true, loginError: null }));
      const { data } = await loginRequest(values);
      localStorage.setItem("access_token", data.accessToken);
      setState((s) => ({ ...s, loginLoading: false, loginError: null }));
      await getProfile();
      successNotification("Successfully logged in!");
      history.push(STATIC_ROUTES.myResults);
    } catch (error) {
      setState((s) => ({ ...s, loginLoading: false, loginError: error }));
    }
  };

  const register = async (values) => {
    try {
      setState((s) => ({ ...s, registerLoading: true, registerError: null }));
      await registerRequest(values);
      setState((s) => ({ ...s, registerLoading: false, registerError: null }));
      successNotification("Successfully registered!");
      history.push(STATIC_ROUTES.login);
    } catch (error) {
      setState((s) => ({ ...s, registerLoading: false, registerError: error }));
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setState((s) => ({ ...s, loading: false, user: null, error: null }));
    history.push(STATIC_ROUTES.login);
  };

  const clearErrors = () => {
    setState((state) => ({
      ...state,
      error: null,
      loginError: null,
      registerError: null,
    }));
  };

  const isAdmin = state.user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        ...state,
        getProfile,
        login,
        logout,
        register,
        clearErrors,
        isAdmin,
      }}
    >
      {state.loading ? <LoadingScreen fullHeight /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
