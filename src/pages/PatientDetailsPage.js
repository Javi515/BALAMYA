import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaPaw, FaSyringe, FaFileMedical, FaPrint, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { patients, MOCK_HISTORY } from '../data/mockData';
import RecordsTable from '../components/common/RecordsTable';
import '../styles/PatientDetails.css';

const PatientDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.initialTab || 'summary');

    // Find patient
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return (
            <div className="patient-details-container">
                <h2>Paciente no encontrado</h2>
                <button onClick={() => navigate('/patients')} className="btn-secondary">Volver</button>
            </div>
        );
    }

    // Filter history for this patient (Mock logic: matching by name since IDs don't link in mockData yet)
    // In production, match by patient.id
    const patientHistory = MOCK_HISTORY.filter(
        record => record.name === patient.name || record.commonName === patient.species // Fallback for demo
    );

    return (
        <div className="patient-details-container">
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigate('/patients')}>
                    <FaArrowLeft /> Volver a Pacientes
                </button>
            </div>

            {/* Hero Section */}
            <div className="patient-hero">
                <div className="patient-photo-large">
                    {patient.imageUrl ? (
                        <img
                            src={patient.imageUrl}
                            alt={patient.commonName}
                            className="patient-photo-img"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex'; // Show fallback
                            }}
                        />
                    ) : null}
                    {/* Fallback (shown if no image or error) */}
                    <div className="patient-photo-placeholder" style={{ display: patient.imageUrl ? 'none' : 'flex' }}>
                        <FaPaw />
                    </div>
                </div>

                <div className="patient-info-header">
                    <span className="patient-id-badge">ID: {patient.id}</span>
                    <h1 className="patient-name-large">{patient.commonName || 'Sin Nombre Común'}</h1>
                    <div className="patient-species-scientific">
                        {patient.breed} ({patient.species})
                    </div>
                    <div className={`patient-status-indicator status-${patient.status.toLowerCase()}`}>
                        ● {patient.status}
                    </div>
                </div>

                <div className="hero-actions">
                    <button className="action-btn btn-primary" onClick={() => navigate('/forms')}>
                        <FaSyringe /> Nuevo Registro
                    </button>
                    <button className="action-btn btn-secondary">
                        <FaEdit /> Editar Datos
                    </button>
                    <button className="action-btn btn-secondary">
                        <FaPrint /> Imprimir Ficha
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="patient-tabs">
                <button
                    className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
                    onClick={() => setActiveTab('summary')}
                >
                    Resumen
                </button>
                <button
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    Historial Médico
                </button>
                <button
                    className={`tab-btn ${activeTab === 'biometrics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('biometrics')}
                >
                    Biometría
                </button>
            </div>

            {/* Content */}
            <div className="tab-content">
                {activeTab === 'summary' && (
                    <div className="info-grid">
                        <div className="info-box">
                            <span className="info-label">Edad</span>
                            <div className="info-value">{patient.age} años</div>
                        </div>
                        <div className="info-box">
                            <span className="info-label">Sexo</span>
                            <div className="info-value">Macho</div> {/* Mock */}
                        </div>
                        <div className="info-box">
                            <span className="info-label">Ubicación Actual</span>
                            <div className="info-value">Recinto A-12</div> {/* Mock */}
                        </div>
                        <div className="info-box">
                            <span className="info-label">Dieta</span>
                            <div className="info-value">Carnívoro Estándar</div> {/* Mock */}
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div>
                        <h3 style={{ marginBottom: '20px' }}>Historial Clínico Completo</h3>
                        <RecordsTable records={patientHistory} />
                        {patientHistory.length === 0 && <p style={{ color: '#666', fontStyle: 'italic' }}>No hay registros médicos recientes para este paciente.</p>}
                    </div>
                )}

                {activeTab === 'biometrics' && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        <FaFileMedical size={40} style={{ marginBottom: '10px', color: '#cbd5e1' }} />
                        <p>Gráficas de peso y talla en desarrollo...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDetailsPage;
