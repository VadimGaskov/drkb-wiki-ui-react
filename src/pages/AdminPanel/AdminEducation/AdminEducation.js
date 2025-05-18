import "./AdminEducation.css";
import {useEffect, useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {getAllCourses} from "../../../services/drkb-wiki-education/CourseService";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import CourseBlock from "./_components/CourseBlock/CourseBlock";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import CreateCourseModal from "./_components/CreateCourseModal/CreateCourseModal";
import InnerNavMenu from "../_components/InnerNavMenu/InnerNavMenu";
const AdminEducation = () => {

    return(
        <>
            <InnerNavMenu/>
            <Outlet/>
        </>
    );
}

export default AdminEducation;