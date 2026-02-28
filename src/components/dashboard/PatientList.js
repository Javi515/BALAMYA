import React from 'react';
import Card from '../common/Card';
import PatientRow from './PatientRow';
import { patients } from '../../data/mockData';
import styles from '../../styles/PatientList.module.css';

const PatientList = () => {
  return (
    <Card className={styles['patient-list-card']}>
      <h3 className={styles['dashboard-section-title']}>Pacientes Recientes</h3>
      <div className={styles['table-responsive-container']}>
        <table className={styles['patient-list-table']}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {patients.slice(0, 5).map((patient) => (
              <PatientRow key={patient.id} patient={patient} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PatientList;
