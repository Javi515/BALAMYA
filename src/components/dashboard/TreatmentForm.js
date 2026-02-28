import React, { useState } from 'react';
import { FaSave, FaPrint, FaDove, FaFileAlt } from 'react-icons/fa';
import styles from '../../styles/TreatmentForm.module.css';
import '../../styles/TreatmentFormPrint.css';
import buttonStyles from '../../styles/FormButtons.module.css';
import { useAuth } from '../../context/AuthContext';

import useTreatmentForm from '../../hooks/useTreatmentForm';
import ImageUploader from '../common/ImageUploader';

const TreatmentForm = ({ onBack, patient }) => {
    const { isSaved, handlePrint, handleSave } = useTreatmentForm();
    const { user } = useAuth();

    // Determine which variant(s) the user can see
    const userRole = user?.role || '';
    const isAdmin = userRole === 'admin';
    const isAves = userRole === 'aves';

    // Default variant based on role
    const getDefaultVariant = () => {
        if (isAves) return 'aves';
        if (isAdmin) return 'aves'; // Admin starts on aves
        return 'normal'; // All other roles default to normal
    };

    const [variant, setVariant] = useState(getDefaultVariant);

    // Dynamic Rows for Protocolo de Tratamiento (defaults to 6 rows)
    const [protocolRows, setProtocolRows] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ]);

    const addProtocolRow = () => {
        setProtocolRows([...protocolRows, { id: Date.now() }]);
    };

    const removeProtocolRow = (idToRemove) => {
        setProtocolRows(protocolRows.filter(row => row.id !== idToRemove));
    };

    // Dynamic Rows for Tratamiento Aplicado (Aves)
    const [appliedRowsAves, setAppliedRowsAves] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ]);

    const addAppliedRowAves = () => setAppliedRowsAves([...appliedRowsAves, { id: Date.now() }]);
    const removeAppliedRowAves = (idToRemove) => setAppliedRowsAves(appliedRowsAves.filter(row => row.id !== idToRemove));

    // Dynamic Rows for Tratamiento Aplicado (Normal)
    const [appliedRowsNormal, setAppliedRowsNormal] = useState([
        { id: 1 }, { id: 2 }, { id: 3 } // Each represents a 3-row block
    ]);

    const addAppliedRowNormal = () => setAppliedRowsNormal([...appliedRowsNormal, { id: Date.now() }]);
    const removeAppliedRowNormal = (idToRemove) => setAppliedRowsNormal(appliedRowsNormal.filter(row => row.id !== idToRemove));

    // Admin can toggle, others are locked
    const canToggle = isAdmin;

    return (
        <div className="flex flex-col gap-6">
            {/* Premium Floating Variant Selector (only for admin) */}
            {canToggle && (
                <div className="flex justify-center w-full no-print">
                    <div className="flex gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-md border border-gray-100">
                        <button
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${variant === 'normal' ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
                            onClick={() => setVariant('normal')}
                        >
                            <FaFileAlt /> General
                        </button>
                        <button
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${variant === 'aves' ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
                            onClick={() => setVariant('aves')}
                        >
                            <FaDove /> Aves
                        </button>
                    </div>
                </div>
            )}

            {/* Main Document Card */}
            <div className="card">
                <div className={styles['treatment-form']}>

                    {/* Encabezado */}
                    <div className={styles['treatment-header']} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
                        <ImageUploader placeholderText="Logo" className="header-logo-left no-print-placeholder" />
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <h1 style={{ fontSize: '1.2rem', margin: '0 0 5px 0' }}>Zoológico Regional Miguel Álvarez del Toro</h1>
                            <h2 style={{ fontSize: '1rem', fontStyle: 'italic', margin: '0 0 10px 0', color: '#555' }}>Clínica Veterinaria</h2>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0' }}>
                                {variant === 'aves'
                                    ? 'FORMATO DE TRATAMIENTO AVES'
                                    : 'FORMATO DE TRATAMIENTO'}
                            </h3>
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
                        <div className={styles['form-grid-4']}>
                            <div className={`${styles['form-group']} ${styles['compact']}`}>
                                <label>Sexo</label>
                                <select className={styles['form-input']}>
                                    <option value="">Seleccionar</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Hembra">Hembra</option>
                                    <option value="Indeterminado">Indeterminado</option>
                                </select>
                            </div>
                            <div className={`${styles['form-group']} ${styles['compact']}`}>
                                <label>Peso</label>
                                <input type="text" className={styles['form-input']} placeholder="kg" />
                            </div>
                            <div className={`${styles['form-group']} ${styles['compact']}`}>
                                <label>Edad</label>
                                <input type="text" className={styles['form-input']} placeholder="Edad" defaultValue={patient?.age ? `${patient.age} años` : ''} />
                            </div>
                            <div className={`${styles['form-group']} ${styles['compact']}`}>
                                <label>Ubicación</label>
                                <input type="text" className={styles['form-input']} placeholder="Ubicación" defaultValue={patient?.location || ''} />
                            </div>
                        </div>
                        <div className={styles['form-grid-2']}>
                            <div className={`${styles['form-group']} ${styles['compact']}`}>
                                <label>Identificación</label>
                                <input type="text" className={styles['form-input']} placeholder="ID del ejemplar" defaultValue={patient?.id || ''} />
                            </div>
                        </div>
                        <div className={`${styles['form-group']} ${styles['full-width']}`}>
                            <label>Anamnesis</label>
                            <textarea className={styles['form-input']} rows="2" placeholder="Anamnesis del paciente"></textarea>
                        </div>
                    </div>

                    {/* Impresiones Diagnósticas - SOLO variante Aves */}
                    {variant === 'aves' && (
                        <div className={styles['form-section']}>
                            <h4 className={styles['section-title']}>Impresiones Diagnósticas</h4>
                            <textarea className={`${styles['form-input']} ${styles['full-textarea']}`} rows="2" placeholder="Impresiones diagnósticas"></textarea>
                        </div>
                    )}

                    {/* Tabla de Protocolo de Tratamiento */}
                    <div className={styles['form-section']}>
                        <h4 className={styles['section-title']}>Protocolo de Tratamiento</h4>
                        <table className={styles['treatment-table']}>
                            <thead>
                                <tr>
                                    <th>Principio activo</th>
                                    <th>{variant === 'normal' ? 'Dosis mg/kg' : 'Dosis'}</th>
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
                                            <button
                                                className={styles['delete-row-btn']}
                                                onClick={() => removeProtocolRow(row.id)}
                                                title="Eliminar fila"
                                            >
                                                -
                                            </button>
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

                        {variant === 'aves' ? (
                            /* === VARIANTE AVES: Fecha, Hora, Tratamiento, Observaciones, Responsable === */
                            <>
                                <table className={`${styles['treatment-table']} ${styles['applied-table']}`}>
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Tratamiento</th>
                                            <th>Observaciones</th>
                                            <th>Responsable</th>
                                            <th className={`no-print ${styles['action-col']}`}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appliedRowsAves.map((row) => (
                                            <tr key={row.id} className={styles['protocol-row']}>
                                                <td><input type="date" className={styles['table-input']} /></td>
                                                <td><input type="time" className={styles['table-input']} /></td>
                                                <td><input type="text" className={`${styles['table-input']} ${styles['wide']}`} /></td>
                                                <td><input type="text" className={`${styles['table-input']} ${styles['wide']}`} /></td>
                                                <td><input type="text" className={styles['table-input']} /></td>
                                                <td className={`no-print ${styles['action-col']}`} style={{ verticalAlign: 'middle' }}>
                                                    <button className={styles['delete-row-btn']} onClick={() => removeAppliedRowAves(row.id)} title="Eliminar fila">-</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className={`no-print ${styles['add-row-container']}`}>
                                    <button className={styles['add-row-btn']} onClick={addAppliedRowAves}>
                                        + Agregar fila
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* === VARIANTE NORMAL: Fecha, Tratamiento aplicado (ancho), Responsable + filas Observaciones === */
                            <>
                                <table className={`${styles['treatment-table']} ${styles['applied-table']} ${styles['normal-applied-table']}`}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '100px' }}>Fecha</th>
                                            <th>Tratamiento aplicado</th>
                                            <th style={{ width: '120px' }}>Responsable</th>
                                            <th className={`no-print ${styles['action-col']}`}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appliedRowsNormal.map((row) => (
                                            <React.Fragment key={row.id}>
                                                <tr className={styles['protocol-row']}>
                                                    <td><input type="date" className={styles['table-input']} /></td>
                                                    <td><input type="text" className={`${styles['table-input']} ${styles['wide']}`} /></td>
                                                    <td><input type="text" className={styles['table-input']} /></td>
                                                    <td rowSpan="3" className={`no-print ${styles['action-col']}`} style={{ verticalAlign: 'middle', borderLeft: '1px solid #cbd5e1' }}>
                                                        <button className={styles['delete-row-btn']} onClick={() => removeAppliedRowNormal(row.id)} title="Eliminar bloque">-</button>
                                                    </td>
                                                </tr>
                                                <tr className={styles['protocol-row']}>
                                                    <td><input type="date" className={styles['table-input']} /></td>
                                                    <td><input type="text" className={`${styles['table-input']} ${styles['wide']}`} /></td>
                                                    <td><input type="text" className={styles['table-input']} /></td>
                                                </tr>
                                                <tr className={`${styles['observations-row']} ${styles['protocol-row']}`}>
                                                    <td colSpan="3">
                                                        <div className={styles['obs-label']}>Observaciones</div>
                                                        <input type="text" className={`${styles['table-input']} ${styles['wide']} ${styles['obs-input']}`} />
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                                <div className={`no-print ${styles['add-row-container']}`}>
                                    <button className={styles['add-row-btn']} onClick={addAppliedRowNormal}>
                                        + Agregar bloque
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Pie del formulario */}
                    <div className={styles['treatment-footer']}>
                        <div className={styles['footer-field']}>
                            <label>Responsable clínico:</label>
                            <div className={styles['signature-line']}></div>
                        </div>
                        <div className={`${styles['footer-field']} ${styles['right']}`}>
                            <label>Hoja:</label>
                            <input type="text" className={`${styles['form-input']} ${styles['small']}`} placeholder="No." />
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
        </div>
    );
};

export default TreatmentForm;
