import React, { useContext, useEffect, useState } from "react";
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useRoutes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import EnvironmentModels from "./pages/EnvironmentModels/EnvironmentModels";
import EnvironmentModel from "./pages/EnvironmentModels/EnvironmentModel/EnvironmentModel";
import Documentation from "./pages/EnvironmentModels/EnvironmentModel/documentation/Documentation";
import ShortInstruction from "./pages/EnvironmentModels/EnvironmentModel/short-instruction/ShortInstruction";
import Journal from "./pages/EnvironmentModels/EnvironmentModel/journal/Journal";
import MaintenanceLogbook from "./pages/EnvironmentModels/EnvironmentModel/maintenance-logbook/MaintenanceLogbook";
import Courses from "./pages/Courses/Courses";
import NotFound from "./pages/NotFound/NotFound";
import NotAllowed from "./pages/NotAllowed/NotAllowed";

import MainWikiLayout from "./layouts/MainWikiLayout/MainWikiLayout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Contexts and Services
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { EnvironmentModelProvider } from "./context/EnvironmentModelContext";
import { getCurrentUser, getUserRoles } from "./services/AuthService";

// Constants
import { ROUTINGS } from "./constants/Routings";
import Departments from "./pages/Departments/Departments";
import {hasRight, USER_RIGHTS} from "./constants/UserRights";
import Articles from "./pages/Courses/Articles/Articles";
import {CourseProvider} from "./context/CourseContext";
import Article from "./pages/Courses/Articles/Article/Article";
import Test from "./pages/Courses/Articles/Article/Test/Test";
import {ArticleContext, ArticleProvider} from "./context/ArticleContext";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminEducation from "./pages/AdminPanel/AdminEducation/AdminEducation";
import AdminCourse from "./pages/AdminPanel/AdminEducation/AdminCourse/AdminCourse";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/AdminEducation/AdminCourses/AdminCourses";
import AdminArticles from "./pages/AdminPanel/AdminEducation/AdminArticles/AdminArticles";
import AdminTests from "./pages/AdminPanel/AdminEducation/AdminTests/AdminTests";

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
                            <Route index element={<EnvironmentModels />}/>
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
                                    <CourseProvider>
                                        <MainWikiLayout />
                                    </CourseProvider>
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<Courses />} />
                            <Route path={ROUTINGS.LIST_ARTICLE()} element={<Articles />}>
                                <Route path={ROUTINGS.ARTICLE()} element={<ArticleProvider><Article/></ArticleProvider>} >
                                    <Route path={ROUTINGS.TEST()} element={<Test />}/>
                                </Route>
                            </Route>
                        </Route>

                        {/*<Route
                            path={ROUTINGS.LIST_DEPARTMENTS}
                            element={
                            <PrivateRoute isAllowed={!!user && hasRight(USER_RIGHTS.CREATE_USER)}>
                                <EnvironmentModelProvider>
                                    <MainWikiLayout />
                                </EnvironmentModelProvider>
                            </PrivateRoute>}
                        >
                            <Route index element={<Departments/>} />
                        </Route>*/}

                        {/* Обработка ошибок */}
                        <Route path="/" element={<Navigate to={`${ROUTINGS.HOME}`}/>} />

                        <Route path="/admin" element={<AdminPanel />} >
                            <Route path="education" element={<AdminEducation />}>
                                <Route path={"courses"} element={<AdminCourses/>}>
                                    <Route path={":adminCourseId"} element={<AdminCourse />} />
                                </Route>
                                <Route path={"articles"} element={<AdminArticles/>}>
                                    <Route path={":adminArticleId"} element={<AdminArticles/>}/>
                                </Route>
                                <Route path={"tests"} element={<AdminTests/>}>

                                </Route>
                            </Route>
                            <Route path={"users"} element={<Users/>}>

                            </Route>
                        </Route>

                        <Route path={ROUTINGS.NOT_ALLOWED} element={<NotAllowed />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;