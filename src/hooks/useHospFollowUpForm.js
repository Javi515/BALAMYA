import { useState } from 'react';

const useHospFollowUpForm = () => {
    const [isSaved, setIsSaved] = useState(false);

    const handlePrint = () => window.print();
    const handleSave = () => {
        alert('Datos guardados (simulación).');
        setIsSaved(true);
    };

    return { isSaved, handlePrint, handleSave };
};

export default useHospFollowUpForm;
