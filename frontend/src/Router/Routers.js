import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../page/Auth/Register/Register";
import Home from "../page/Home/Home";
import Navbar from "../page/Navbar/Navbar";

function Routers() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routers;
