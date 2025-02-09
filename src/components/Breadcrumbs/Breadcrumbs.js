import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Breadcrumbs = () => {
    const location = useLocation();
    const params = useParams();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const pathnames = location.pathname.split('/').filter(x => x);
        const crumbs = pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            // Задаём названия для маршрутов
            const nameMap = {
                'home': 'Главная',
                'equipment': 'Медицинское оборудование',
                'documentation': 'Документация',
                [params.id]: `Оборудование - ${params.id}`
            };

            return {
                name: nameMap[value] || value,
                path: to
            };
        });

        setBreadcrumbs(crumbs);
    }, [location, params]);

    return (
        <div className="crumbs">
            {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                    <Link to={crumb.path}>{crumb.name}</Link>
                    {index < breadcrumbs.length - 1 && ' - '}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;