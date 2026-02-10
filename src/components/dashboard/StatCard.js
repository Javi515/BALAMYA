import React from 'react';
import Card from '../common/Card';
import '../../styles/StatCard.css';

const StatCard = ({ title, value, icon }) => {
  return (
    <Card className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-card-info">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-value">{value}</span>
      </div>
    </Card>
  );
};

export default StatCard;
