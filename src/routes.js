import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const STATIC_ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  users: "/users",
};

const authRoutes = [
  {
    path: STATIC_ROUTES.home,
    exact: true,
    component: () => <Redirect to={STATIC_ROUTES.login} />,
  },
  {
    path: STATIC_ROUTES.login,
    exact: true,
    component: () => <Login />,
  },
  {
    path: STATIC_ROUTES.register,
    exact: true,
    component: () => <>Register page</>,
  },
];

const routes = [
  {
    path: STATIC_ROUTES.home,
    exact: true,
    component: () => <Home />,
  },
  {
    path: STATIC_ROUTES.profile,
    exact: true,
    component: () => <>Profile</>,
  },
  {
    path: STATIC_ROUTES.users,
    exact: true,
    component: () => <>Users</>,
  },
];

export const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      {!user
        ? authRoutes.map((route, i) => <Route key={i} {...route} />)
        : routes.map((route, i) => <Route key={i} {...route} />)}
      <Route path="*" component={() => <>Not Found</>} />
    </Switch>
  );
};
