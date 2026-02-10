import React, { useState } from 'react';
import { FaSave, FaPrint, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../../styles/ClinicalReviewForm.css';
import '../../styles/ClinicalReviewFormPrint.css';
import '../../styles/FormButtons.css';

const ClinicalReviewForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handlePrint = () => window.print();

  return (
    <div className="card">
      <div className="clinical-review-form">

        {/* Hoja 1 */}
        <div className={`form-page ${step === 1 ? 'active' : ''}`} id="hoja1">
          {/* ENCABEZADO MOVIDO A HOJA 1 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            marginBottom: '20px'
          }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', margin: '0', marginBottom: '5px' }}>
              Zoológico Regional Miguel Álvarez del Toro
            </h1>
            <h2 style={{ fontSize: '1.2rem', color: '#666', fontWeight: 'normal', margin: '0', marginBottom: '10px' }}>
              Clínica Veterinaria
            </h2>
            <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #ccc', margin: '10px 0 15px 0' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#000', margin: '0' }}>
              FORMATO DE REVISIÓN CLÍNICA DE EJEMPLARES
            </h3>
          </div>

          <h3 className="page-title" style={{ textAlign: 'right', fontSize: '0.9rem', color: '#999' }}>Revisión Clínica - Hoja 1</h3>

          <div className="form-section">
            <h4 className="section-title">Datos Generales</h4>
            <div className="general-data-grid">
              {/* ... fields ... */}
              <div className="form-group">
                <label>Fecha</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Nombre Científico</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label>Nombre Común</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label>Ubicación</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label>Identificación</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label>Edad</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label>Peso</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label>Sexo</label>
                <input type="text" className="form-input" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Anamnesis</h4>
            <textarea className="form-textarea" rows="4"></textarea>
          </div>

          <div className="form-section">
            <h4 className="section-title">Revisión Clínica</h4>
            <div className="form-subsection">
              <h5>Constantes Fisiológicas</h5>
              <div className="phys-constants">
                <div className="form-group"><label>F.C.</label><input type="text" className="form-input" /></div>
                <div className="form-group"><label>F.R.</label><input type="text" className="form-input" /></div>
                <div className="form-group"><label>Temp.</label><input type="text" className="form-input" /></div>
                <div className="form-group"><label>T.LL.C.</label><input type="text" className="form-input" /></div>
              </div>
            </div>
            <div className="form-subsection">
              <h5>Aspecto General</h5>
              <textarea className="form-textarea" rows="3"></textarea>
            </div>
            <div className="form-subsection">
              <h5>Sistemas</h5>
              <label>Piel/Plumas</label>
              <textarea className="form-textarea" rows="2"></textarea>
              <label>Cardiovascular</label>
              <textarea className="form-textarea" rows="2"></textarea>
              <label>Respiratorio</label>
              <textarea className="form-textarea" rows="2"></textarea>
            </div>
          </div>

          <div className="form-actions next-button-container">
            <button className="form-button save-btn" onClick={handleNext}>
              Siguiente <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Separador de página para impresión */}
        <div className="page-break"></div>

        {/* Hoja 2 */}
        <div className={`form-page ${step === 2 ? 'active' : ''}`} id="hoja2">
          <h3 className="page-title" style={{ textAlign: 'right', fontSize: '0.9rem', color: '#999' }}>Revisión Clínica - Hoja 2</h3>

          <div className="form-section">
            <h4 className="section-title">Revisión de Sistemas (Continuación)</h4>
            <div className="form-subsection">
              <label>Digestivo</label>
              <textarea className="form-textarea" rows="2"></textarea>
              <label>Musculoesquelético</label>
              <textarea className="form-textarea" rows="2"></textarea>
              <label>Visual-Auditivo</label>
              <textarea className="form-textarea" rows="2"></textarea>
              <label>Urogenital</label>
              <textarea className="form-textarea" rows="2"></textarea>
              <label>Nervioso</label>
              <textarea className="form-textarea" rows="2"></textarea>
              <label>Ganglios Linfáticos</label>
              <textarea className="form-textarea" rows="2"></textarea>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Pruebas de Laboratorio Solicitadas</h4>
            <div className="lab-tests-grid">
              <div className="form-group"><label>BH</label><input type="text" className="form-input" /></div>
              <div className="form-group"><label>QS</label><input type="text" className="form-input" /></div>
              <div className="form-group"><label>Frotis</label><input type="text" className="form-input" /></div>
              <div className="form-group"><label>PAF</label><input type="text" className="form-input" /></div>
              <div className="form-group"><label>EGO</label><input type="text" className="form-input" /></div>
              <div className="form-group"><label>Coproparasitoscópico</label><input type="text" className="form-input" /></div>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Imágenes</h4>
            <div className="form-subsection">
              <label>Tomas de Rx</label>
              <input type="text" className="form-input" />
              <label>Ultrasonido (observaciones)</label>
              <input type="text" className="form-input" />
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Impresiones Diagnósticas</h4>
            <textarea className="form-textarea" rows="4"></textarea>
          </div>

          {/* SECCIÓN FIRMA (Limpia, sin bordes superiores extra) */}
          <div className="form-section signature-section" style={{ borderTop: 'none', marginTop: '20px' }}>
            <div className="form-section signature-section" style={{ borderTop: 'none', marginTop: '20px' }}>
              <div className="form-group" style={{ textAlign: 'center', width: '300px', margin: '0 auto' }}>
                <label style={{ display: 'block', marginBottom: '50px' }}>Responsable Clínico</label>
                <input type="text" className="signature-input-dark" style={{ textAlign: 'center' }} />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="form-button secondary-btn" onClick={handleBack}>
              <FaArrowLeft /> Atrás
            </button>
            <button className="form-button save-btn">
              <FaSave /> Guardar
            </button>
            <button className="form-button secondary-btn" onClick={handlePrint}>
              <FaPrint /> Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalReviewForm;