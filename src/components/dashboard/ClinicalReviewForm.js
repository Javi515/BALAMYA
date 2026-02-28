import React, { useState, useRef } from 'react';
import { FaDove, FaFileAlt, FaLeaf } from 'react-icons/fa';
import '../../styles/ClinicalReviewFormPrint.css';
import { useAuth } from '../../context/AuthContext';
import useClinicalReviewForm from '../../hooks/useClinicalReviewForm';
import { exportElementToPDF } from '../../utils/exportPDF';

// Import subcomponents
import ReptilesReviewVariant from './clinical/ReptilesReviewVariant';
import NormalAvesReviewVariant from './clinical/NormalAvesReviewVariant';

const ClinicalReviewForm = () => {
  const formRef = useRef(null);
  const { step, isSaved, handleNext, handleBack, handleSave } = useClinicalReviewForm();
  const { user } = useAuth();

  const userRole = user?.role || '';
  const isAdmin = userRole === 'admin';
  const isAves = userRole === 'aves';
  const isReptiles = userRole === 'reptiles';

  const getDefaultVariant = () => {
    if (isAves) return 'aves';
    if (isReptiles) return 'reptiles';
    if (isAdmin) return 'normal';
    return 'normal';
  };

  const [variant, setVariant] = useState(getDefaultVariant);
  const canToggle = isAdmin;

  const getTitle = () => {
    switch (variant) {
      case 'aves': return 'FORMATO DE REVISIÓN CLÍNICA DE EJEMPLARES (AVES)';
      case 'reptiles': return 'FORMATO DE REVISIÓN CLÍNICA (REPTILES)';
      default: return 'FORMATO DE REVISIÓN CLÍNICA DE EJEMPLARES';
    }
  };

  const handleExportPDF = async () => {
    const formEl = formRef.current;
    if (!formEl) return;

    // Temporarily show both sheets so the PDF includes all pages
    const hoja1 = formEl.querySelector('#hoja1');
    const hoja2 = formEl.querySelector('#hoja2');
    const prevHoja1 = hoja1?.style.display || '';
    const prevHoja2 = hoja2?.style.display || '';
    if (hoja1) hoja1.style.display = 'block';
    if (hoja2) hoja2.style.display = 'block';

    // Reset zoom to 1 so PDF captures full-resolution content
    const prevZoom = formEl.style.zoom;
    formEl.style.zoom = '1';

    try {
      await exportElementToPDF(formEl, 'Revision_Clinica.pdf', 'portrait');
    } finally {
      if (hoja1) hoja1.style.display = prevHoja1;
      if (hoja2) hoja2.style.display = prevHoja2;
      formEl.style.zoom = prevZoom;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Premium Floating Variant Selector (only for admin) */}
      {canToggle && (
        <div className="flex justify-center w-full no-print">
          <div className="flex gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-md border border-gray-100">
            <button
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${variant === 'normal' ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
              onClick={() => setVariant('normal')}
            >
              <FaFileAlt /> General
            </button>
            <button
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${variant === 'aves' ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
              onClick={() => setVariant('aves')}
            >
              <FaDove /> Aves
            </button>
            <button
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${variant === 'reptiles' ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
              onClick={() => setVariant('reptiles')}
            >
              <FaLeaf /> Reptiles
            </button>
          </div>
        </div>
      )}

      {/* Main Document Card */}
      <div className="bg-white p-5 rounded shadow-sm" ref={formRef}>
        <div className="block">
          {variant === 'reptiles' ? (
            <ReptilesReviewVariant
              getTitle={getTitle}
              isSaved={isSaved}
              handleSave={handleSave}
              handleExportPDF={handleExportPDF}
            />
          ) : (
            <NormalAvesReviewVariant
              step={step}
              getTitle={getTitle}
              isSaved={isSaved}
              handleNext={handleNext}
              handleBack={handleBack}
              handleSave={handleSave}
              handleExportPDF={handleExportPDF}
              isAves={variant === 'aves'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalReviewForm;