import React from 'react';
import { FaSave, FaFilePdf } from 'react-icons/fa';
import ImageUploader from '../../common/ImageUploader';
import { SectionTitle, FormGroup, FormInput, FormTextArea } from './ClinicalHelpers';

const ReptilesReviewVariant = ({ getTitle, isSaved, handleSave, handleExportPDF }) => {
    const reptileSystems = [
        'Piel', 'Digestivo', 'Respiratorio', 'Cardiovascular',
        'Visual/auditivo', 'Musculoesquelético', 'Urinario/genital',
        'Nervioso', 'Metabólico'
    ];

    return (
        <div className="block" id="hoja-reptiles">
            {/* Header */}
            <div className="flex justify-between items-start w-full mb-5" style={{ gap: '20px' }}>
                <ImageUploader placeholderText="Logo" className="header-logo-left no-print-placeholder shrink-0" />
                <div className="flex flex-col items-center justify-center text-center flex-1">
                    <h1 className="text-2xl font-bold text-gray-800 m-0 mb-1">
                        Zoológico Regional Miguel Álvarez del Toro
                    </h1>
                    <h2 className="text-xl text-gray-500 font-normal m-0 mb-2">
                        Clínica Veterinaria
                    </h2>
                    <hr className="w-full border-t border-gray-300 my-3" />
                    <h3 className="text-lg font-bold uppercase text-black m-0">
                        {getTitle()}
                    </h3>
                </div>
                <ImageUploader placeholderText="Logo" className="header-logo-right no-print-placeholder shrink-0" />
            </div>

            {/* Datos Generales */}
            <div className="mb-8">
                <SectionTitle>Datos Generales</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                    <FormGroup label="Fecha"><input type="date" className="w-full border-b border-gray-300 bg-transparent py-2 px-1 text-sm focus:outline-none focus:border-blue-500" /></FormGroup>
                    <FormGroup label="Especie"><FormInput /></FormGroup>
                    <FormGroup label="N. común"><FormInput /></FormGroup>
                    <FormGroup label="Identificación"><FormInput /></FormGroup>
                    <FormGroup label="Ubicación"><FormInput /></FormGroup>
                    <FormGroup label="Edad"><FormInput /></FormGroup>
                    <FormGroup label="Sexo"><FormInput /></FormGroup>
                    <FormGroup label="Peso"><FormInput /></FormGroup>
                    <FormGroup label="Nombre"><FormInput /></FormGroup>
                </div>
            </div>

            {/* Anamnesis */}
            <div className="mb-8">
                <SectionTitle>Anamnesis</SectionTitle>
                <FormTextArea rows="3" />
            </div>

            {/* Revisión Clínica (Reptiles) */}
            <div className="mb-8">
                <SectionTitle>Revisión Clínica (Reptiles)</SectionTitle>

                <div className="mt-6">
                    <h5 className="text-sm font-bold text-gray-700 mb-4">Aspecto General del Ejemplar</h5>
                    <FormTextArea rows="3" />
                </div>

                <div className="mt-6">
                    <h5 className="text-sm font-bold text-gray-700 mb-4">Entorno y ambiente</h5>
                    <FormTextArea rows="3" />
                </div>

                <div className="mt-6">
                    <h5 className="text-sm font-bold text-gray-700 mb-4">Sistema(s) afectado(s)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2 mb-4">
                        {reptileSystems.map(sys => (
                            <label key={sys} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" /> {sys}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h5 className="text-sm font-bold text-gray-700 mb-4">Descripción del problema</h5>
                    <FormTextArea rows="6" />
                </div>
            </div>

            {/* Pruebas de Laboratorio */}
            <div className="mb-8">
                <SectionTitle>Pruebas de Laboratorio</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
                    <FormGroup label="B.H. (hemograma)"><FormInput /></FormGroup>
                    <FormGroup label="Química sanguínea"><FormInput /></FormGroup>
                    <FormGroup label="Coproparasitoscópico"><FormInput /></FormGroup>
                    <FormGroup label="Otra (especificar)"><FormInput /></FormGroup>
                    <FormGroup label="Rayos X"><FormInput /></FormGroup>
                    <FormGroup label="Ultrasonido"><FormInput /></FormGroup>
                </div>
                <div className="mt-4">
                    <label className="text-sm text-gray-600">Observaciones</label>
                    <FormTextArea rows="2" />
                </div>
            </div>

            {/* Impresiones Diagnósticas */}
            <div className="mb-8">
                <SectionTitle>Impresiones Diagnósticas</SectionTitle>
                <FormTextArea rows="3" />
            </div>

            {/* Firma */}
            <div className="mt-12 pt-6 border-t border-gray-300">
                <div className="max-w-xs mx-auto text-center">
                    <label className="block mb-12 text-sm text-gray-600">Responsable Clínico</label>
                    <input type="text" className="w-full border-b-2 border-black bg-transparent py-2 px-1 text-center text-sm focus:outline-none focus:border-blue-500" />
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 mt-8">
                {!isSaved ? (
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors" onClick={handleSave}>
                        <FaSave /> Guardar
                    </button>
                ) : (
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-600 text-white rounded font-medium hover:bg-gray-700 transition-colors" onClick={handleExportPDF}>
                        <FaFilePdf /> Descargar PDF
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReptilesReviewVariant;
