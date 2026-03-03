import { useState } from 'react';

const useNecropsyReportForm = () => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        alert('Datos guardados exitosamente.');
        setIsSaved(true);
    };

    return {
        isSaved,
        handleSave
    };
};

export default useNecropsyReportForm;