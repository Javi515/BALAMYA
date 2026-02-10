import React, { useState } from 'react';
import ClinicalReviewForm from '../components/dashboard/ClinicalReviewForm';
import DewormingCalendar from '../components/dashboard/DewormingCalendar';
import VaccinationForm from '../components/dashboard/VaccinationForm';
import NecropsyReportForm from '../components/dashboard/NecropsyReportForm';
import AnimalSelector from '../components/dashboard/AnimalSelector';
import { FaFileMedical, FaSyringe, FaCalendarAlt, FaArrowLeft, FaSkull, FaPaw, FaExchangeAlt } from 'react-icons/fa';
import '../styles/FormsPage.css';

const FormsPage = () => {
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [viewState, setViewState] = useState('menu'); // 'menu' | 'selection' | 'form'
    const [targetForm, setTargetForm] = useState(null);

    // Step 1: User selects a tool from the menu
    const handleSelectForm = (formKey) => {
        setTargetForm(formKey);
        setViewState('selection');
    };

    // Step 2: User selects an animal
    const handleAnimalSelect = (animal) => {
        setSelectedAnimal(animal);
        setViewState('form');
    };

    // Navigation: Back from Animal Selector to Menu
    const cancelSelection = () => {
        setTargetForm(null);
        setViewState('menu');
    };

    // Navigation: Back from Form to Animal Selector (to pick another animal for same tool)
    // Or maybe back to menu? Let's go back to selection first to be safe, or direct to menu?
    // User flow: Tool -> Animal -> Form. Back usually goes up one level.
    // Let's go back to Selection so they can stick with the tool but change animal.
    const backToSelection = () => {
        setViewState('selection');
        setSelectedAnimal(null);
    };

    // Navigation: Change animal while in form (optional shortcut)
    const handleChangeAnimal = () => {
        setSelectedAnimal(null);
        setViewState('selection');
    };

    const backToMenu = () => {
        setViewState('menu');
        setTargetForm(null);
        setSelectedAnimal(null);
    };

    const formCards = [
        {
            key: 'deworming',
            icon: <FaCalendarAlt className="form-card-icon" style={{ color: '#28a745' }} />,
            title: 'CALENDARIO DE DESPARASITACIÓN',
            description: 'Calendario de desparasitación y control preventivo.',
        },
        {
            key: 'vaccination',
            icon: <FaSyringe className="form-card-icon" style={{ color: '#dc3545' }} />,
            title: 'FORMATO DE VACUNACIÓN',
            description: 'Registro oficial de vacunación y medicina preventiva.',
        },
        {
            key: 'clinicalReview',
            icon: <FaFileMedical className="form-card-icon" style={{ color: '#007bff' }} />,
            title: 'REVISIÓN CLÍNICA',
            description: 'Formato para la revisión clínica detallada de ejemplares.',
        },
        {
            key: 'necropsy',
            icon: <FaSkull className="form-card-icon" style={{ color: '#333' }} />,
            title: 'REPORTE DE NECROPSIA',
            description: 'Formato oficial para el reporte de necropsias.',
        }
    ];

    const renderContent = () => {
        // View 1: Menu
        if (viewState === 'menu') {
            return (
                <div className="forms-page-container">
                    <h1 className="forms-page-title">HERRAMIENTAS CLÍNICAS</h1>
                    <div className="form-grid-container">
                        {formCards.map((card) => {
                            const specificClass = `form-card-${card.key}`;
                            return (
                                <div key={card.key} className={`form-card ${specificClass}`}>
                                    <div className="form-card-content">
                                        {card.icon}
                                        <div className="form-card-text">
                                            <h3 className="form-card-title">{card.title}</h3>
                                            <p className="form-card-description">{card.description}</p>
                                        </div>
                                    </div>
                                    <div className="form-card-footer">
                                        <button className="form-card-button" onClick={() => handleSelectForm(card.key)}>ACCEDER</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        // View 2: Animal Selection
        if (viewState === 'selection') {
            return (
                <div className="form-entry-animation">
                    <button onClick={cancelSelection} className="back-to-menu-btn">
                        <FaArrowLeft /> VOLVER AL MENÚ DE HERRAMIENTAS
                    </button>
                    <AnimalSelector onSelect={handleAnimalSelect} />
                </div>
            );
        }

        // View 3: The Form itself
        if (viewState === 'form' && selectedAnimal) {
            return (
                <div className="form-entry-animation">
                    <div className="form-header-controls">
                        <button onClick={backToMenu} className="back-to-menu-btn">
                            <FaArrowLeft /> MENÚ PRINCIPAL
                        </button>

                        <div className="selected-animal-banner compact">
                            <div className="animal-banner-info">
                                <span className="banner-label">Paciente:</span>
                                <span className="banner-name">{selectedAnimal.commonName || 'Sin Nombre Común'}</span>
                            </div>
                            <button onClick={handleChangeAnimal} className="change-animal-btn">
                                <FaExchangeAlt /> Cambiar
                            </button>
                        </div>
                    </div>

                    {targetForm === 'deworming' && <DewormingCalendar onBack={backToSelection} patient={selectedAnimal} />}
                    {targetForm === 'vaccination' && <VaccinationForm onBack={backToSelection} patient={selectedAnimal} />}
                    {targetForm === 'clinicalReview' && <ClinicalReviewForm patient={selectedAnimal} />}
                    {targetForm === 'necropsy' && <NecropsyReportForm onBack={backToSelection} patient={selectedAnimal} />}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="forms-page-wrapper">
            {renderContent()}
        </div>
    );
};

export default FormsPage;