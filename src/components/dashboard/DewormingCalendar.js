import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaPlus, FaSave, FaFilePdf } from 'react-icons/fa';
import ImageUploader from '../common/ImageUploader';
import styles from '../../styles/DewormingCalendar.module.css';
import '../../styles/DewormingPrint.css';
import { exportElementToPDF } from '../../utils/exportPDF';

const DewormingCalendar = () => {
    const formRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [records, setRecords] = useState([]);
    const [generalData, setGeneralData] = useState({
        grupo: '',
        nombreCientifico: '',
        nombreComun: '',
        peso: '',
        edad: '',
        identificacion: '',
        ubicacion: '',
        sexo: '',
        estadoFisiologico: ''
    });
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
    };

    const handleExportPDF = () => exportElementToPDF(formRef.current, 'Calendario_Desparasitacion.pdf', 'landscape');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setGeneralData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddRecord = (e) => {
        e.preventDefault();
        const newRecord = {
            fecha: e.target.fecha.value,
            principioActivo: e.target.principioActivo.value,
            dosisMgKg: e.target.dosisMgKg.value,
            productoComercial: e.target.productoComercial.value,
            dosisTotal: e.target.dosisTotal.value,
            via: e.target.via.value,
            frecuencia: e.target.frecuencia.value,
            proxima: e.target.proxima.value,
        };
        setRecords([...records, newRecord]);
        closeModal();
    };

    return (
        <div className={styles['deworming-container']}>
            <div className={styles['deworming-card']} ref={formRef}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
                    <ImageUploader
                        placeholderText="Logo"
                        className="header-logo-left no-print-placeholder"
                    />

                    <div className={styles['deworming-header']} style={{ flex: 1, textAlign: 'center' }}>
                        <div className={styles['deworming-header-subtitle']} style={{ marginBottom: '5px' }}>
                            2025, Año de "Rosario Castellanos Figueroa"
                        </div>
                        <div className={styles['deworming-header-title']}>CALENDARIO DE DESPARASITACIÓN</div>
                    </div>

                    <ImageUploader
                        placeholderText="Logo"
                        className="header-logo-right no-print-placeholder"
                    />
                </div>

                <h4>DATOS GENERALES</h4>
                <div className={styles['deworming-form-grid']}>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>GRUPO</label><input type="text" name="grupo" value={generalData.grupo} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>NOMBRE CIENTÍFICO</label><input type="text" name="nombreCientifico" value={generalData.nombreCientifico} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>NOMBRE COMÚN</label><input type="text" name="nombreComun" value={generalData.nombreComun} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>SEXO</label><input type="text" name="sexo" value={generalData.sexo} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>PESO</label><input type="text" name="peso" value={generalData.peso} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>EDAD</label><input type="text" name="edad" value={generalData.edad} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>UBICACIÓN</label><input type="text" name="ubicacion" value={generalData.ubicacion} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>ESTADO FISIOLÓGICO</label><input type="text" name="estadoFisiologico" value={generalData.estadoFisiologico} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                    <div className={styles['deworming-form-field']}><label className={styles['deworming-form-label']}>IDENTIFICACIÓN</label><input type="text" name="identificacion" value={generalData.identificacion} onChange={handleDataChange} className={styles['deworming-form-input']} /></div>
                </div>

                <div className={`no-print ${styles['add-record-button-container']}`}>
                    <button onClick={openModal} className={styles['add-record-button']}>
                        <FaPlus /> Agregar Registro
                    </button>
                </div>

                <div className={styles['table-container']}>
                    <table className={styles['deworming-table']}>
                        <thead>
                            <tr>
                                <th>FECHA</th>
                                <th>PRINCIPIO ACTIVO</th>
                                <th>DOSIS MG/KG</th>
                                <th>PRODUCTO COMERCIAL</th>
                                <th>DOSIS TOTAL (ml o tabletas)</th>
                                <th>VÍA DE ADMINISTRACIÓN</th>
                                <th>FRECUENCIA</th>
                                <th>PRÓXIMA DESPARASITACIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.length === 0 ? (
                                <tr>
                                    <td colSpan="8">No hay registros.</td>
                                </tr>
                            ) : (
                                records.map((rec, index) => (
                                    <tr key={index}>
                                        <td>{rec.fecha}</td>
                                        <td>{rec.principioActivo}</td>
                                        <td>{rec.dosisMgKg}</td>
                                        <td>{rec.productoComercial}</td>
                                        <td>{rec.dosisTotal}</td>
                                        <td>{rec.via}</td>
                                        <td>{rec.frecuencia}</td>
                                        <td>{rec.proxima}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={`${styles['form-actions']} no-print`}>
                    {!isSaved ? (
                        <button className={styles['save-button']} onClick={handleSave}>
                            <FaSave /> Guardar
                        </button>
                    ) : (
                        <button className={styles['print-button']} onClick={handleExportPDF}>
                            <FaFilePdf /> Descargar PDF
                        </button>
                    )}
                </div>

                {isModalOpen && ReactDOM.createPortal(
                    <div className={styles['modal-overlay']} onClick={closeModal}>
                        <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                            <h3 className={styles['modal-title']}>Agregar Registro de Desparasitación</h3>
                            <form onSubmit={handleAddRecord}>
                                <div className={styles['modal-form-grid']}>
                                    {/* Reusing the same field, label, and input classes from the main form */}
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>FECHA</label>
                                        <input name="fecha" type="date" required className={styles['deworming-form-input']} />
                                    </div>
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>PRINCIPIO ACTIVO</label>
                                        <input name="principioActivo" type="text" required className={styles['deworming-form-input']} />
                                    </div>
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>DOSIS MG/KG</label>
                                        <input name="dosisMgKg" type="text" required className={styles['deworming-form-input']} />
                                    </div>
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>PRODUCTO COMERCIAL</label>
                                        <input name="productoComercial" type="text" required className={styles['deworming-form-input']} />
                                    </div>
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>DOSIS TOTAL (ml o tabletas)</label>
                                        <input name="dosisTotal" type="text" required className={styles['deworming-form-input']} />
                                    </div>
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>VÍA DE ADMINISTRACIÓN</label>
                                        <input name="via" type="text" required className={styles['deworming-form-input']} />
                                    </div>
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>FRECUENCIA</label>
                                        <input name="frecuencia" type="text" required className={styles['deworming-form-input']} />
                                    </div>
                                    <div className={styles['deworming-form-field']}>
                                        <label className={styles['deworming-form-label']}>PRÓXIMA DESPARASITACIÓN</label>
                                        <input name="proxima" type="date" required className={styles['deworming-form-input']} />
                                    </div>
                                </div>
                                <div className={styles['modal-actions']}>
                                    <button type="button" className={`${styles['footer-button']} ${styles['cancel-button']}`} onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className={`${styles['footer-button']} ${styles['save-button']}`}>Guardar Registro</button>
                                </div>
                            </form>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </div>
    );
};

export default DewormingCalendar;
