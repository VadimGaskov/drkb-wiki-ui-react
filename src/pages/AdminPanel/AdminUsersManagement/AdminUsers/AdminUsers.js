import styles from "./AdminUsers.module.css";
import useFetch from "../../../../hooks/useFetch";
import {getAllUsers} from "../../../../services/drkb-main/UserService";
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import ItemCardElement from "../../AdminEnvironment/_components/ItemCardElement/ItemCardElement";

const AdminUsers = () => {
    const [users, isLoadingUsers, setIsLoadingUsers] = useFetch(() => getAllUsers());
    const [openModal, setIsOpenModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isUserPath, setIsUserPath] = useState(false);
    const [groupedData, setGroupedData] = useState({});
    const {adminUserId} = useParams();

    useEffect(() => {
        if (users.length === 0) return;
        const grouped = {};

        users.forEach(user => {
            const firstLetter = user.name[0].toUpperCase();
            if (!grouped[firstLetter]) grouped[firstLetter] = [];
            grouped[firstLetter].push(user);
        });

        setGroupedData(grouped);
    }, [users]);

    useEffect(() => {
        if (adminUserId !== undefined && adminUserId !== null) {
            setIsUserPath(true);
        }
        else {
            setIsUserPath(false);
        }
    }, [adminUserId]);

    return(
        <>
            {isUserPath ? (<Outlet/>) : (
                <>
                    <div className={"admin-education-wrapper-top"}>
                        <Button variant={"contained"} onClick={() => setIsOpenModal(true)}>Создать пользователя</Button>
                    </div>
                    <div className={styles.groupedContainer}>
                        {Object.entries(groupedData).map(([letter, items]) => (
                            <div className={styles.group} key={letter}>
                                <h2 className={styles.groupTitle}>{letter}</h2>
                                <div className={styles.itemsList}>
                                    {items.map((user, index) => (
                                        <ItemCardElement 
                                            key={index} 
                                            title={`${user.name} ${user.surname}`} 
                                            itemId={user.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default AdminUsers;