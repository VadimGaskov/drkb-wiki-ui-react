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
import PrivateRoute from "./components/private-route/PrivateRoute";
import ShortInstruction from "./pages/short-instruction/ShortInstruction";
import Journal from "./pages/Journal/Journal";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <div className="App">
                  <Routes>
                      <Route path="/login" element={<Login />}/>
                      <Route path="/" element={
                          <PrivateRoute>
                            <Home/>
                          </PrivateRoute>}
                      />
                      <Route path="/home" element={<PrivateRoute><Layout /></PrivateRoute>}>
                          <Route index element={<ListEnvironment/>}></Route>
                          {/*Вынести нужный маршрут за пределы PrivateRoute*/}
                          <Route path="equipment/:id" element={<Environment />} >
                              <Route index path="documentation" element={<Documentation />}/>
                              <Route path="journal" element={<Journal/>} />
                              <Route path="short-instruction" element={<ShortInstruction />}/>
                          </Route>
                      </Route>
                  </Routes>
              </div>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
