import React from 'react';
import StatCard from './StatCard';
import '../../styles/StatGrid.css';

const StatGrid = () => {
  return (
    <div className="stat-grid">
      <StatCard 
        title="Población Total" 
        value="150" 
        styleType="primary"
        icon='🐾'
      />
      <StatCard 
        title="Sanos" 
        value="125" 
        subtitle="83%"
        icon='💓'
      />
      <StatCard 
        title="En Tratamiento" 
        value="15" 
        subtitle="10%"
        icon='🩺'
      />
     <StatCard 
    title={"Cuarentena/\nHospital"} 
    value="10" 
    subtitle="7%" 
    icon='⚠️' 
/>
      <StatCard 
        title="Fallecidos" 
        value="3" 
        icon='🕊️'
      />
    </div>
  );
};

export default StatGrid;
