import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ImageUploader from '../../common/ImageUploader';
import styles from '../../../styles/AnesthesiaForm.module.css';

const AnesthesiaSheet1 = ({
    step,
    patient,
    protocolRows,
    addProtocolRow,
    removeProtocolRow,
    handleNext
}) => {
    return (
        <div className={`${styles['form-page']} ${step === 1 ? styles.active : ''}`} id="anesthesia-hoja1">
            {/* Encabezado */}
            <div className={styles['anesthesia-header']} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
                <ImageUploader placeholderText="Logo" className="header-logo-left no-print-placeholder" />
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.2rem', margin: '0 0 5px 0' }}>Zoológico Regional Miguel Álvarez del Toro</h1>
                    <h2 style={{ fontSize: '1rem', fontStyle: 'italic', margin: '0 0 10px 0', color: '#555' }}>Clínica Veterinaria</h2>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0' }}>REGISTRO DE ANESTESIA</h3>
                </div>
                <ImageUploader placeholderText="Logo" className="header-logo-right no-print-placeholder" />
            </div>

            <p className={styles['page-indicator']}>Registro de Anestesia - Hoja 1</p>

            {/* Datos Generales */}
            <div className={styles['form-section']}>
                <h4 className={styles['section-title']}>Datos Generales</h4>
                <div className={styles['form-grid-4']}>
                    <div className={styles['form-group']}>
                        <label>Fecha</label>
                        <input type="date" className={styles['form-input']} />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Especie</label>
                        <input type="text" className={styles['form-input']} placeholder="Especie" defaultValue={patient?.scientificName || ''} />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Identificación</label>
                        <input type="text" className={styles['form-input']} placeholder="ID del ejemplar" defaultValue={patient?.id || ''} />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Sexo</label>
                        <select className={styles['form-input']}>
                            <option value="">Seleccionar</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                            <option value="Indeterminado">Indeterminado</option>
                        </select>
                    </div>
                </div>
                <div className={styles['form-grid-4']}>
                    <div className={styles['form-group']}>
                        <label>Peso (último registrado)</label>
                        <input type="text" className={styles['form-input']} placeholder="kg" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Peso actualizado</label>
                        <input type="text" className={styles['form-input']} placeholder="kg" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Edad</label>
                        <input type="text" className={styles['form-input']} placeholder="Edad" defaultValue={patient?.age ? `${patient.age} años` : ''} />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Método de administración</label>
                        <select className={styles['form-input']}>
                            <option value="">Seleccionar</option>
                            <option value="Cerbatana">Cerbatana</option>
                            <option value="Rifle">Rifle</option>
                            <option value="Inyección directa">Inyección directa</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Procedimiento */}
            <div className={styles['form-section']}>
                <h4 className={styles['section-title']}>Procedimiento a realizar</h4>
                <textarea className={styles['form-textarea']} rows="2" placeholder="Describir el procedimiento..." />
            </div>

            {/* Estado Físico y Fisiológico */}
            <div className={styles['form-section']}>
                <div className={styles['two-column-layout']}>
                    <div className="column">
                        <h4 className={styles['section-title']}>Clasificación del Estado Físico Actual</h4>
                        <div className={styles['radio-group']}>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisico" value="1" /> Clase 1 (Saludable)</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisico" value="2" /> Clase 2 (Enfermo)</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisico" value="3" /> Clase 3 (Enfermedad sistémica grave)</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisico" value="4" /> Clase 4 (Enfermedad sistémica constante)</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisico" value="5" /> Clase 5 (Puede no sobrevivir)</label>
                        </div>
                    </div>
                    <div className="column">
                        <h4 className={styles['section-title']}>Estado Fisiológico del Ejemplar</h4>
                        <div className={styles['radio-group']}>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisiologico" value="cria" /> Cría</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisiologico" value="juvenil" /> Juvenil</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisiologico" value="adulto" /> Adulto/Sub adulto</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisiologico" value="senil" /> Senil</label>
                            <label className={styles['radio-label']}><input type="radio" name="estadoFisiologico" value="gestante" /> Hembra gestante</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Condición Física y Tiempos */}
            <div className={styles['form-section']}>
                <div className={styles['two-column-layout']}>
                    <div className="column">
                        <h4 className={styles['section-title']}>Condición Física del Ejemplar</h4>
                        <div className={styles['radio-group']}>
                            <label className={styles['radio-label']}><input type="radio" name="condicionFisica" value="emaciado" /> Emaciado</label>
                            <label className={styles['radio-label']}><input type="radio" name="condicionFisica" value="delgado" /> Delgado</label>
                            <label className={styles['radio-label']}><input type="radio" name="condicionFisica" value="ideal" /> Ideal</label>
                            <label className={styles['radio-label']}><input type="radio" name="condicionFisica" value="obeso" /> Obeso</label>
                        </div>
                    </div>
                    <div className="column">
                        <h4 className={styles['section-title']}>Tiempos del Procedimiento</h4>
                        <div className={styles['form-grid-1']}>
                            <div className={`${styles['form-group']} ${styles.compact}`}>
                                <label>Hora de inicio</label>
                                <input type="time" className={styles['form-input']} />
                            </div>
                            <div className={`${styles['form-group']} ${styles.compact}`}>
                                <label>Tamaño de sonda endotraqueal</label>
                                <input type="text" className={styles['form-input']} placeholder="mm" />
                            </div>
                            <div className={`${styles['form-group']} ${styles.compact}`}>
                                <label>Tiempo de inducción</label>
                                <input type="text" className={styles['form-input']} placeholder="min" />
                            </div>
                            <div className={`${styles['form-group']} ${styles.compact}`}>
                                <label>Tiempo de recuperación</label>
                                <input type="text" className={styles['form-input']} placeholder="min" />
                            </div>
                            <div className={`${styles['form-group']} ${styles.compact}`}>
                                <label>Tiempo total de anestesia</label>
                                <input type="text" className={styles['form-input']} placeholder="min" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Valoración Previa */}
            <div className={styles['form-section']}>
                <h4 className={styles['section-title']}>Valoración Previa</h4>
                <div className={styles['valoracion-grid']}>
                    <div className={`${styles['form-group']} ${styles.compact}`}>
                        <label>Hemograma</label>
                        <input type="text" className={styles['form-input']} />
                    </div>
                    <div className={`${styles['form-group']} ${styles.compact}`}>
                        <label>Bioquímica</label>
                        <input type="text" className={styles['form-input']} />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Deshidratación</label>
                        <div className={styles['checkbox-row']}>
                            <label className={styles['radio-label']}><input type="radio" name="deshidratacion" value="ninguna" /> Ninguna</label>
                            <label className={styles['radio-label']}><input type="radio" name="deshidratacion" value="5-6" /> 5-6%</label>
                            <label className={styles['radio-label']}><input type="radio" name="deshidratacion" value="6-8" /> 6-8%</label>
                            <label className={styles['radio-label']}><input type="radio" name="deshidratacion" value="10-12" /> 10-12%</label>
                            <label className={styles['radio-label']}><input type="radio" name="deshidratacion" value="+12" /> +12%</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocolo Anestésico */}
            <div className={styles['form-section']}>
                <h4 className={styles['section-title']}>Protocolo Anestésico</h4>
                <table className={styles['anesthesia-table']}>
                    <thead>
                        <tr>
                            <th>Fármaco</th>
                            <th>Dosis (mg/kg)</th>
                            <th>Volumen (ml)</th>
                            <th>Vía de admón</th>
                            <th>Hora/Intervalo</th>
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
                <div className={`no-print ${styles['add-row-container']}`} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button className={styles['add-row-btn']} onClick={addProtocolRow}>
                        + Agregar fila
                    </button>
                </div>
            </div>

            {/* Comentarios/Observaciones */}
            <div className={styles['form-section']}>
                <h4 className={styles['section-title']}>Comentarios / Observaciones</h4>
                <textarea className={styles['form-textarea']} rows="3" placeholder="Escribir observaciones..." />
            </div>

            {/* Botones Hoja 1 */}
            <div className="form-actions next-button-container">
                <button className="form-button save-btn" onClick={handleNext}>
                    Siguiente <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default AnesthesiaSheet1;
