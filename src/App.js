import React, { useContext, useEffect, useState } from "react";
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useRoutes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

// Pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListEnvironmentModel from "./pages/list-environment-model/ListEnvironmentModel";
import EnvironmentModel from "./pages/environment-model/EnvironmentModel";
import Documentation from "./pages/environment-model/routes/documentation/Documentation";
import ShortInstruction from "./pages/environment-model/routes/short-instruction/ShortInstruction";
import Journal from "./pages/environment-model/routes/journal/Journal";
import MaintenanceLogbook from "./pages/environment-model/routes/maintenance-logbook/MaintenanceLogbook";
import ListCourses from "./pages/list-courses/ListCourses";
import NotFound from "./pages/not-found/NotFound";
import NotAllowed from "./pages/NotAllowed/NotAllowed";

// Layouts and Components
import MainWikiLayout from "./layouts/main-wiki-layout/MainWikiLayout";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Contexts and Services
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { EnvironmentModelProvider } from "./context/EnvironmentModelContext";
import { getCurrentUser, getUserRoles } from "./services/AuthService";

// Constants
import { ROUTINGS } from "./constants/Routings";
import ListDepartment from "./pages/ListDepartment/ListDepartment";
import {hasRight, USER_RIGHTS} from "./constants/UserRights";

function App() {
    const { user } = useContext(AuthContext); // Теперь user из контекста

    return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/* Главная страница с ограничением по роли */}
                        <Route
                            path={ROUTINGS.HOME}
                            element={
                                <PrivateRoute isAllowed={!!user}>
                                    <Home />
                                </PrivateRoute>
                            }
                        />

                        {/* Страница логина */}

                        <Route path={ROUTINGS.LOGIN} element={<Login />} />

                        {/* Маршруты для списка оборудований */}

                        <Route
                            path={ROUTINGS.LIST_ENVIRONMENT_MODEL()}
                            element={
                                <PrivateRoute isAllowed={!!user}>
                                    <EnvironmentModelProvider>
                                        <MainWikiLayout />
                                    </EnvironmentModelProvider>
                                </PrivateRoute>
                            }
                        >
                            {/*<Route path={ROUTINGS.LIST_DEPARTMENTS} element={<ListDepartment/>}/>*/}
                            <Route index element={<ListEnvironmentModel />}/>
                            <Route path={ROUTINGS.ENVIRONMENT_MODEL()} element={<EnvironmentModel />}>
                                <Route path={ROUTINGS.DOCUMENTATION} element={<Documentation />} />
                                <Route path={ROUTINGS.MAINTENANCE_LOGBOOK} element={<MaintenanceLogbook />} />
                                <Route path={ROUTINGS.JOURNALS} element={<Journal />} />
                                <Route path={ROUTINGS.SHORT_INSTRUCTION} element={<ShortInstruction />} />
                            </Route>
                        </Route>

                        {/* Маршруты для списка курсов */}

                        <Route
                            path={ROUTINGS.LIST_COURSES}
                            element={
                                <PrivateRoute isAllowed={!!user}>
                                    <EnvironmentModelProvider>
                                        <MainWikiLayout />
                                    </EnvironmentModelProvider>
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<ListCourses />} />
                        </Route>

                        <Route
                            path={ROUTINGS.LIST_DEPARTMENTS}
                            element={
                            <PrivateRoute isAllowed={!!user && hasRight(USER_RIGHTS.CREATE_USER)}>
                                <EnvironmentModelProvider>
                                    <MainWikiLayout />
                                </EnvironmentModelProvider>
                            </PrivateRoute>}
                        >
                            <Route index element={<ListDepartment/>} />
                        </Route>


                        {/* Обработка ошибок */}
                        <Route path="/" element={<Navigate to={`${ROUTINGS.HOME}`}/>} />
                        <Route path={ROUTINGS.NOT_ALLOWED} element={<NotAllowed />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;