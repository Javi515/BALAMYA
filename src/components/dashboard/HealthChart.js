import React from 'react';
import Card from '../common/Card';
import { healthStatus } from '../../data/mockData';
import '../../styles/HealthChart.css';

const HealthChart = () => {
  const { healthy, stable, critical } = healthStatus;
  const total = healthy + stable + critical;

  const conicGradient = `conic-gradient(
    #4CAF50 0% ${((healthy / total) * 100).toFixed(2)}%,
    #FFC107 ${((healthy / total) * 100).toFixed(2)}% ${(
    ((healthy + stable) / total) *
    100
  ).toFixed(2)}%,
    #F44336 ${(
      (((healthy + stable) / total) * 100).toFixed(2)
    )}% 100%
  )`;

  return (
    <Card className="health-chart-card">
      <h3 className="health-chart-title">Estado de Salud General</h3>
      <div className="health-chart-container">
        <div className="health-chart" style={{ background: conicGradient }}></div>
        <div className="health-chart-legend">
          <div className="legend-item">
            <span className="legend-color healthy"></span>
            Saludable ({healthy}%)
          </div>
          <div className="legend-item">
            <span className="legend-color stable"></span>
            Estable ({stable}%)
          </div>
          <div className="legend-item">
            <span className="legend-color critical"></span>
            Crítico ({critical}%)
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HealthChart;
