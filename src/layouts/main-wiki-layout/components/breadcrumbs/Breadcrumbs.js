import { Link, useLocation, useParams } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {API_URLS} from "../../../../constants/ApiUrls";
import {getEnvironmentModelById} from "../../../../services/drkb-wiki/EnvironmentModelService";
import {EnvironmentModelContext} from "../../../../context/EnvironmentModelContext";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const params = useParams(); // Получаем параметры из URL
    const [equipmentName, setEquipmentName] = useState(null); // Состояние для названия оборудования
    const environmentModel = useContext(EnvironmentModelContext);
    console.log(environmentModel);
    const nameMap = {
        'home': 'Главная',
        'equipment': 'Медицинское оборудование',
        'documentation': 'Документация',
        'short-instruction' : "Краткая инструкция"
    };

    return (
        <div className="crumbs">
            {pathnames.map((value, index) => {
                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                let displayName = nameMap[value] || value;

                // Если текущий путь содержит id, используем equipmentName
                if (value === params.id && environmentModel) {
                    displayName = environmentModel.name;
                }

                return (
                    <span key={index}>
                        <Link to={path}>{displayName}</Link>
                        {index < pathnames.length - 1 && ' - '}
                    </span>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;