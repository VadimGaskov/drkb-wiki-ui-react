import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import Home from "./pages/main-page/Home";
import Layout from "./layouts/Layout";
import ListEnvironment from "./pages/list-environment/ListEnvironment";
import Environment from "./pages/environment/Environment";
import Documentation from "./components/environment/environment-nav/documentation/Documentation";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Layout />}>
                    <Route index element={<ListEnvironment/>}></Route>
                    <Route path="equipment/:id" element={<Environment />} >
                        <Route index path="documentation" element={<Documentation />}/>
                    </Route>
                </Route>
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
