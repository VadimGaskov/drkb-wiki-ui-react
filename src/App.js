import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import Home from "./pages/home/Home";
import MainWikiLayout from "./layouts/main-wiki-layout/MainWikiLayout";
import ListEnvironment from "./pages/list-environment/ListEnvironment";
import Environment from "./pages/environment/Environment";
import Documentation from "./pages/environment/routes/documentation/Documentation";
import Login from "./pages/login/Login";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ShortInstruction from "./pages/environment/routes/short-instruction/ShortInstruction";
import Journal from "./pages/environment/routes/journal/Journal";
import NotFound from "./pages/not-found/NotFound";
import MaintenanceLogbook from "./pages/environment/routes/maintenance-logbook/MaintenanceLogbook";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <div className="App">
                  <Routes>
                      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/list-environment" element={<PrivateRoute><MainWikiLayout /></PrivateRoute>}>
                          <Route index element={<ListEnvironment />} />
                          <Route path="equipment/:id" element={<Environment />}>
                              <Route index path="documentation" element={<Documentation />} />
                              <Route path="maintenance-logbook" element={<MaintenanceLogbook />} />
                              <Route path="journal" element={<Journal />} />
                              <Route path="short-instruction" element={<ShortInstruction />} />
                          </Route>
                      </Route>
                        {/**/}
                      {/*//TODO Доделать переход неавторизованному пользователю*/}
                      <Route path="/list-environment/equipment/:id/short-instruction" element={<ShortInstruction />}/>





                      <Route path="*" element={<NotFound/>} />
                  </Routes>
              </div>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
