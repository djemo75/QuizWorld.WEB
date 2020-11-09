import jwt from "jsonwebtoken";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { STATIC_ROUTES } from "../routes";
import { getProfileRequest, loginRequest } from "../services";
import { LoadingScreen } from "../shared/components/LoadingScreen";
import { extractError } from "../utils/error";
import { successNotification } from "../utils/notifications";

export const AuthContext = createContext();

const DEFAULT_STATE = {
  user: undefined,
  loading: true,
  error: undefined,
  loginLoading: false,
  loginError: undefined,
};

const AuthProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const history = useHistory();

  const getProfile = async () => {
    const token = localStorage.getItem("access_token");
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
  };

  const login = async (values) => {
    try {
      setState({ ...state, loginLoading: true, loginError: undefined });
      const { data } = await loginRequest(values);
      localStorage.setItem("access_token", data.accessToken);
      setState({ ...state, loginLoading: false });
      await getProfile();
      history.push(STATIC_ROUTES.home);
      successNotification("Successfully logged in!");
    } catch (e) {
      setState({ ...state, loginLoading: false, loginError: extractError(e) });
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setState({ ...state, loading: false, user: undefined, error: undefined });
    history.push(STATIC_ROUTES.login);
  };

  useEffect(() => {
    getProfile();
  }, []); // eslint-disable-line

  return (
    <AuthContext.Provider value={{ ...state, getProfile, login, logout }}>
      {state.loading ? <LoadingScreen /> : props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
