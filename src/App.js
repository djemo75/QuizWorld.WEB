import "react-quill/dist/quill.snow.css";

import React, { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import { Routes } from "./routes";
import { Navigation } from "./shared/components/Navigation";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      {user && <Navigation />}
      <Routes />
    </div>
  );
}

export default App;
