import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import '../../styles/FiltersBar.css';

const FiltersBar = ({
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedLocation,
    setSelectedLocation,
    selectedDoctor,
    setSelectedDoctor,
    selectedDate,
    setSelectedDate
}) => {
    return (
        <div className="filters-bar">
            <div className="search-input-container">
                <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                    type="text"
                    placeholder="Buscar por ID, Nombre Común o Nombre Científico..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <div style={{ position: 'relative' }}>
                    <select
                        className="action-btn"
                        style={{
                            background: 'white',
                            color: '#555',
                            border: '1px solid #ddd',
                            paddingRight: '35px',
                            cursor: 'pointer',
                            height: '45px',
                            outline: 'none',
                            appearance: 'none',
                            WebkitAppearance: 'none'
                        }}
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="all">📁 Todos los Formatos</option>
                        <option value="Revisión">🩺 Revisión Clínica</option>
                        <option value="Vacunación">💉 Vacunación</option>
                        <option value="Desparasitación">💊 Desparasitación</option>
                        <option value="Necropsia">💀 Necropsia</option>
                        <option value="Plan Terapéutico">📋 Plan Terapéutico</option>
                        <option value="Análisis">🔬 Análisis de Laboratorio</option>
                    </select>
                    <FaFilter style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
                </div>

                {/* Location Filter Dropdown */}
                <div style={{ position: 'relative' }}>
                    <select
                        className="action-btn"
                        style={{
                            background: 'white',
                            color: '#555',
                            border: '1px solid #ddd',
                            paddingRight: '35px',
                            cursor: 'pointer',
                            height: '45px',
                            outline: 'none',
                            appearance: 'none',
                            WebkitAppearance: 'none'
                        }}
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="all">📍 Todas las Ubicaciones</option>
                        <option value="Aire Libre">🌳 Aire Libre</option>
                        <option value="Cuarentena">⚠️ Cuarentena</option>
                        <option value="Recinto">🏠 Recinto</option>
                        <option value="Clínica">🏥 Clínica</option>
                    </select>
                    <FaFilter style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
                </div>

                {/* Doctor Filter Dropdown */}
                <div style={{ position: 'relative' }}>
                    <select
                        className="action-btn"
                        style={{
                            background: 'white',
                            color: '#555',
                            border: '1px solid #ddd',
                            paddingRight: '35px',
                            cursor: 'pointer',
                            height: '45px',
                            outline: 'none',
                            appearance: 'none',
                            WebkitAppearance: 'none'
                        }}
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        <option value="all">👨‍⚕️ Todos los Médicos</option>
                        <option value="Dr. Alejandro Vera">Dr. Alejandro Vera</option>
                        <option value="Dra. María Solís">Dra. María Solís</option>
                        <option value="Dr. Carlos Méndez">Dr. Carlos Méndez</option>
                    </select>
                    <FaFilter style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
                </div>

                {/* Date Filter */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="date"
                        className="action-btn"
                        style={{
                            background: 'white',
                            color: '#555',
                            border: '1px solid #ddd',
                            cursor: 'pointer',
                            height: '45px',
                            outline: 'none',
                            paddingLeft: '15px'
                        }}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FiltersBar;
