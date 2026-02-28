import React, { useState } from 'react';
import { FaSave, FaPrint } from 'react-icons/fa';
import styles from '../../styles/TreatmentForm.module.css';
import '../../styles/TreatmentFormPrint.css';
import buttonStyles from '../../styles/FormButtons.module.css';

import useTreatmentForm from '../../hooks/useTreatmentForm';
import ImageUploader from '../common/ImageUploader';

const GroupTreatmentForm = ({ onBack, patient }) => {
    const { isSaved, handlePrint, handleSave } = useTreatmentForm();

    // Dynamic Rows for Protocolo de Tratamiento
    const [protocolRows, setProtocolRows] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
    ]);

    const addProtocolRow = () => setProtocolRows([...protocolRows, { id: Date.now() }]);
    const removeProtocolRow = (idToRemove) => setProtocolRows(protocolRows.filter(row => row.id !== idToRemove));

    // Dynamic Rows for Tratamiento Aplicado
    const [appliedRows, setAppliedRows] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }
    ]);

    const addAppliedRow = () => setAppliedRows([...appliedRows, { id: Date.now() }]);
    const removeAppliedRow = (idToRemove) => setAppliedRows(appliedRows.filter(row => row.id !== idToRemove));

    return (
        <div className="card">
            <div className={styles['treatment-form']}>

                {/* Encabezado */}
                <div className={styles['treatment-header']} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
                    <ImageUploader placeholderText="Logo" className="header-logo-left no-print-placeholder" />
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <h1 style={{ fontSize: '1.2rem', margin: '0 0 5px 0' }}>Zoológico Regional Miguel Álvarez del Toro</h1>
                        <h2 style={{ fontSize: '1rem', fontStyle: 'italic', margin: '0 0 10px 0', color: '#555' }}>Clínica Veterinaria</h2>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0' }}>FORMATO DE TRATAMIENTO GRUPAL</h3>
                    </div>
                    <ImageUploader placeholderText="Logo" className="header-logo-right no-print-placeholder" />
                </div>

                {/* Datos Generales */}
                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>Datos Generales</h4>
                    <div className={styles['form-grid-2']}>
                        <div className={`${styles['form-group']} ${styles['compact']}`}>
                            <label>Nombre científico</label>
                            <input type="text" className={styles['form-input']} placeholder="Nombre científico" defaultValue={patient?.scientificName || ''} />
                        </div>
                        <div className={`${styles['form-group']} ${styles['compact']}`}>
                            <label>Nombre común</label>
                            <input type="text" className={styles['form-input']} placeholder="Nombre común" defaultValue={patient?.commonName || ''} />
                        </div>
                    </div>
                    <div className={styles['form-grid-2']}>
                        <div className={`${styles['form-group']} ${styles['compact']}`}>
                            <label>Ubicación</label>
                            <input type="text" className={styles['form-input']} placeholder="Ubicación" defaultValue={patient?.location || ''} />
                        </div>
                        <div className={`${styles['form-group']} ${styles['compact']}`}>
                            <label>No de ejemplares</label>
                            <input type="number" className={styles['form-input']} placeholder="Cantidad" />
                        </div>
                    </div>
                    <div className={`${styles['form-group']} ${styles['full-width']}`}>
                        <label>Anamnesis/motivo del tratamiento</label>
                        <textarea className={styles['form-input']} rows="2" placeholder="Anamnesis o motivo del tratamiento"></textarea>
                    </div>
                </div>

                {/* Tabla de Protocolo de Tratamiento */}
                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>Protocolo de Tratamiento</h4>
                    <table className={styles['treatment-table']}>
                        <thead>
                            <tr>
                                <th>Principio activo</th>
                                <th>Dosis mg/kg</th>
                                <th>Producto comercial</th>
                                <th>Cantidad a aplicar</th>
                                <th>Vía de admón.</th>
                                <th>Frecuencia</th>
                                <th>No de días</th>
                                <th className={`no-print ${styles['action-col']}`}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {protocolRows.map((row) => (
                                <tr key={row.id} className={styles['protocol-row']}>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td className={`no-print ${styles['action-col']}`} style={{ verticalAlign: 'middle' }}>
                                        <button className={styles['delete-row-btn']} onClick={() => removeProtocolRow(row.id)} title="Eliminar fila">-</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`no-print ${styles['add-row-container']}`}>
                        <button className={styles['add-row-btn']} onClick={addProtocolRow}>
                            + Agregar fila
                        </button>
                    </div>
                </div>

                {/* Tabla de Tratamiento Aplicado */}
                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>Tratamiento Aplicado</h4>
                    <table className={`${styles['treatment-table']} ${styles['applied-table']}`}>
                        <thead>
                            <tr>
                                <th style={{ width: '100px' }}>Fecha</th>
                                <th>Tratamiento aplicado</th>
                                <th className={`no-print ${styles['action-col']}`}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliedRows.map((row) => (
                                <tr key={row.id} className={styles['protocol-row']}>
                                    <td><input type="date" className={styles['table-input']} /></td>
                                    <td><input type="text" className={`${styles['table-input']} ${styles['wide']}`} /></td>
                                    <td className={`no-print ${styles['action-col']}`} style={{ verticalAlign: 'middle' }}>
                                        <button className={styles['delete-row-btn']} onClick={() => removeAppliedRow(row.id)} title="Eliminar fila">-</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`no-print ${styles['add-row-container']}`}>
                        <button className={styles['add-row-btn']} onClick={addAppliedRow}>
                            + Agregar fila
                        </button>
                    </div>
                </div>

                {/* Observaciones */}
                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>Observaciones</h4>
                    <textarea className={`${styles['form-input']} ${styles['full-textarea']}`} rows="3" placeholder="Observaciones generales"></textarea>
                </div>

                {/* Pie del formulario */}
                <div className={styles['treatment-footer']}>
                    <div className={styles['footer-field']}>
                        <label>Responsable clínico:</label>
                        <div className={styles['signature-line']}></div>
                    </div>
                </div>

                {/* Botones */}
                <div className={buttonStyles['form-actions']}>
                    {!isSaved ? (
                        <button className={`form-button save-btn`} onClick={handleSave}>
                            <FaSave /> Guardar
                        </button>
                    ) : (
                        <button className={`form-button secondary-btn`} onClick={handlePrint}>
                            <FaPrint /> Imprimir
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default GroupTreatmentForm;
