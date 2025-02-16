import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import Home from "./pages/home/Home";
import MainWikiLayout from "./layouts/main-wiki-layout/MainWikiLayout";
import ListEnvironmentModel from "./pages/list-environment-model/ListEnvironmentModel";
import EnvironmentModel from "./pages/environment-model/EnvironmentModel";
import Documentation from "./pages/environment-model/routes/documentation/Documentation";
import Login from "./pages/login/Login";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ShortInstruction from "./pages/environment-model/routes/short-instruction/ShortInstruction";
import Journal from "./pages/environment-model/routes/journal/Journal";
import NotFound from "./pages/not-found/NotFound";
import MaintenanceLogbook from "./pages/environment-model/routes/maintenance-logbook/MaintenanceLogbook";
import {EnvironmentModelProvider} from "./context/EnvironmentModelContext";
import {ROUTINGS} from "./constants/Routings";
import ListEnvironments from "./pages/environment-model/routes/list-environments/ListEnvironments";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <div className="App">
                  <Routes>
                      <Route path={`${ROUTINGS.HOME}`} element={<PrivateRoute><Home /></PrivateRoute>} />
                      <Route path={`${ROUTINGS.LOGIN}`} element={<Login />} />
                      <Route path={`${ROUTINGS.LIST_ENVIRONMENT}`} element={
                          <PrivateRoute>
                              <EnvironmentModelProvider>
                                  <MainWikiLayout />
                              </EnvironmentModelProvider>
                          </PrivateRoute>}
                      >
                          <Route index element={<ListEnvironmentModel />} />
                          <Route path={`${ROUTINGS.ENVIRONMENT_MODEL()}`} element={<EnvironmentModel />}>
                              <Route index path={`${ROUTINGS.DOCUMENTATION}`} element={<Documentation />} />
                              <Route path={`${ROUTINGS.MAINTENANCE_LOGBOOK}`} element={<MaintenanceLogbook />} />
                              <Route path={`${ROUTINGS.JOURNALS}`} element={<Journal />} />
                              <Route path={`${ROUTINGS.SHORT_INSTRUCTION}`} element={<ShortInstruction />} />
                              <Route path={`${ROUTINGS.ENVIRONMENTS}`} element={<ListEnvironments/>}>

                              </Route>
                          </Route>
                      </Route>
                      <Route path="/list-environment/equipment/:id/short-instruction" element={<ShortInstruction />}/>

                      <Route path="*" element={<NotFound/>} />
                  </Routes>
              </div>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
/*
<Routes>
    <Route path={`${ROUTINGS.HOME}`} element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path={`${ROUTINGS.LOGIN}`} element={<Login />} />
    <Route path={`${ROUTINGS.LIST_ENVIRONMENT}`} element={
        <PrivateRoute>
            <EnvironmentModelProvider>
                <MainWikiLayout />
            </EnvironmentModelProvider>
        </PrivateRoute>}
    >
        <Route index element={<ListEnvironmentModel />} />
        <Route path={`${ROUTINGS.ENVIRONMENT_MODEL()}`} element={<EnvironmentModel />}>
            <Route index path={`${ROUTINGS.DOCUMENTATION}`} element={<Documentation />} />
            <Route path={`${ROUTINGS.MAINTENANCE_LOGBOOK}`} element={<MaintenanceLogbook />} />
            <Route path={`${ROUTINGS.JOURNALS}`} element={<Journal />} />
            <Route path={`${ROUTINGS.SHORT_INSTRUCTION}`} element={<ShortInstruction />} />
        </Route>
    </Route>
    {/!**!/}
    {/!*!//TODO Доделать переход неавторизованному пользователю*!/}
    <Route path="/list-environment/equipment/:id/short-instruction" element={<ShortInstruction />}/>

    <Route path="*" element={<NotFound/>} />
</Routes>*/

/*
<Routes>
    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path="/login" element={<Login />} />
    <Route path="/list-environment" element={
        <PrivateRoute>
            <EnvironmentModelProvider>
                <MainWikiLayout />
            </EnvironmentModelProvider>
        </PrivateRoute>}
    >
        <Route index element={<ListEnvironmentModel />} />
        <Route path="environment-model/:id" element={<EnvironmentModel />}>
            <Route index path="documentation" element={<Documentation />} />
            <Route path="maintenance-logbook" element={<MaintenanceLogbook />} />
            <Route path="journal" element={<Journal />} />
            <Route path="short-instruction" element={<ShortInstruction />} />
        </Route>
    </Route>
    {/!**!/}
    {/!*!//TODO Доделать переход неавторизованному пользователю*!/}
    <Route path="/list-environment/equipment/:id/short-instruction" element={<ShortInstruction />}/>

    <Route path="*" element={<NotFound/>} />
</Routes>*/
