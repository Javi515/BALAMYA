import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEye, FaNotesMedical, FaEdit, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../styles/HospitalizationPage.module.css';
import { patients as allPatients } from '../data/mockData';

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800';

// Look up the real photo from patient data by species match
const getPatientPhoto = (scientificName) => {
    const match = allPatients.find(p => p.scientificName === scientificName);
    return match?.imageUrl || DEFAULT_PHOTO;
};

const baseMock = [
    {
        name: 'Balam',
        species: 'Panthera onca',
        commonName: 'Jaguar',
        area: 'Cuarentena A',
        admissionDate: '2024-01-15',
        diagnosis: 'Gastroenteritis moderada con deshidratación leve',
        responsible: 'Dr. Alejandro Vera',
    },
    {
        name: 'Lola',
        species: 'Ara macao',
        commonName: 'Guacamaya Roja',
        area: 'Hospital Aves',
        admissionDate: '2024-02-10',
        diagnosis: 'Fractura de radio derecho en proceso de consolidación',
        responsible: 'Dra. Sofia Mendez',
    },
    {
        name: 'Godzilla',
        species: 'Iguana iguana',
        commonName: 'Iguana Verde',
        area: 'Terrario UCI',
        admissionDate: '2024-02-12',
        diagnosis: 'Hipocalcemia severa y retención de huevos',
        responsible: 'Dr. Alejandro Vera',
    },
    {
        name: 'Simba',
        species: 'Puma concolor',
        commonName: 'Puma',
        area: 'Cuarentena B',
        admissionDate: '2024-02-01',
        diagnosis: 'Chequeo rutinario post-traslado',
        responsible: 'Dr. Alejandro Vera',
    },
];

const MOCK_HOSPITALIZED = Array.from({ length: 150 }, (_, i) => {
    const base = baseMock[i % baseMock.length];
    return {
        ...base,
        id: `H-2024-${String(i + 1).padStart(3, '0')}`,
        name: `${base.name} ${i + 1}`
    };
});

const HospitalizationPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('Todas');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Helper for smart pagination
    const getPageNumbers = (currentPage, totalPages) => {
        const delta = 1;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    // Filter Logic
    const filteredPatients = MOCK_HOSPITALIZED.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.commonName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecies = speciesFilter === 'Todas' || patient.commonName === speciesFilter;

        return matchesSearch && matchesSpecies;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);



    return (
        <div className={styles['hospitalization-container']}>
            {/* 1. Encabezado */}
            <div className={styles['hospitalization-header']}>
                <div className={styles['header-title-group']}>
                    <h1>Pacientes Hospitalizados</h1>
                    <p>Listado de ejemplares en atención clínica activa</p>
                </div>
                <button className={styles['btn-new-admission']}>
                    <FaPlus /> Nuevo Ingreso
                </button>
            </div>

            {/* 2. Controles de Filtro y Búsqueda */}
            <div className={styles['controls-bar']}>
                <div className={styles['search-wrapper']}>
                    <FaSearch className={styles['search-icon']} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o especie..."
                        className={styles['search-input']}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select className={styles['filter-select']} value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
                    <option value="Todas">Todas las Especies</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Guacamaya Roja">Guacamaya Roja</option>
                    <option value="Iguana Verde">Iguana Verde</option>
                    <option value="Puma">Puma</option>
                </select>


            </div>

            {/* 3. Tabla Principal (Desktop) */}
            <div className={styles['table-container']}>
                <table className={styles['clinical-table']}>
                    <thead>
                        <tr>
                            <th>Ejemplar</th>
                            <th>Especie</th>
                            <th>Ubicación</th>
                            <th>Ingreso</th>
                            <th>Diagnóstico Presuntivo</th>
                            <th>Responsable</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map(patient => (
                                <tr key={patient.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img src={getPatientPhoto(patient.species)} alt={patient.name} className={styles['patient-thumb']} />
                                            <div>
                                                <span className={styles['patient-name']}>{patient.name}</span>
                                                <span className={styles['scientific-name']}>{patient.species}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{patient.commonName}</td>
                                    <td>{patient.area}</td>
                                    <td>{patient.admissionDate}</td>
                                    <td>
                                        <div className={styles['diagnosis-text']} title={patient.diagnosis}>
                                            {patient.diagnosis}
                                        </div>
                                    </td>
                                    <td>{patient.responsible}</td>
                                    <td>
                                        <div className={styles['actions-cell']}>
                                            <button className={styles['action-btn']} title="Ver Detalle"><FaEye /></button>
                                            <button className={styles['action-btn']} title="Evolución"><FaNotesMedical /></button>
                                            <button className={styles['action-btn']} title="Editar"><FaEdit /></button>
                                            <button className={`${styles['action-btn']} ${styles['btn-discharge']}`} title="Dar de Alta"><FaSignOutAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                                    No se encontraron pacientes registrados con los filtros actuales.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Paginación */}
                <div className={styles['pagination']}>
                    <div className={styles['pagination-controls']}>
                        <button
                            className={styles['page-btn-nav']}
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            <FaChevronLeft /> Anterior
                        </button>

                        {getPageNumbers(currentPage, totalPages).map((pageNumber, index) => (
                            <button
                                key={index}
                                className={`${styles['page-btn']} ${pageNumber === currentPage ? styles['active'] : ''} ${pageNumber === '...' ? styles['dots'] : ''}`}
                                disabled={pageNumber === '...'}
                                onClick={() => pageNumber !== '...' && setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            className={styles['page-btn-nav']}
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >
                            Siguiente <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Vista Móvil (Cards) */}
            <div className={styles['mobile-cards-container']}>
                {currentItems.map(patient => (
                    <div key={patient.id} className={styles['mobile-patient-card']}>
                        <div className={styles['card-header']}>
                            <div className={styles['card-patient-info']}>
                                <img src={getPatientPhoto(patient.species)} alt={patient.name} className={styles['patient-thumb']} />
                                <div>
                                    <span className={styles['patient-name']}>{patient.name}</span>
                                    <span className={styles['scientific-name']}>{patient.species}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles['card-body']}>
                            <div className={styles['card-row']}>
                                <span className={styles['card-label']}>Ubicación:</span>
                                <span>{patient.area}</span>
                            </div>
                            <div className={styles['card-row']}>
                                <span className={styles['card-label']}>Diagnóstico:</span>
                                <span>{patient.diagnosis}</span>
                            </div>
                            <div className={styles['card-row']}>
                                <span className={styles['card-label']}>Responsable:</span>
                                <span>{patient.responsible}</span>
                            </div>
                        </div>
                        <div className={styles['card-actions']}>
                            <button className={styles['action-btn']} title="Ver Detalle"><FaEye /> Ver</button>
                            <button className={styles['action-btn']} title="Evolución"><FaNotesMedical /> Evolución</button>
                            <button className={`${styles['action-btn']} ${styles['btn-discharge']}`} title="Alta"><FaSignOutAlt /> Alta</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalizationPage;
