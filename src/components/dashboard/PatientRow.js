import React from 'react';
import '../../styles/PatientRow.css';

const PatientRow = ({ patient }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'estable':
        return 'status-stable';
      case 'saludable':
        return 'status-healthy';
      case 'crítico':
        return 'status-critical';
      default:
        return '';
    }
  };

  return (
    <tr className="patient-row">
      <td>{patient.id}</td>

      <td>{patient.species}</td>
      <td>{patient.breed}</td>
      <td>{patient.age}</td>
      <td>
        <span className={`status-badge ${getStatusClass(patient.status)}`}>
          {patient.status}
        </span>
      </td>
    </tr>
  );
};

export default PatientRow;
