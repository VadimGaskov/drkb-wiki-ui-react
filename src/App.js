import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import Home from "./pages/main-page/Home";
import Layout from "./layouts/Layout";
import ListEnvironment from "./pages/list-environment/ListEnvironment";
import Environment from "./pages/environment/Environment";
import Documentation from "./components/environment/environment-nav/documentation/Documentation";
import Login from "./pages/login/Login";
import {AuthContext, AuthProvider} from "./context/AuthContext";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <div className="App">
                  <Routes>
                      <Route path="/login" element={<Login />}/>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/home" element={<Layout />}>
                          <Route index element={<ListEnvironment/>}></Route>
                          <Route path="equipment/:id" element={<Environment />} >
                              <Route index path="documentation" element={<Documentation />}/>
                          </Route>
                      </Route>
                      {/*<Route path="*" element={} />*/}
                  </Routes>
              </div>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
