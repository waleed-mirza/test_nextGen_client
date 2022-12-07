import React, { useState } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CarService from "./pages/CarService";

const App = () => {
  const [activeUser, setActiveUser] = useState(null);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setActiveUser={setActiveUser} />}
        />
        <Route
          path="/car-service"
          element={<CarService activeUser={activeUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
