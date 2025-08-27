import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./src/Pages/Landing";
import Home from "./src/Pages/Home";
import AuthLayout from "./src/components/Auth/AuthLayout";
import PrivateRoute from "./src/components/Auth/PrivateRoute";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auth/:Authpage" element={<AuthLayout />} />
      </Routes>
    </Router>
  );
};

export default Routing;
