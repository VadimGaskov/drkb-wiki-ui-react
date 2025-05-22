import "./AdminEducation.css";
import {useEffect, useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {getAllCourses} from "../../../services/drkb-wiki-education/CourseService";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import CourseBlock from "./components/CourseBlock/CourseBlock";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import CreateCourseModal from "./components/CreateCourseModal/CreateCourseModal";
import InnerNavMenu from "../_components/InnerNavMenu/InnerNavMenu";
import EducationInnerNavMenu from "./components/EducationInnerNavMenu/EducationInnerNavMenu";
const AdminEducation = () => {

    return(
        <>
            <EducationInnerNavMenu/>
            <Outlet/>
        </>
    );
}

export default AdminEducation;