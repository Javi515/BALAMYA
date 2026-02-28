
import { FaHome, FaPaw, FaHeartBroken, FaProcedures, FaFileMedical, FaClipboardList } from 'react-icons/fa';

export const sidebarLinks = [
    {
        path: '/dashboard',
        label: 'Inicio',
        icon: FaHome,
        iconClass: 'icon-home'
    },
    {
        path: '/patients',
        label: 'Pacientes',
        icon: FaPaw,
        iconClass: 'icon-patients'
    },
    {
        path: '/casualties',
        label: 'Bajas',
        icon: FaHeartBroken,
        iconClass: 'icon-casualties'
    },
    {
        path: '/hospitalization',
        label: 'Hospitalizados',
        icon: FaProcedures,
        iconClass: 'icon-hospitalized'
    },
    {
        path: '/medical-history',
        label: 'Historial Clínico',
        icon: FaFileMedical,
        iconClass: 'icon-history'
    },
    {
        path: '/forms',
        label: 'Herramientas',
        icon: FaClipboardList,
        iconClass: 'icon-forms'
    }
];
