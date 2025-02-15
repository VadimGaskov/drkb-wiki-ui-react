import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {API_URLS} from "../../../../constants/ApiUrls";
import {getEnvironmentModelById} from "../../../../services/drkb-wiki/EnvironmentModelService";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const params = useParams(); // Получаем параметры из URL
    const [equipmentName, setEquipmentName] = useState(null); // Состояние для названия оборудования

    const nameMap = {
        'home': 'Главная',
        'equipment': 'Медицинское оборудование',
        'documentation': 'Документация',
        'short-instruction' : "Краткая инструкция"
    };

    // Функция для получения названия оборудования по ID
    const fetchEquipmentName = async (id) => {
        try {
            const response = await getEnvironmentModelById(id);
            setEquipmentName(response.name || `Оборудование ${id}`); // Установка названия
        } catch (error) {
            console.error('Error fetching equipment name:', error);
            setEquipmentName(`Оборудование ${id}`); // Если ошибка, используем заглушку
        }
    };

    useEffect(() => {
        // Проверяем, есть ли параметр id в пути
        if (params.id) {
            fetchEquipmentName(params.id); // Вызываем функцию для получения названия
        }
    }, [params.id]); // Запускаем эффект при изменении параметра id

    return (
        <div className="crumbs">
            {pathnames.map((value, index) => {
                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                let displayName = nameMap[value] || value;

                // Если текущий путь содержит id, используем equipmentName
                if (value === params.id && equipmentName) {
                    displayName = equipmentName;
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