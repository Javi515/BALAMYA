import { useState } from 'react';

const useNecropsyReportForm = () => {
    const [step, setStep] = useState(1);
    const [isSaved, setIsSaved] = useState(false);

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);
    const handlePrint = () => window.print();
    const handleSave = () => {
        alert('Datos guardados (simulación).');
        setIsSaved(true);
    };

    return {
        step,
        isSaved,
        handleNext,
        handleBack,
        handlePrint,
        handleSave
    };
};

export default useNecropsyReportForm;
