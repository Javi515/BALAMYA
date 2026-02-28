import React from 'react';
import styles from '../../styles/NecropsyReportForm.module.css';
import '../../styles/NecropsyPrint.css';

import { FaSave, FaPrint, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import useNecropsyReportForm from '../../hooks/useNecropsyReportForm';
import ImageUploader from '../common/ImageUploader';

const NecropsyReportForm = ({ onBack }) => {
    const { step, isSaved, handleNext, handleBack, handlePrint, handleSave } = useNecropsyReportForm();

    return (
        <div className={styles['necropsy-report-form']}>

            {/* Page 1 */}
            <div className={`${styles['form-page']} ${step === 1 ? styles['active'] : ''}`} id="hoja1">

                {/* Header - Only on Page 1 */}
                <div className={styles['form-header']} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
                    <ImageUploader placeholderText="Logo" className="header-logo-left no-print-placeholder" />
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <h4 className={styles['header-subtitle']} style={{ margin: '0 0 5px 0' }}>Coordinacion Estatal para el mejoramiento del zooMAT</h4>
                        <h1 className={styles['header-title']} style={{ margin: '0 0 5px 0' }}>DIRECCIÓN DEL ZOOLÓGICO MIGUEL ÁLVAREZ DEL TORO</h1>
                        <h2 className={styles['header-department']} style={{ margin: '0 0 5px 0' }}>CLÍNICA VETERINARIA</h2>
                        <h3 className={styles['header-form-name']} style={{ margin: '0' }}>REPORTE DE NECROPSIA</h3>
                    </div>
                    <ImageUploader placeholderText="Logo" className="header-logo-right no-print-placeholder" />
                </div>

                {/* Header Info Grid */}
                <div className={styles['form-section']}>
                    <div className={`${styles['form-row']} ${styles['header-info-row']}`}>
                        <div className={`${styles['form-group']} ${styles['inline']}`}>
                            <label>FOLIO NO:</label>
                            <input type="text" className={`${styles['form-input']} ${styles['underline-input']}`} placeholder="0000" />
                        </div>
                        <div className={`${styles['form-group']} ${styles['inline']}`}>
                            <label>FECHA DE MUERTE:</label>
                            <input
                                type="date"
                                className={`${styles['form-input']} ${styles['underline-input']}`}
                                required
                            />
                        </div>
                        <div className={`${styles['form-group']} ${styles['inline']}`}>
                            <label>FECHA DE NECROPSIA:</label>
                            <input
                                type="date"
                                className={`${styles['form-input']} ${styles['underline-input']}`}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Animal Data */}
                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>DATOS DEL EJEMPLAR</h4>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <div className={styles['form-group']}>
                                <label>NOMBRE CIENTÍFICO</label>
                                <input type="text" className={`${styles['form-input']} ${styles['professional-text-input']}`} />
                            </div>
                            <div className={styles['form-group']}>
                                <label>NOMBRE COMÚN</label>
                                <input type="text" className={`${styles['form-input']} ${styles['professional-text-input']}`} />
                            </div>
                            <div className={styles['form-row']} style={{ marginBottom: 0 }}>
                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                    <label>PESO</label>
                                    <input type="text" className={`${styles['form-input']} ${styles['professional-text-input']}`} style={{ width: '100%' }} />
                                </div>
                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                    <label>SEXO</label>
                                    <input type="text" className={`${styles['form-input']} ${styles['professional-text-input']}`} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles['form-col']}>
                            <div className={styles['form-group']}>
                                <label>GRUPO TAXONÓMICO</label>
                                <div className={styles['radio-group']} style={{ marginTop: '10px' }}>
                                    <label><input type="radio" name="taxon" /> Ave</label>
                                    <label><input type="radio" name="taxon" /> Mamífero</label>
                                    <label><input type="radio" name="taxon" /> Reptil</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['form-group']}>
                        <label>IDENTIFICACIÓN</label>
                        <input type="text" className={`${styles['form-input']} ${styles['professional-text-input']}`} />
                    </div>
                </div>

                {/* Clinical History */}
                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>Historia Clínica</h4>
                    <textarea className={styles['form-textarea']} rows="4" placeholder="Describa los antecedentes clínicos relevantes..."></textarea>
                </div>

                {/* Otros / Observaciones */}
                <div className={styles['form-section']} style={{ border: 'none', paddingLeft: 0 }}>
                    <div className={styles['form-group']}>
                        <label>OTROS / OBSERVACIONES</label>
                        <textarea className={`${styles['form-textarea']} ${styles['simple-textarea']}`}></textarea>
                    </div>
                </div>

                {/* Findings */}
                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>Hallazgos Macroscópicos</h4>

                    <div className={styles['form-group']}>
                        <label>Sistema Tegumentario</label>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>

                    <div className={styles['form-group']}>
                        <label>Sistema Cardio Respiratorio</label>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>

                    <div className={styles['form-group']}>
                        <label>Sistema Digestivo</label>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>

                    <div className={styles['form-group']}>
                        <label>Sistema Urogenital</label>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>
                </div>

                <div className={`${styles['form-actions']} no-print`}>
                    <button className={`${styles['form-button']} ${styles['save-btn']}`} onClick={handleNext}>
                        Siguiente <FaArrowRight />
                    </button>
                </div>
            </div>

            <div className="page-break"></div>

            {/* Page 2 */}
            <div className={`${styles['form-page']} ${step === 2 ? styles['active'] : ''}`} id="hoja2">

                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>HALLAZGOS MACROSCÓPICOS (CONT.)</h4>

                    <div className={styles['form-group']}>
                        <label>SISTEMA MUSCULOESQUELÉTICO</label>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>

                    <div className={styles['form-group']}>
                        <label>SISTEMA NERVIOSO</label>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>

                    <div className={styles['form-group']}>
                        <label>SISTEMA LINFÁTICO</label>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>
                </div>

                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>IMPRESIONES Y/O POSIBLE DIAGNÓSTICO</h4>
                    <textarea className={styles['form-textarea']} rows="5" placeholder="Escriba sus conclusiones..."></textarea>
                </div>

                <div className={styles['form-section']}>
                    <h4 className={styles['section-title']}>CONTROL DE MUESTRAS</h4>

                    <div className={styles['form-row']}>
                        <div className={`${styles['form-group']} ${styles['inline']}`}>
                            <label>MUESTRAS REMITIDAS:</label>
                            <div className={styles['radio-group']}>
                                <label><input type="radio" name="samples" /> SI</label>
                                <label><input type="radio" name="samples" /> NO</label>
                            </div>
                        </div>
                        <div className={`${styles['form-group']} ${styles['inline']}`} style={{ flexGrow: 1 }}>
                            <label>LABORATORIO:</label>
                            <input type="text" className={`${styles['form-input']} ${styles['underline-input']}`} style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div className={styles['form-group']}>
                        <h4 className={styles['section-title']} style={{ fontSize: '0.85rem', marginBottom: '15px' }}>MÉTODO DE CONSERVACIÓN</h4>
                        <div className={styles['sample-grid']}>
                            <div className={styles['sample-item']}>
                                <label>Formol 10%</label>
                                <input type="checkbox" />
                            </div>
                            <div className={styles['sample-item']}>
                                <label>Congelación</label>
                                <input type="checkbox" />
                            </div>
                            <div className={styles['sample-item']}>
                                <label>Refrigeración</label>
                                <input type="checkbox" />
                            </div>
                            <div className={styles['sample-item']}>
                                <label>Alcohol 70%</label>
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>

                    <div className={styles['form-group']}>
                        <h4 className={styles['section-title']} style={{ fontSize: '0.85rem', marginBottom: '15px' }}>TEJIDOS COLECTADOS</h4>
                        <div className={styles['sample-grid']}>
                            {['Corazón', 'Riñón', 'Espina Dorsal', 'Pulmón', 'Intestino', 'Nódulo Linfático', 'Hígado', 'Cerebro', 'Bazo', 'Ojo'].map(item => (
                                <div className={styles['sample-item']} key={item}>
                                    <label>{item}</label>
                                    <input type="checkbox" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles['form-group']}>
                        <h4 className={styles['section-title']} style={{ fontSize: '0.85rem', marginBottom: '15px' }}>OTROS</h4>
                        <textarea className={styles['form-textarea']} rows="2"></textarea>
                    </div>

                    <div className={styles['form-group']}>
                        <h4 className={styles['section-title']} style={{ fontSize: '0.85rem', marginBottom: '15px' }}>OBSERVACIONES</h4>
                        <textarea className={styles['form-textarea']} rows="3"></textarea>
                    </div>
                </div>

                {/* Signatures */}
                <div className={styles['signature-section']} style={{ borderTop: 'none', paddingTop: 0 }}>
                    <div className={styles['signature-block']}>
                        <input type="text" className={styles['signature-input']} placeholder="" />
                        <label>Realizó Necropsia</label>
                    </div>
                    <div className={styles['signature-block']}>
                        <input type="text" className={styles['signature-input']} placeholder="" />
                        <label>Firma</label>
                    </div>
                </div>

                <div className={`${styles['form-actions']} no-print`}>
                    <button className={`${styles['form-button']} ${styles['secondary-btn']}`} onClick={handleBack}>
                        <FaArrowLeft /> Atrás
                    </button>
                    {!isSaved ? (
                        <button className={`${styles['form-button']} ${styles['save-btn']}`} onClick={handleSave}>
                            <FaSave /> Guardar Reporte
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

export default NecropsyReportForm;
