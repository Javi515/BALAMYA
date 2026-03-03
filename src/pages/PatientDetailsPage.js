import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaPaw, FaSyringe, FaPrint, FaEdit, FaArrowLeft, FaSkull, FaPlus } from 'react-icons/fa';
import { patients, MOCK_HISTORY } from '../data/mockData';
import RecordsTable from '../components/common/RecordsTable';
import styles from '../styles/PatientDetails.module.css';

const PatientDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.initialTab || 'summary');

    // Detectamos si la URL actual pertenece a la sección de "Bajas"
    const isBajasView = location.pathname.includes('/casualties') || location.pathname.includes('/bajas');

    // Buscar al paciente
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return (
            <div className={styles['patient-details-container']}>
                <h2>Paciente no encontrado</h2>
                <button onClick={() => navigate('/patients')} className={styles['btn-secondary']}>Volver</button>
            </div>
        );
    }

    // Filtrar el historial
    const patientHistory = MOCK_HISTORY.filter(
        record => record.name === patient.name || record.commonName === patient.species
    ).map(record => ({ ...record, patientId: patient.id }));

    // NUEVO: Función para manejar el clic en "Reportar Muerte"
    const handleReportDeath = () => {
        // Usamos URLSearchParams para construir los parámetros de forma limpia y segura
        const queryParams = new URLSearchParams({
            form: 'necropsy',
            animalName: patient.id, // CAMBIO: Usamos el ID para asegurar que useFormsPage lo encuentre
            origin: 'history',
            patientId: patient.id
        }).toString();

        // Navegamos a la ruta de formularios con los parámetros adjuntos
        navigate(`/forms?${queryParams}`);
    };

    return (
        <div className={styles['patient-details-container']}>
            <div className={styles['back-button-container']}>
                <button className={styles['back-button']} onClick={() => navigate(isBajasView ? '/casualties' : '/patients')}>
                    <FaArrowLeft /> {isBajasView ? 'Volver a Bajas' : 'Volver a Pacientes'}
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
                    {/* Fallback */}
                    <div className={styles['patient-photo-placeholder']} style={{ display: patient.imageUrl ? 'none' : 'flex' }}>
                        <FaPaw />
                    </div>
                </div>

                <div className={styles['patient-info-header']}>
                    <span className={styles['patient-id-badge']}>ID: {patient.id}</span>
                    <h1 className={styles['patient-name-large']}>{patient.commonName || 'Sin Nombre Común'}</h1>
                    <div className={styles['patient-species-scientific']}>
                        {patient.species}
                    </div>
                    <div className={`${styles['patient-status-indicator']} ${styles[`status-${patient.status.toLowerCase()}`]}`}>
                        ● {patient.status}
                    </div>
                </div>

                {/* Botones de acción */}
                {!isBajasView && (
                    <div className={styles['patient-actions-group']}>
                        <button
                            className={`${styles['action-button']} ${styles['btn-new']}`}
                            onClick={() => navigate(`/forms?animalName=${patient.id}&origin=history&patientId=${patient.id}`)}
                        >
                            <FaPlus /> Nuevo Registro
                        </button>
                        <button className={`${styles['action-button']} ${styles['btn-edit']}`}>
                            <FaEdit /> Editar Registro
                        </button>
                        {/* MODIFICADO: Agregamos el evento onClick aquí */}
                        <button
                            className={`${styles['action-button']} ${styles['btn-danger']}`}
                            onClick={handleReportDeath}
                        >
                            <FaSkull /> Dar de baja
                        </button>
                    </div>
                )}
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
                            <div className={styles['info-value']}>{patient.sex || 'No definido'}</div>
                        </div>
                        <div className={styles['info-box']}>
                            <span className={styles['info-label']}>Ubicación Actual</span>
                            <div className={styles['info-value']}>{patient.location}</div>
                        </div>
                        <div className={styles['info-box']}>
                            <span className={styles['info-label']}>Dieta</span>
                            <div className={styles['info-value']}>{patient.diet || 'Consultar veterinario'}</div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div>
                        <h3 style={{ marginBottom: '10px', marginTop: 0 }}>Historial Clínico Completo</h3>
                        <RecordsTable records={patientHistory} viewMode="table" />
                        {patientHistory.length === 0 && <p style={{ color: '#666', fontStyle: 'italic' }}>No hay registros médicos recientes para este paciente.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDetailsPage;