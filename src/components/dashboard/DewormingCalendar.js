
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FaPlus, FaSave, FaPrint } from 'react-icons/fa';
import logo from '../../assets/logo_zoo.png'; // Make sure this path is correct
import '../../styles/DewormingCalendar.css';
import '../../styles/DewormingPrint.css';
import '../../styles/FormButtons.css';

const DewormingCalendar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [records, setRecords] = useState([]); // State to hold table records
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
        // Here you would typically save the data to a backend
        setIsSaved(true);
    };

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
        <div className="deworming-container">
            <div className="deworming-card">

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <img src={logo} alt="Logo Zoo" style={{ height: '60px' }} />
                    <div style={{ textAlign: 'right', fontFamily: 'sans-serif', fontWeight: 'bold', color: '#555', fontSize: '0.9rem' }}>
                        CURADURÍA GENERAL DE NUTRICIÓN<br />Y SALUD ANIMAL
                    </div>
                </div>

                <div className="deworming-header">
                    <div className="deworming-header-subtitle" style={{ marginBottom: '15px' }}>
                        2025, Año de "Rosario Castellanos Figueroa"
                    </div>
                    <div className="deworming-header-title">CALENDARIO DE DESPARASITACIÓN</div>
                </div>

                <h4>DATOS GENERALES</h4>
                <div className="deworming-form-grid">
                    <div className="deworming-form-field"><label className="deworming-form-label">GRUPO</label><input type="text" name="grupo" value={generalData.grupo} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">NOMBRE CIENTÍFICO</label><input type="text" name="nombreCientifico" value={generalData.nombreCientifico} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">NOMBRE COMÚN</label><input type="text" name="nombreComun" value={generalData.nombreComun} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">SEXO</label><input type="text" name="sexo" value={generalData.sexo} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">PESO</label><input type="text" name="peso" value={generalData.peso} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">EDAD</label><input type="text" name="edad" value={generalData.edad} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">UBICACIÓN</label><input type="text" name="ubicacion" value={generalData.ubicacion} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">ESTADO FISIOLÓGICO</label><input type="text" name="estadoFisiologico" value={generalData.estadoFisiologico} onChange={handleDataChange} className="deworming-form-input" /></div>
                    <div className="deworming-form-field"><label className="deworming-form-label">IDENTIFICACIÓN</label><input type="text" name="identificacion" value={generalData.identificacion} onChange={handleDataChange} className="deworming-form-input" /></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <button onClick={openModal} style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <FaPlus /> Agregar Registro
                    </button>
                </div>

                <div className="table-container">
                    <table className="deworming-table">
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

                <div className="form-actions">
                    <button className="save-button" onClick={handleSave}>
                        <FaSave /> Guardar
                    </button>
                    {isSaved && (
                        <button className="print-button" onClick={() => window.print()}>
                            <FaPrint /> Imprimir
                        </button>
                    )}
                </div>

                {isModalOpen && ReactDOM.createPortal(
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3 className="modal-title">Agregar Registro de Desparasitación</h3>
                            <form onSubmit={handleAddRecord}>
                                <div className="modal-form-grid">
                                    {/* Reusing the same field, label, and input classes from the main form */}
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">FECHA</label>
                                        <input name="fecha" type="date" required className="deworming-form-input" />
                                    </div>
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">PRINCIPIO ACTIVO</label>
                                        <input name="principioActivo" type="text" required className="deworming-form-input" />
                                    </div>
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">DOSIS MG/KG</label>
                                        <input name="dosisMgKg" type="text" required className="deworming-form-input" />
                                    </div>
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">PRODUCTO COMERCIAL</label>
                                        <input name="productoComercial" type="text" required className="deworming-form-input" />
                                    </div>
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">DOSIS TOTAL (ml o tabletas)</label>
                                        <input name="dosisTotal" type="text" required className="deworming-form-input" />
                                    </div>
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">VÍA DE ADMINISTRACIÓN</label>
                                        <input name="via" type="text" required className="deworming-form-input" />
                                    </div>
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">FRECUENCIA</label>
                                        <input name="frecuencia" type="text" required className="deworming-form-input" />
                                    </div>
                                    <div className="deworming-form-field">
                                        <label className="deworming-form-label">PRÓXIMA DESPARASITACIÓN</label>
                                        <input name="proxima" type="date" required className="deworming-form-input" />
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="footer-button cancel-button" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className="footer-button save-button">Guardar Registro</button>
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
