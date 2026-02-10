import React from 'react';

// IMPORTACIONES DE COMPONENTES
// Usamos "../" (un nivel) porque 'pages' y 'components' son vecinos en 'src'
import StatGrid from '../components/dashboard/StatGrid';
import HealthChart from '../components/dashboard/HealthChart';
import PatientList from '../components/dashboard/PatientList'; 

// IMPORTACIÓN DE ESTILOS DE LA PÁGINA
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Control de la Colección Animal</h2>
      
      {/* Fila de Tarjetas Superiores */}
      <StatGrid />
      
      {/* Contenedor dividido: Gráfico a la izq, Lista a la der */}
      <div className="dashboard-widgets">
        <div className="widget-wrapper">
          <HealthChart />
        </div>
        <div className="widget-wrapper">
          <PatientList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;