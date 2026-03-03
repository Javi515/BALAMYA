import { useState } from 'react';

const useTreatmentForm = () => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        alert('Datos guardados (simulación).');
        setIsSaved(true);
    };

    return { isSaved, handleSave };
};

export default useTreatmentForm;
