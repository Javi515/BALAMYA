import React from 'react';
import styles from '../../styles/PatientRow.module.css';

const PatientRow = ({ patient }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'estable':
        return styles['status-stable'];
      case 'saludable':
        return styles['status-healthy'];
      case 'crítico':
        return styles['status-critical'];
      default:
        return '';
    }
  };

  return (
    <tr className={styles['patient-row']}>
      <td>{patient.id}</td>

      <td>{patient.species}</td>
      <td>{patient.breed}</td>
      <td>{patient.age}</td>
      <td>
        <span className={`${styles['status-badge']} ${getStatusClass(patient.status)}`}>
          {patient.status}
        </span>
      </td>
    </tr>
  );
};

export default PatientRow;
