import jwt from "jsonwebtoken";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { STATIC_ROUTES } from "../routes";
import { getProfileRequest, loginRequest, registerRequest } from "../services";
import { LoadingScreen } from "../shared/components/LoadingScreen";
import { successNotification } from "../utils/notifications";

export const AuthContext = createContext();

const DEFAULT_STATE = {
  user: undefined,
  loading: true,
  error: undefined,

  loginLoading: false,
  loginError: undefined,

  registerLoading: false,
  registerError: undefined,
};

const AuthProvider = (props) => {
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
          setState({ ...state, loading: true, error: undefined });
          const { data } = await getProfileRequest();
          setState({ ...state, loading: false, user: data });
        } catch (e) {
          setState({ ...state, loading: false, error: e.message });
        }
      } else {
        logout();
      }
    } else {
      setState({ ...state, loading: false, user: undefined, error: undefined });
    }
  };

  const login = async (values) => {
    try {
      setState({ ...state, loginLoading: true, loginError: undefined });
      const { data } = await loginRequest(values);
      localStorage.setItem("access_token", data.accessToken);
      setState({ ...state, loginLoading: false, loginError: undefined });
      await getProfile();
      successNotification("Successfully logged in!");
      history.push(STATIC_ROUTES.home);
    } catch (error) {
      setState({ ...state, loginLoading: false, loginError: error });
    }
  };

  const register = async (values) => {
    try {
      setState({ ...state, registerLoading: true, registerError: undefined });
      await registerRequest(values);
      setState({ ...state, registerLoading: false, registerError: undefined });
      successNotification("Successfully registered!");
      history.push(STATIC_ROUTES.login);
    } catch (error) {
      setState({
        ...state,
        registerLoading: false,
        registerError: error,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setState({ ...state, loading: false, user: undefined, error: undefined });
    history.push(STATIC_ROUTES.login);
  };

  const isAdmin = state.user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ ...state, getProfile, login, logout, register, isAdmin }}
    >
      {state.loading ? <LoadingScreen fullHeight /> : props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
