import React from 'react';
import { FaNotesMedical, FaStethoscope, FaSyringe } from 'react-icons/fa';
import '../../styles/RecordsTable.css';

const RecordsTable = ({ records }) => {

    // Helpers for Icons (Moved inside component for modularity)
    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'aves': return '🦅';
            case 'mamiferos': return '🐆';
            case 'reptiles': return '🐍';
            case 'anfibios': return '🐸';
            default: return '🐾';
        }
    };

    const getProcedureIcon = (type) => {
        if (type.includes('Vacuna')) return <FaSyringe className="text-blue-500" />;
        if (type.includes('Revisión')) return <FaStethoscope className="text-green-500" />;
        return <FaNotesMedical className="text-gray-500" />;
    };

    return (
        <div className="records-container">
            <div className="records-header-info">
                <h3 className="text-xl font-bold text-gray-700">Registros Encontrados</h3>
                <span className="records-count-badge">{records.length} RESULTADOS</span>
            </div>

            <table className="records-table">
                <thead>
                    <tr>
                        <th>ID Expediente</th>
                        <th>Nombre Común</th>
                        <th>Especie</th>
                        <th>Ubicación</th>
                        <th>Fecha</th>
                        <th>Veterinario</th>
                        <th>Procedimiento</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {records.length > 0 ? (
                        records.map((record) => (
                            <tr key={record.id}>
                                <td><span style={{ fontWeight: 'bold', color: '#333', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{record.id}</span></td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={`species-icon-circle bg-${record.category}`}>
                                            {getCategoryIcon(record.category)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{record.commonName || 'Sin Nombre Común'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ fontStyle: 'italic', color: '#555' }}>{record.scientificName}</td>
                                <td><span style={{ fontSize: '0.85rem', color: '#00695c', background: '#e0f2f1', padding: '3px 8px', borderRadius: '12px' }}>{record.location}</span></td>
                                <td>{record.date}</td>
                                <td>
                                    <div style={{ fontWeight: '500' }}>{record.doctor}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {getProcedureIcon(record.type)}
                                        {record.type}
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${record.status === 'Normal' || record.status === 'Alta' ? 'status-normal' : record.status === 'Observación' ? 'status-observation' : 'status-critical'}`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td>
                                    <button style={{ color: '#3f51b5', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem', width: '100%', textAlign: 'center' }}>
                                        Ver Expediente
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                No se encontraron registros que coincidan con tu búsqueda.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecordsTable;
