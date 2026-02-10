import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from '../../assets/logo_zoo.png';
import '../../styles/VaccinationForm.css';
import '../../styles/VaccinationPrint.css';
import { FaPlus, FaPrint, FaSave } from 'react-icons/fa';

const VaccinationForm = () => {
    // State to control the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for patient data
    const [patientData, setPatientData] = useState({
        nombreCientifico: '',
        nombreComun: '',
        nombreIndividual: '',
        sexo: '',
        edad: '',
        ubicacion: '',
        identificacion: ''
    });

    // State for vaccination records
    const [records, setRecords] = useState([]);

    // State for the new record input fields
    const [newRecord, setNewRecord] = useState({
        fecha: '',
        viaAdministracion: '',
        vacunaAplicada: '',
        mvzResponsable: '',
        proximaVacunacion: '',
        observaciones: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        // Reset form fields on close
        setNewRecord({
            fecha: '',
            viaAdministracion: '',
            vacunaAplicada: '',
            mvzResponsable: '',
            proximaVacunacion: '',
            observaciones: ''
        });
    };

    const handlePatientDataChange = (e) => {
        const { name, value } = e.target;
        setPatientData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewRecordChange = (e) => {
        const { name, value } = e.target;
        setNewRecord(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveRecord = () => {
        if (!newRecord.fecha || !newRecord.vacunaAplicada) {
            alert('Por favor, complete al menos la fecha y la vacuna aplicada.');
            return;
        }
        setRecords([...records, { ...newRecord, id: Date.now() }]);
        closeModal(); // Close modal and reset form after saving
    };

    // Placeholder function for the main save button
    const handleSave = () => {
        // Here you would typically save the patientData and records to a backend
        alert('Datos guardados (simulación).');
    };

    return (
        <div className="vaccination-card">
            <div className="vaccination-header-flex">
                <img src={logo} alt="Logo" className="vaccination-logo" />
                <div className="header-subtitle-right">
                    CURADURÍA GENERAL DE NUTRICIÓN<br />Y SALUD ANIMAL
                </div>
            </div>

            <div className="vaccination-header">
                <div className="vaccination-header-subtitle">
                    CLÍNICA VETERINARIA
                </div>
                <div className="vaccination-header-title">FORMATO DE VACUNACIÓN</div>
            </div>

            {/* Patient Data Section */}
            <h4>DATOS GENERALES</h4>
            <div className="vaccination-form-grid">
                <div className="vaccination-form-field"><label className="vaccination-form-label">Nombre científico</label><input type="text" className="vaccination-form-input" name="nombreCientifico" value={patientData.nombreCientifico} onChange={handlePatientDataChange} /></div>
                <div className="vaccination-form-field"><label className="vaccination-form-label">Nombre común</label><input type="text" className="vaccination-form-input" name="nombreComun" value={patientData.nombreComun} onChange={handlePatientDataChange} /></div>

                <div className="vaccination-form-field"><label className="vaccination-form-label">Sexo</label><input type="text" className="vaccination-form-input" name="sexo" value={patientData.sexo} onChange={handlePatientDataChange} /></div>
                <div className="vaccination-form-field"><label className="vaccination-form-label">Edad</label><input type="text" className="vaccination-form-input" name="edad" value={patientData.edad} onChange={handlePatientDataChange} /></div>
                <div className="vaccination-form-field"><label className="vaccination-form-label">Ubicación</label><input type="text" className="vaccination-form-input" name="ubicacion" value={patientData.ubicacion} onChange={handlePatientDataChange} /></div>
                <div className="vaccination-form-field"><label className="vaccination-form-label">Identificación</label><input type="text" className="vaccination-form-input" name="identificacion" value={patientData.identificacion} onChange={handlePatientDataChange} /></div>
            </div>

            {/* Action Button to show the modal */}
            <div className="add-record-button-container">
                <button onClick={openModal} className="add-record-button">
                    <FaPlus /> Agregar Registro
                </button>
            </div>

            {/* Records Table */}
            <div className="table-container">
                <table className="vaccination-table">
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>VÍA DE ADMINISTRACIÓN</th>
                            <th>VACUNA APLICADA (o producto biológico)</th>
                            <th>MVZ RESPONSABLE</th>
                            <th>PRÓXIMA VACUNACIÓN</th>
                            <th>OBSERVACIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length === 0 ? (
                            <tr><td colSpan="6" className="no-records-cell">No hay registros</td></tr>
                        ) : (
                            records.map((rec) => (
                                <tr key={rec.id}>
                                    <td>{rec.fecha}</td>
                                    <td>{rec.viaAdministracion}</td>
                                    <td>{rec.vacunaAplicada}</td>
                                    <td>{rec.mvzResponsable}</td>
                                    <td>{rec.proximaVacunacion}</td>
                                    <td>{rec.observaciones}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Buttons */}
            <div className="form-footer">
                <button onClick={handleSave} className="form-button save-btn">
                    <FaSave /> Guardar
                </button>
                <button onClick={() => window.print()} className="form-button secondary-btn">
                    <FaPrint /> Imprimir
                </button>
            </div>

            {/* Modal for adding a new record */}
            {isModalOpen && ReactDOM.createPortal(
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Nuevo Registro de Vacunación</h3>
                        <div className="modal-form-grid">
                            <div className="vaccination-form-field"><label className="vaccination-form-label">Fecha</label><input type="date" className="vaccination-form-input" name="fecha" value={newRecord.fecha} onChange={handleNewRecordChange} /></div>
                            <div className="vaccination-form-field"><label className="vaccination-form-label">Vía de Administración</label><input type="text" className="vaccination-form-input" name="viaAdministracion" value={newRecord.viaAdministracion} onChange={handleNewRecordChange} /></div>
                            <div className="vaccination-form-field"><label className="vaccination-form-label">Vacuna Aplicada (o Producto)</label><input type="text" className="vaccination-form-input" name="vacunaAplicada" value={newRecord.vacunaAplicada} onChange={handleNewRecordChange} /></div>
                            <div className="vaccination-form-field"><label className="vaccination-form-label">MVZ Responsable</label><input type="text" className="vaccination-form-input" name="mvzResponsable" value={newRecord.mvzResponsable} onChange={handleNewRecordChange} /></div>
                            <div className="vaccination-form-field"><label className="vaccination-form-label">Próxima Vacunación</label><input type="date" className="vaccination-form-input" name="proximaVacunacion" value={newRecord.proximaVacunacion} onChange={handleNewRecordChange} /></div>
                            <div className="vaccination-form-field modal-field-full-width"><label className="vaccination-form-label">Observaciones</label><input type="text" className="vaccination-form-input" name="observaciones" value={newRecord.observaciones} onChange={handleNewRecordChange} /></div>
                        </div>
                        <div className="modal-actions">
                            <button onClick={closeModal} className="footer-button cancel-button">Cancelar</button>
                            <button onClick={handleSaveRecord} className="footer-button save-button">Guardar</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default VaccinationForm;
