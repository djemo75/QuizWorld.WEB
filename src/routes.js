import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SolveTest from "./pages/SolveTest";
import TestParticipants from "./pages/TestParticipants";
import TestResults from "./pages/TestResults";
import Tests from "./pages/Tests";
import Users from "./pages/Users";
import ViewTest from "./pages/ViewTest";

export const STATIC_ROUTES = {
  notFound: "/not-found",
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  users: "/users",
  tests: "/tests",
  viewTest: "/tests/:id",
  solveTest: "/tests/:id/solve",
  testResults: "/tests/:id/results",
  viewTestResult: "/results/:id",
  testParticipants: "/tests/:id/participants",
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
    component: () => <Register />,
  },
];

const routes = [
  {
    path: STATIC_ROUTES.home,
    exact: true,
    component: () => <Redirect to={STATIC_ROUTES.tests} />,
  },
  {
    path: STATIC_ROUTES.tests,
    exact: true,
    component: () => <Tests />,
  },
  {
    path: STATIC_ROUTES.viewTest,
    exact: true,
    component: () => <ViewTest />,
  },
  {
    path: STATIC_ROUTES.solveTest,
    exact: true,
    component: () => <SolveTest />,
  },
  {
    path: STATIC_ROUTES.testResults,
    exact: true,
    component: () => <TestResults />,
  },
  {
    path: STATIC_ROUTES.testParticipants,
    exact: true,
    component: () => <TestParticipants />,
  },
  {
    path: STATIC_ROUTES.profile,
    exact: true,
    component: () => <>Profile</>,
  },
  {
    path: STATIC_ROUTES.users,
    exact: true,
    component: () => <Users />,
  },
];

export const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      {!user
        ? authRoutes.map((route, i) => <Route key={i} {...route} />)
        : routes.map((route, i) => <Route key={i} {...route} />)}

      <Route
        path={STATIC_ROUTES.notFound}
        exact
        component={() => <NotFound />}
      />
      <Route
        path="*"
        component={() => <Redirect to={STATIC_ROUTES.notFound} />}
      />
    </Switch>
  );
};
