import React from 'react';
import Card from '../common/Card';
import { healthStatus } from '../../data/mockData';
import styles from '../../styles/HealthChart.module.css';

const HealthChart = () => {
  const { healthy, stable, critical } = healthStatus;
  const total = healthy + stable + critical;

  // Modern colors: Emerald (Healthy), Amber (Stable), Rose (Critical)
  const conicGradient = `conic-gradient(
    #10b981 0% ${((healthy / total) * 100).toFixed(2)}%,
    #f59e0b ${((healthy / total) * 100).toFixed(2)}% ${(
      ((healthy + stable) / total) *
      100
    ).toFixed(2)}%,
    #ef4444 ${(
      (((healthy + stable) / total) * 100).toFixed(2)
    )}% 100%
  )`;

  return (
    <Card className={styles['health-chart-card']}>
      <h3 className={styles['dashboard-section-title']}>Estado de Salud General</h3>
      <div className={styles['health-chart-container']}>
        <div className={styles['health-chart-wrapper']}>
          <div className={styles['health-chart']} style={{ background: conicGradient }}>
            <div className={styles['inner-circle']}>
              <span className={styles['inner-total']}>{total}</span>
              <span className={styles['inner-label']}>Total</span>
            </div>
          </div>
        </div>
        <div className={styles['health-chart-legend']}>
          <div className={styles['legend-item']}>
            <span className={`${styles['legend-color']} ${styles['healthy']}`}></span>
            <span className={styles['legend-text']}>Saludable <span className={styles['legend-perc']}>({healthy}%)</span></span>
          </div>
          <div className={styles['legend-item']}>
            <span className={`${styles['legend-color']} ${styles['stable']}`}></span>
            <span className={styles['legend-text']}>Estable <span className={styles['legend-perc']}>({stable}%)</span></span>
          </div>
          <div className={styles['legend-item']}>
            <span className={`${styles['legend-color']} ${styles['critical']}`}></span>
            <span className={styles['legend-text']}>Crítico <span className={styles['legend-perc']}>({critical}%)</span></span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HealthChart;
