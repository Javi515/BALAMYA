import { useState } from 'react';

const useHospFollowUpForm = () => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        alert('Datos guardados (simulación).');
        setIsSaved(true);
    };

    return { isSaved, handleSave };
};

export default useHospFollowUpForm;
