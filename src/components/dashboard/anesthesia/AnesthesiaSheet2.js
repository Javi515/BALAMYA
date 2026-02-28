import React from 'react';
import { FaSave, FaPrint, FaArrowLeft } from 'react-icons/fa';
import ImageUploader from '../../common/ImageUploader';
import styles from '../../../styles/AnesthesiaForm.module.css';

const AnesthesiaSheet2 = ({
    step,
    isSaved,
    handleBack,
    handleSave,
    handlePrint
}) => {
    return (
        <div className={`${styles['form-page']} ${step === 2 ? styles.active : ''}`} id="anesthesia-hoja2">
            <div className={styles['anesthesia-header']} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
                <ImageUploader placeholderText="Logo" className="header-logo-left no-print-placeholder" />
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.2rem', margin: '0 0 5px 0' }}>Zoológico Regional Miguel Álvarez del Toro</h1>
                    <h2 style={{ fontSize: '1rem', fontStyle: 'italic', margin: '0 0 10px 0', color: '#555' }}>Clínica Veterinaria</h2>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0' }}>REGISTRO DE ANESTESIA</h3>
                </div>
                <ImageUploader placeholderText="Logo" className="header-logo-right no-print-placeholder" />
            </div>

            <p className={styles['page-indicator']}>Registro de Anestesia - Hoja 2</p>

            {/* Monitorización */}
            <div className={styles['form-section']}>
                <h4 className={styles['section-title']}>Monitorización</h4>
                <table className={`${styles['anesthesia-table']} ${styles['monitoring-table']}`}>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>F.C.</th>
                            <th>F.R.</th>
                            <th>T.LLC./seg.</th>
                            <th>T (°C)</th>
                            <th>Sat. O₂ (%)</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(8)].map((_, i) => (
                            <tr key={`monitor-${i}`}>
                                <td><input type="time" className={styles['table-input']} /></td>
                                <td><input type="text" className={styles['table-input']} /></td>
                                <td><input type="text" className={styles['table-input']} /></td>
                                <td><input type="text" className={styles['table-input']} /></td>
                                <td><input type="text" className={styles['table-input']} /></td>
                                <td><input type="text" className={styles['table-input']} /></td>
                                <td><input type="text" className={`${styles['table-input']} ${styles.wide}`} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Toma de muestras */}
            <div className={styles['form-section']}>
                <h4 className={styles['section-title']}>Toma de muestras y pruebas de diagnóstico</h4>
                <table className={`${styles['anesthesia-table']} ${styles['samples-table']}`}>
                    <thead>
                        <tr>
                            <th>Sangre</th>
                            <th>Heces</th>
                            <th>Piel/Pelo</th>
                            <th>Orina</th>
                            <th>LCR</th>
                            <th>Parásitos</th>
                            <th>RX</th>
                            <th>Endoscopía</th>
                            <th>US</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                            <td><input type="checkbox" className={styles['sample-check']} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Médico Responsable */}
            <div className={`${styles['form-section']} ${styles['signature-section']}`}>
                <div className={styles['signature-block']}>
                    <div className={styles['signature-line']}></div>
                    <label>Médico Responsable</label>
                </div>
            </div>

            {/* Botones Hoja 2 */}
            <div className="form-actions">
                <button className="form-button secondary-btn" onClick={handleBack}>
                    <FaArrowLeft /> Atrás
                </button>
                {!isSaved ? (
                    <button className="form-button save-btn" onClick={handleSave}>
                        <FaSave /> Guardar
                    </button>
                ) : (
                    <button className="form-button secondary-btn" onClick={handlePrint}>
                        <FaPrint /> Imprimir
                    </button>
                )}
            </div>
        </div>
    );
};

export default AnesthesiaSheet2;
