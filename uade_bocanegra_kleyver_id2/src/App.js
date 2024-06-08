import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
