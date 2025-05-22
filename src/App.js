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
import {USER_RIGHTS} from "./constants/userRoles";
import Articles from "./pages/Courses/Articles/Articles";
import {CourseProvider} from "./context/CourseContext";
import Article from "./pages/Courses/Articles/Article/Article";
import Test from "./pages/Courses/Articles/Article/Test/Test";
import {ArticleContext, ArticleProvider} from "./context/ArticleContext";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminEducation from "./pages/AdminPanel/AdminEducation/AdminEducation";
import AdminCourse from "./pages/AdminPanel/AdminEducation/AdminCourses/AdminCourse/AdminCourse";
import AdminUsersManagement from "./pages/AdminPanel/AdminUsersManagement/AdminUsersManagement";
import AdminCourses from "./pages/AdminPanel/AdminEducation/AdminCourses/AdminCourses";
import AdminArticles from "./pages/AdminPanel/AdminEducation/AdminArticles/AdminArticles";
import AdminTests from "./pages/AdminPanel/AdminEducation/AdminTests/AdminTests";
import {hasRight} from "./utils/authHelper";
import ShortInstructionForAll from "./pages/ShortInstructionForAll/ShortInstructionForAll";
import AdminArticle from "./pages/AdminPanel/AdminEducation/AdminArticles/AdminArticle/AdminArticle";
import AdminTest from "./pages/AdminPanel/AdminEducation/AdminTests/AdminTest/AdminTest";
import AdminDepartments from "./pages/AdminPanel/AdminUsersManagement/AdminDepartments/AdminDepartments";
import AdminRoles from "./pages/AdminPanel/AdminUsersManagement/AdminRoles/AdminRoles";
import AdminUsers from "./pages/AdminPanel/AdminUsersManagement/AdminUsers/AdminUsers";
import AdminDepartment from "./pages/AdminPanel/AdminUsersManagement/AdminDepartments/AdminDepartment/AdminDepartment";
import AdminEnvironment from "./pages/AdminPanel/AdminEnvironment/AdminEnvironment";
import AdminEnvironmentModels from "./pages/AdminPanel/AdminEnvironment/AdminEnvironmentModels/AdminEnvironmentModels";
import AdminEnvironmentModel
    from "./pages/AdminPanel/AdminEnvironment/AdminEnvironmentModels/AdminEnvironmentModel/AdminEnvironmentModel";

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



                        {/* Маршруты для списка оборудований */}

                        <Route path={ROUTINGS.LIST_DEPARTMENTS}
                            element={
                                <PrivateRoute isAllowed={!!user}>
                                    <EnvironmentModelProvider>
                                        <MainWikiLayout>
                                            <Departments/>
                                        </MainWikiLayout>
                                    </EnvironmentModelProvider>
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<Departments/>} />
                            <Route path={ROUTINGS.LIST_ENVIRONMENT_MODEL()}
                                element={
                                    <EnvironmentModelProvider>
                                        <EnvironmentModels />
                                    </EnvironmentModelProvider>
                                }
                            >
                                <Route path={ROUTINGS.ENVIRONMENT_MODEL()}
                                       element={<EnvironmentModel />}
                                >
                                    <Route path={ROUTINGS.DOCUMENTATION} element={<Documentation />} />
                                    <Route path={ROUTINGS.MAINTENANCE_LOGBOOK} element={<MaintenanceLogbook />} />
                                    <Route path={ROUTINGS.JOURNALS} element={<Journal />} />
                                    <Route path={ROUTINGS.SHORT_INSTRUCTION} element={<ShortInstruction />} />
                                </Route>
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

                        {/* Обработка ошибок */}
                        <Route path="/" element={<Navigate to={`${ROUTINGS.HOME}`}/>} />

                        {/*Админ панель*/}
                        <Route path="/admin" element={<AdminPanel />} >
                            <Route path="education" element={<AdminEducation />}>
                                <Route path={"courses"} element={<AdminCourses/>}>
                                    <Route path={":adminCourseId"} element={<AdminCourse />} />
                                </Route>
                                <Route path={"articles"} element={<AdminArticles/>}>
                                    <Route path={":adminArticleId"} element={<AdminArticle/>}/>
                                </Route>
                                <Route path={"tests"} element={<AdminTests/>}>
                                    <Route path={":adminTestId"} element={<AdminTest/>}/>
                                </Route>
                            </Route>
                            <Route path={"equipments"} element={<AdminEnvironment/>}>
                                <Route path={"equipment-models"} element={<AdminEnvironmentModels/>}>
                                    <Route path={":adminEnvironmentModelId"} element={<AdminEnvironmentModel/>}/>
                                </Route>
                            </Route>
                            <Route path={"users-management"} element={<AdminUsersManagement/>}>
                                <Route path={"admin-departments"} element={<AdminDepartments/>}>
                                    <Route path={":adminDepartmentId"} element={<AdminDepartment/>}/>
                                </Route>
                                <Route path={"admin-roles"} element={<AdminRoles/>}/>
                                <Route path={"admin-users"} element={<AdminUsers/>}/>
                            </Route>
                        </Route>

                        <Route path={ROUTINGS.NOT_ALLOWED} element={<NotAllowed />} />

                        <Route path={ROUTINGS.LOGIN} element={<Login />} />

                        <Route path={ROUTINGS.SHORT_INSTRUCTION_SECOND}
                               element={
                                   <ShortInstructionForAll/>
                                }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;