
import { FaHome, FaPaw, FaHeartBroken, FaProcedures, FaFileMedical, FaClipboardList, FaStethoscope } from 'react-icons/fa';

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
        path: '/treatments',
        label: 'Tratamientos',
        icon: FaStethoscope,
        iconClass: 'icon-treatments'
    },
    {
        path: '/medical-history',
        label: 'Reportes Clínicos',
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
