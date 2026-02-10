import React, { useState } from 'react';
import '../../styles/NecropsyReportForm.css';
import '../../styles/NecropsyPrint.css';
import '../../styles/FormButtons.css';
import '../../styles/FormButtons.css';
import { FaSave, FaPrint, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const NecropsyReportForm = ({ onBack }) => {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);
    const handlePrint = () => window.print();

    return (
        <div className="necropsy-report-form">

            {/* Page 1 */}
            <div className={`form-page ${step === 1 ? 'active' : ''}`} id="hoja1">

                {/* Header - Only on Page 1 */}
                <div className="form-header">
                    <h4 className="header-subtitle">Coordinacion Estatal para el mejoramiento del zooMAT</h4>
                    <h1 className="header-title">DIRECCIÓN DEL ZOOLÓGICO MIGUEL ÁLVAREZ DEL TORO</h1>
                    <h2 className="header-department">CLÍNICA VETERINARIA</h2>
                    <h3 className="header-form-name">REPORTE DE NECROPSIA</h3>
                </div>

                {/* Header Info Grid */}
                <div className="form-section">
                    <div className="form-row header-info-row">
                        <div className="form-group inline">
                            <label>FOLIO NO:</label>
                            <input type="text" className="form-input underline-input" placeholder="0000" />
                        </div>
                        <div className="form-group inline">
                            <label>FECHA DE MUERTE:</label>
                            <input
                                type="date"
                                className="form-input underline-input"
                                required
                            />
                        </div>
                        <div className="form-group inline">
                            <label>FECHA DE NECROPSIA:</label>
                            <input
                                type="date"
                                className="form-input underline-input"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Animal Data */}
                <div className="form-section">
                    <h4 className="section-title">DATOS DEL EJEMPLAR</h4>
                    <div className="form-row">
                        <div className="form-col">
                            <div className="form-group">
                                <label>NOMBRE CIENTÍFICO</label>
                                <input type="text" className="form-input professional-text-input" />
                            </div>
                            <div className="form-group">
                                <label>NOMBRE COMÚN</label>
                                <input type="text" className="form-input professional-text-input" />
                            </div>
                        </div>
                        <div className="form-col">
                            <div className="form-group">
                                <label>GRUPO TAXONÓMICO</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="taxon" /> Ave</label>
                                    <label><input type="radio" name="taxon" /> Mamífero</label>
                                    <label><input type="radio" name="taxon" /> Reptil</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>PESO</label>
                                    <input type="text" className="form-input professional-text-input" style={{ width: '100px' }} />
                                </div>
                                <div className="form-group">
                                    <label>SEXO</label>
                                    <input type="text" className="form-input professional-text-input" style={{ width: '100px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>IDENTIFICACIÓN</label>
                        <input type="text" className="form-input professional-text-input" />
                    </div>
                </div>

                {/* Clinical History */}
                <div className="form-section">
                    <h4 className="section-title">Historia Clínica</h4>
                    <textarea className="form-textarea" rows="4" placeholder="Describa los antecedentes clínicos relevantes..."></textarea>
                </div>

                {/* Otros / Observaciones */}
                <div className="form-section" style={{ border: 'none', paddingLeft: 0 }}>
                    <div className="form-group">
                        <label>OTROS / OBSERVACIONES</label>
                        <textarea className="form-textarea simple-textarea"></textarea>
                    </div>
                </div>

                {/* Findings */}
                <div className="form-section">
                    <h4 className="section-title">Hallazgos Macroscópicos</h4>

                    <div className="form-group">
                        <label>Sistema Tegumentario</label>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Sistema Cardio Respiratorio</label>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Sistema Digestivo</label>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Sistema Urogenital</label>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>
                </div>

                <div className="form-actions next-button-container">
                    <button className="form-button save-btn" onClick={handleNext}>
                        Siguiente <FaArrowRight />
                    </button>
                </div>
            </div>

            <div className="page-break"></div>

            {/* Page 2 */}
            <div className={`form-page ${step === 2 ? 'active' : ''}`} id="hoja2">

                <div className="form-section">
                    <h4 className="section-title">HALLAZGOS MACROSCÓPICOS (CONT.)</h4>

                    <div className="form-group">
                        <label>SISTEMA MUSCULOESQUELÉTICO</label>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label>SISTEMA NERVIOSO</label>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label>SISTEMA LINFÁTICO</label>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <h4 className="section-title">IMPRESIONES Y/O POSIBLE DIAGNÓSTICO</h4>
                    <textarea className="form-textarea" rows="5" placeholder="Escriba sus conclusiones..."></textarea>
                </div>

                <div className="form-section">
                    <h4 className="section-title">CONTROL DE MUESTRAS</h4>

                    <div className="form-row">
                        <div className="form-group inline">
                            <label>MUESTRAS REMITIDAS:</label>
                            <div className="radio-group">
                                <label><input type="radio" name="samples" /> SI</label>
                                <label><input type="radio" name="samples" /> NO</label>
                            </div>
                        </div>
                        <div className="form-group inline" style={{ flexGrow: 1 }}>
                            <label>LABORATORIO:</label>
                            <input type="text" className="form-input underline-input" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div className="form-group">
                        <h4 className="section-title" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>MÉTODO DE CONSERVACIÓN</h4>
                        <div className="sample-grid">
                            <div className="sample-item">
                                <label>Formol 10%</label>
                                <input type="checkbox" />
                            </div>
                            <div className="sample-item">
                                <label>Congelación</label>
                                <input type="checkbox" />
                            </div>
                            <div className="sample-item">
                                <label>Refrigeración</label>
                                <input type="checkbox" />
                            </div>
                            <div className="sample-item">
                                <label>Alcohol 70%</label>
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <h4 className="section-title" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>TEJIDOS COLECTADOS</h4>
                        <div className="sample-grid">
                            {['Corazón', 'Riñón', 'Espina Dorsal', 'Pulmón', 'Intestino', 'Nódulo Linfático', 'Hígado', 'Cerebro', 'Bazo', 'Ojo'].map(item => (
                                <div className="sample-item" key={item}>
                                    <label>{item}</label>
                                    <input type="checkbox" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <h4 className="section-title" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>OTROS</h4>
                        <textarea className="form-textarea" rows="2"></textarea>
                    </div>

                    <div className="form-group">
                        <h4 className="section-title" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>OBSERVACIONES</h4>
                        <textarea className="form-textarea" rows="3"></textarea>
                    </div>
                </div>

                {/* Signatures */}
                <div className="signature-section" style={{ borderTop: 'none', paddingTop: 0 }}>
                    <div className="signature-block">
                        <input type="text" className="signature-input" placeholder="" />
                        <label>Realizó Necropsia</label>
                    </div>
                    <div className="signature-block">
                        <input type="text" className="signature-input" placeholder="" />
                        <label>Firma</label>
                    </div>
                </div>

                <div className="form-actions next-button-container">
                    <button className="form-button secondary-btn" onClick={handleBack}>
                        <FaArrowLeft /> Atrás
                    </button>
                    <button className="form-button save-btn">
                        <FaSave /> Guardar Reporte
                    </button>
                    <button className="form-button secondary-btn" onClick={handlePrint}>
                        <FaPrint /> Imprimir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NecropsyReportForm;
