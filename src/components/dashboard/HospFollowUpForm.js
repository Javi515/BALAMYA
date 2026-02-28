import React, { useState } from 'react';
import { FaSave, FaPrint } from 'react-icons/fa';
import styles from '../../styles/HospFollowUpForm.module.css';
import '../../styles/HospFollowUpFormPrint.css';

import useHospFollowUpForm from '../../hooks/useHospFollowUpForm';
import ImageUploader from '../common/ImageUploader';

const HospFollowUpForm = ({ onBack, patient }) => {
    const { isSaved, handlePrint, handleSave } = useHospFollowUpForm();

    // Dynamic Rows for Seguimiento Hospitalizado
    const [hospRows, setHospRows] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
        { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }
    ]);

    const addHospRow = () => setHospRows([...hospRows, { id: Date.now() }]);
    const removeHospRow = (idToRemove) => setHospRows(hospRows.filter(row => row.id !== idToRemove));

    return (
        <div className={styles['card']}>
            <div className={styles['hosp-followup-form']}>

                {/* Encabezado */}
                <div className={styles['hosp-header']} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
                    <ImageUploader placeholderText="Logo" className="header-logo-left no-print-placeholder" />
                    <div className={styles['hosp-header-center']} style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>
                            COORDINACIÓN ESTATAL<br />
                            CURADURÍA GENERAL DE NUTRICIÓN Y SALUD ANIMAL
                        </div>
                        <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>FORMATO DE SEGUIMIENTO DE PACIENTES HOSPITALIZADOS EN CLÍNICA VETERINARIA</h3>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            Calzada Cerro Hueco S/N, Col. El Zapotal, C.P. 29094, Tuxtla Gutiérrez, Chiapas
                        </div>
                    </div>
                    <ImageUploader placeholderText="Logo" className="header-logo-right no-print-placeholder" />
                </div>

                {/* Datos del formulario */}
                <div className={styles['hosp-data-row']}>
                    <div className={styles['hosp-field']}>
                        <label>Fecha:</label>
                        <input type="date" className={styles['form-input']} />
                    </div>
                    <div className={styles['hosp-field']}>
                        <label>Responsable:</label>
                        <input type="text" className={styles['form-input']} placeholder="Nombre del responsable" />
                    </div>
                </div>

                {/* Tabla de seguimiento */}
                <div className={styles['form-section']}>
                    <table className={styles['hosp-table']}>
                        <thead>
                            <tr>
                                <th rowSpan="2" className={styles['th-patient']}>Paciente<br /><small>Nombre / ID</small></th>
                                <th>Hora</th>
                                <th>Peso</th>
                                <th>F.C.</th>
                                <th>F.R.</th>
                                <th>Temp.</th>
                                <th>Pulso</th>
                                <th>Mucosas</th>
                                <th>TLLC</th>
                                <th className={styles['th-obs']}>Observaciones</th>
                                <th className={`no-print ${styles['action-col']}`}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospRows.map((row) => (
                                <tr key={row.id} className={styles['protocol-row']}>
                                    <td className={styles['td-patient']}>
                                        <input type="text" className={styles['table-input']} placeholder="" />
                                    </td>
                                    <td><input type="time" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={styles['table-input']} /></td>
                                    <td><input type="text" className={`${styles['table-input']} ${styles['wide']}`} /></td>
                                    <td className={`no-print ${styles['action-col']}`} style={{ verticalAlign: 'middle' }}>
                                        <button className={styles['delete-row-btn']} onClick={() => removeHospRow(row.id)} title="Eliminar fila">-</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`no-print ${styles['add-row-container']}`}>
                        <button className={styles['add-row-btn']} onClick={addHospRow}>
                            + Agregar fila
                        </button>
                    </div>
                </div>

                {/* Botones */}
                <div className={styles['form-actions']}>
                    {!isSaved ? (
                        <button className={`${styles['form-button']} ${styles['save-btn']}`} onClick={handleSave}>
                            <FaSave /> Guardar
                        </button>
                    ) : (
                        <button className={`${styles['form-button']} ${styles['secondary-btn']}`} onClick={handlePrint}>
                            <FaPrint /> Imprimir
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default HospFollowUpForm;
