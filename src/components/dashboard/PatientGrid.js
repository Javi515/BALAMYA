import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard';
import '../../styles/PatientGrid.css';

const ITEMS_PER_PAGE = 9;

const PatientGrid = ({ patients, searchTerm, category, location, group }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPatients, setFilteredPatients] = useState([]);

    // reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, category, location, group]);

    useEffect(() => {
        let result = patients;

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.id.toLowerCase().includes(term) ||
                (p.species && p.species.toLowerCase().includes(term))
            );
        }

        // Filter by Category (if not "todos")
        if (category && category.toLowerCase() !== 'todos') {
            result = result.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
        }

        // Filter by Species specific logic if needed, but usually covered by category or data structure
        // If the "category" prop comes from the URL (e.g. ?category=aves), we filter by that.

        // Filter by Location
        if (location && location !== 'Todas') {
            result = result.filter(p => p.locationType === location);
        }

        // Filter by Group
        if (group && group !== 'Todos') {
            // Assuming 'group' or logic exists in patient data. 
            // If not present in mock data, this might be a placeholder or need adaptation.
            // For now checking if a 'group' property exists or ignoring if data incomplete.
            if (group === 'Grupal') {
                result = result.filter(p => p.isGroup === true);
            } else if (group === 'Individual') {
                result = result.filter(p => !p.isGroup);
            }
        }

        setFilteredPatients(result);
    }, [patients, searchTerm, category, location, group]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (filteredPatients.length === 0) {
        return (
            <div className="no-results">
                <p>No se encontraron pacientes con los filtros seleccionados.</p>
            </div>
        );
    }

    return (
        <div className="patient-grid-container">
            <div className="patient-grid">
                {currentItems.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination-controls">
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>

                    <span className="pagination-info">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default PatientGrid;
