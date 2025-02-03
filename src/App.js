import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import Home from "./pages/main-page/Home";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
          <Outlet />
        </div>
      </BrowserRouter>
  );
}

export default App;
