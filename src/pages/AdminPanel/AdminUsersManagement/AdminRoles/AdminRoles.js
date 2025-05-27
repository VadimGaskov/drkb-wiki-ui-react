import useFetch from "../../../../hooks/useFetch";
import {getAllRights} from "../../../../services/drkb-main/RigthsService";
import {Button} from "@mui/material";
import AdminDepartmentCardElement
    from "../AdminDepartments/_components/AdminDepartmentCardElement/AdminDepartmentCardElement";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";

const AdminRoles = () => {
    const [rights, isLoadingRoles, setIsLoadingRoles] = useFetch(() => getAllRights());
    const [openModal, setIsOpenModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isRolePath, setIsRolePath] = useState(false);
    const {adminRoleId} = useParams();

    useEffect(() => {
        if (adminRoleId !== undefined && adminRoleId !== null) {
            setIsRolePath(true);
        }
        else {
            setIsRolePath(false);
        }
    }, [adminRoleId]);


    return(
        <>
            {isRolePath ? (<Outlet/>) : (
                <>
                    <div className={"admin-education-wrapper-top"}>
                        <Button variant={"contained"} onClick={() => setIsOpenModal(true)}>Создать тест</Button>
                    </div>
                    <div className="departments-wrapper">
                        {rights.map((right, index) => (
                            <AdminDepartmentCardElement title={right.name} itemId={right.id} key={index}/>
                        ))}
                    </div>
                </>
            )}

        </>
    )
}

export default AdminRoles;
