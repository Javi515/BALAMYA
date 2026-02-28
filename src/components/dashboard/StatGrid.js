import React from 'react';
import StatCard from './StatCard';
import styles from '../../styles/StatGrid.module.css';

const StatGrid = () => {
  return (
    <div className={styles['stat-grid']}>
      <StatCard
        title="Población Total"
        value="150"
        iconType="primary"
        icon='🐾'
      />
      <StatCard
        title="Sanos"
        value="125"
        subtitle="83%"
        iconType="success"
        icon='💓'
      />
      <StatCard
        title="En Tratamiento"
        value="15"
        subtitle="10%"
        iconType="info"
        icon='🩺'
      />
      <StatCard
        title={"Cuarentena/\nHospital"}
        value="10"
        subtitle="7%"
        iconType="warning"
        icon='⚠️'
      />
      <StatCard
        title="Fallecidos"
        value="3"
        iconType="danger"
        icon='🕊️'
      />
    </div>
  );
};

export default StatGrid;
