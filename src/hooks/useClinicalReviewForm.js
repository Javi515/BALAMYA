import { useState } from 'react';

const useClinicalReviewForm = () => {
    const [step, setStep] = useState(1);
    const [isSaved, setIsSaved] = useState(false);

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);
    const handleSave = () => {
        alert('Datos guardados (simulación).');
        setIsSaved(true);
    };

    return {
        step,
        isSaved,
        handleNext,
        handleBack,
        handleSave
    };
};

export default useClinicalReviewForm;
