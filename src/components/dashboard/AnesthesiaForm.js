import React, { useState } from 'react';
import styles from '../../styles/AnesthesiaForm.module.css';
import '../../styles/AnesthesiaFormPrint.css';
import { useLocation } from 'react-router-dom';

import useAnesthesiaForm from '../../hooks/useAnesthesiaForm';

// Import subcomponents
import AnesthesiaSheet1 from './anesthesia/AnesthesiaSheet1';
import AnesthesiaSheet2 from './anesthesia/AnesthesiaSheet2';

const AnesthesiaForm = () => {
    const { step, isSaved, handleNext, handleBack, handlePrint, handleSave } = useAnesthesiaForm();
    const location = useLocation();
    const patient = location.state?.patient;

    // State for Anesthesia Protocol Table
    const [protocolRows, setProtocolRows] = useState([
        { id: 1, farmaco: '', dosis: '', volumen: '', via: '', hora: '' },
        { id: 2, farmaco: '', dosis: '', volumen: '', via: '', hora: '' },
        { id: 3, farmaco: '', dosis: '', volumen: '', via: '', hora: '' },
        { id: 4, farmaco: '', dosis: '', volumen: '', via: '', hora: '' },
        { id: 5, farmaco: '', dosis: '', volumen: '', via: '', hora: '' }
    ]);

    const addProtocolRow = () => {
        setProtocolRows([...protocolRows, { id: Date.now(), farmaco: '', dosis: '', volumen: '', via: '', hora: '' }]);
    };

    const removeProtocolRow = (idToRemove) => {
        setProtocolRows(protocolRows.filter(row => row.id !== idToRemove));
    };

    return (
        <div className="card">
            <div className={styles['anesthesia-form']}>

                {/* ===== HOJA 1 ===== */}
                <AnesthesiaSheet1
                    step={step}
                    patient={patient}
                    protocolRows={protocolRows}
                    addProtocolRow={addProtocolRow}
                    removeProtocolRow={removeProtocolRow}
                    handleNext={handleNext}
                />

                {/* ===== HOJA 2 ===== */}
                <AnesthesiaSheet2
                    step={step}
                    isSaved={isSaved}
                    handleBack={handleBack}
                    handleSave={handleSave}
                    handlePrint={handlePrint}
                />

            </div>
        </div>
    );
};

export default AnesthesiaForm;
