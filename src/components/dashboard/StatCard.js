import React from 'react';
import Card from '../common/Card';
import styles from '../../styles/StatCard.module.css';

const StatCard = ({ title, value, subtitle, icon, iconType = "default" }) => {
  return (
    <Card className={styles['stat-card']}>
      <div className={`${styles['stat-icon-wrapper']} ${styles[`type-${iconType}`]}`}>
        {icon}
      </div>
      <div className={styles['stat-card-info']}>
        <div className={styles['stat-card-header']}>
          <span className={styles['stat-card-value']}>{value}</span>
          {subtitle && <span className={styles['stat-card-subtitle']}>{subtitle}</span>}
        </div>
        <span className={styles['stat-card-title']}>{title}</span>
      </div>
    </Card>
  );
};

export default StatCard;
