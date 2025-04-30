import {useEffect, useState} from "react";
import useFetch from "../../../../hooks/useFetch";
import {getAllDepartment, getAllDepartmentWithUsers} from "../../../../services/drkb-main/DepartmentService";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import "./CreateCourse.css";
import {
    Button,
    Checkbox,
    Collapse,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Input,
    List,
    ListItemButton,
    ListItemText, Typography
} from "@mui/material";
import {ExpandLess, ExpandMore, InputRounded, InputTwoTone} from "@mui/icons-material";
import {getAllArticles} from "../../../../services/drkb-wiki-education/ArticleService";
import CommonModalWindow from "../../../../components/ModalWindow/CommonModalWindow";

const CreateCourse = () => {




    return(
      <div className={"create-course-wrapper"}>



      </div>
    );
}

export default CreateCourse;