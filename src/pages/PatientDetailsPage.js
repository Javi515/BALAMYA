import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaPaw, FaSyringe, FaPrint, FaEdit, FaArrowLeft, FaSkull } from 'react-icons/fa';
import { patients, MOCK_HISTORY } from '../data/mockData';
import RecordsTable from '../components/common/RecordsTable';
import styles from '../styles/PatientDetails.module.css';

const PatientDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.initialTab || 'summary');

    // Find patient
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return (
            <div className={styles['patient-details-container']}>
                <h2>Paciente no encontrado</h2>
                <button onClick={() => navigate('/patients')} className={styles['btn-secondary']}>Volver</button>
            </div>
        );
    }

    // Filter history for this patient (Mock logic: matching by name since IDs don't link in mockData yet)
    // In production, match by patient.id
    const patientHistory = MOCK_HISTORY.filter(
        record => record.name === patient.name || record.commonName === patient.species // Fallback for demo
    );

    return (
        <div className={styles['patient-details-container']}>
            <div className={styles['back-button-container']}>
                <button className={styles['back-button']} onClick={() => navigate('/patients')}>
                    <FaArrowLeft /> Volver a Pacientes
                </button>
            </div>

            {/* Hero Section */}
            <div className={styles['patient-hero']}>
                <div className={styles['patient-photo-large']}>
                    {patient.imageUrl ? (
                        <img
                            src={patient.imageUrl}
                            alt={patient.commonName}
                            className={styles['patient-photo-img']}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex'; // Show fallback
                            }}
                        />
                    ) : null}
                    {/* Fallback (shown if no image or error) */}
                    <div className={styles['patient-photo-placeholder']} style={{ display: patient.imageUrl ? 'none' : 'flex' }}>
                        <FaPaw />
                    </div>
                </div>

                <div className={styles['patient-info-header']}>
                    <span className={styles['patient-id-badge']}>ID: {patient.id}</span>
                    <h1 className={styles['patient-name-large']}>{patient.commonName || 'Sin Nombre Común'}</h1>
                    <div className={styles['patient-species-scientific']}>
                        {patient.breed} ({patient.species})
                    </div>
                    <div className={`${styles['patient-status-indicator']} ${styles[`status-${patient.status.toLowerCase()}`]}`}>
                        ● {patient.status}
                    </div>
                </div>


            </div>

            {/* Tabs */}
            <div className={styles['patient-tabs']}>
                <button
                    className={`${styles['tab-btn']} ${activeTab === 'summary' ? styles.active : ''}`}
                    onClick={() => setActiveTab('summary')}
                >
                    Resumen
                </button>
                <button
                    className={`${styles['tab-btn']} ${activeTab === 'history' ? styles.active : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    Historial Médico
                </button>

            </div>

            {/* Content */}
            <div className={styles['tab-content']}>
                {activeTab === 'summary' && (
                    <div className={styles['info-grid']}>
                        <div className={styles['info-box']}>
                            <span className={styles['info-label']}>Edad</span>
                            <div className={styles['info-value']}>{patient.age} años</div>
                        </div>
                        <div className={styles['info-box']}>
                            <span className={styles['info-label']}>Sexo</span>
                            <div className={styles['info-value']}>Macho</div> {/* Mock */}
                        </div>
                        <div className={styles['info-box']}>
                            <span className={styles['info-label']}>Ubicación Actual</span>
                            <div className={styles['info-value']}>Recinto A-12</div> {/* Mock */}
                        </div>
                        <div className={styles['info-box']}>
                            <span className={styles['info-label']}>Dieta</span>
                            <div className={styles['info-value']}>Carnívoro Estándar</div> {/* Mock */}
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div>
                        <h3 style={{ marginBottom: '20px' }}>Historial Clínico Completo</h3>
                        <RecordsTable records={patientHistory} viewMode="table" />
                        {patientHistory.length === 0 && <p style={{ color: '#666', fontStyle: 'italic' }}>No hay registros médicos recientes para este paciente.</p>}
                    </div>
                )}


            </div>
        </div>
    );
};

export default PatientDetailsPage;
