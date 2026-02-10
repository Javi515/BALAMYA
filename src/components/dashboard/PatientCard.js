import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaIdCard, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';
import '../../styles/PatientCard.css';

const PatientCard = ({ patient }) => {
    const navigate = useNavigate();

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'estable': return 'status-stable';
            case 'saludable': return 'status-healthy';
            case 'crítico': return 'status-critical';
            case 'observación': return 'status-observation';
            default: return '';
        }
    };

    const handleImageError = (e) => {
        e.target.src = 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800'; // Fallback cat image
    };

    const handleViewProfile = () => {
        navigate(`/patients/${patient.id}`);
    };

    const handleViewHistory = () => {
        navigate(`/patients/${patient.id}`, { state: { initialTab: 'history' } });
    };

    const getSpeciesLabel = (category) => {
        if (!category) return '';
        const map = {
            'mamiferos': 'Mamífero',
            'aves': 'Ave',
            'reptiles': 'Reptil',
            'anfibios': 'Anfibio'
        };
        return map[category.toLowerCase()] || category;
    };

    return (
        <div className="patient-card">
            <div className="patient-card-header">
                <img
                    src={patient.imageUrl || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800'}
                    alt={patient.name}
                    className="patient-image"
                    onError={handleImageError}
                />
                <div className="patient-id-badge">ID: {patient.id}</div>
                {patient.isQuarantine && (
                    <div className="special-badge">
                        <FaExclamationTriangle /> Cuarentena
                    </div>
                )}
            </div>

            <div className="patient-card-body">
                <div className="patient-info-header">
                    <div className="name-status-row">
                        <h3 className="patient-name">{patient.commonName || 'Sin Nombre Común'}</h3>
                        <span className={`patient-status-badge-inline ${getStatusClass(patient.status)}`}>
                            {patient.status || 'Desconocido'}
                        </span>
                    </div>
                    <div className="scientific-species-row">
                        <p className="patient-scientific-name">{patient.scientificName}</p>
                        <span className="patient-species-label">{getSpeciesLabel(patient.category)}</span>
                    </div>
                </div>

                <div className="patient-stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">EDAD</span>
                        <span className="stat-value">{patient.age || 'N/A'} años</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">SEXO</span>
                        <span className="stat-value">{patient.sex || 'N/A'}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">PESO</span>
                        <span className="stat-value">{patient.weight ? `${patient.weight} kg` : 'N/A'}</span>
                    </div>
                </div>

                <div className="patient-footer">
                    <div className="location-info">
                        <FaMapMarkerAlt />
                        <span>{patient.location}</span>
                    </div>
                    <div className="card-actions">
                        <button className="action-btn" title="Expediente" onClick={handleViewProfile}>
                            <FaIdCard />
                        </button>
                        <button className="action-btn" title="Historia Clínica" onClick={handleViewHistory}>
                            <FaClipboardList />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientCard;
