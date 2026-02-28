import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNotesMedical, FaStethoscope, FaSyringe, FaChartBar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../../styles/RecordsTable.module.css';
import gridStyles from '../../styles/PatientGrid.module.css'; // Import pagination styles

const ITEMS_PER_PAGE = 10;

const RecordsTable = ({ records, viewMode = 'grid' }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when records prop changes (e.g. filters applied)
    useEffect(() => {
        setCurrentPage(1);
    }, [records]);

    // Helpers for Icons (Moved inside component for modularity)
    const getProcedureIcon = (type) => {
        const t = (type || '').toUpperCase();
        if (t.includes('VACUNACIÓN')) return <FaSyringe className="text-blue-500" />;
        if (t.includes('REVISIÓN')) return <FaStethoscope className="text-green-500" />;
        if (t.includes('TRATAMIENTO')) return <FaNotesMedical className="text-indigo-500" />;
        if (t.includes('NECROPSIA')) return <span className="text-gray-900">💀</span>;
        if (t.includes('ANESTESIA')) return <FaSyringe className="text-purple-500" />;
        return <FaNotesMedical className="text-gray-500" />;
    };

    const getFormKey = (type) => {
        const t = (type || '').toUpperCase();
        if (t.includes('VACUNACIÓN')) return 'vaccination';
        if (t.includes('REVISIÓN')) return 'clinicalReview';
        if (t.includes('TRATAMIENTO GRUPAL')) return 'groupTreatment';
        if (t.includes('TRATAMIENTO')) return 'treatment';
        if (t.includes('NECROPSIA')) return 'necropsy';
        if (t.includes('ANESTESIA')) return 'anesthesia';
        if (t.includes('HOSPITALIZACIÓN')) return 'hospFollowUp';
        if (t.includes('DESPARASITACIÓN')) return 'deworming';
        return 'clinicalReview';
    };

    // Pagination Logic
    const totalPages = Math.ceil(records.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = records.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Optional: scroll to top of table
        }
    };

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

    // --- Grid View Card Render ---
    const renderCard = (record) => {
        // Status Badge Styling Function
        const getStatusBadge = (status) => {
            if (!status) return null;
            const s = status.toLowerCase();
            if (s.includes('saludable') || s.includes('estable')) return 'bg-emerald-100/90 text-emerald-800';
            if (s.includes('crítico') || s.includes('tratamiento')) return 'bg-red-100/90 text-red-800';
            if (s.includes('observación')) return 'bg-amber-100/90 text-amber-800';
            return 'bg-gray-100/90 text-gray-800';
        };

        return (
            <div key={record.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden group">
                {/* Image Section */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-50">
                    <img
                        src={record.imageUrl || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800'}
                        alt={record.commonName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800'; }}
                    />
                    {/* Gradient overlay for better text contrast if we had bottom text on image */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity"></div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Header: ID & Animal Name */}
                    <div className="grid grid-cols-[85px_1fr] gap-x-2 items-baseline mb-2">
                        <span className="text-[0.75rem] font-bold text-slate-800 font-mono tracking-tight">{record.id}</span>
                        <h3 className="text-base font-bold text-slate-900 leading-tight m-0 line-clamp-1">{record.commonName || 'Sin Nombre Común'}</h3>
                    </div>

                    {/* Data List */}
                    <div className="space-y-1.5 mb-4 flex-grow">
                        <div className="grid grid-cols-[85px_1fr] gap-x-2 items-start text-[0.8rem]">
                            <span className="font-bold text-slate-900">Especie:</span>
                            <span className="text-slate-600 italic leading-tight line-clamp-1">{record.scientificName || '-'}</span>
                        </div>
                        <div className="grid grid-cols-[85px_1fr] gap-x-2 items-start text-[0.8rem]">
                            <span className="font-bold text-slate-900">Ubicación:</span>
                            <span className="text-slate-600 leading-tight line-clamp-1">{record.location || '-'}</span>
                        </div>
                        <div className="grid grid-cols-[85px_1fr] gap-x-2 items-start text-[0.8rem]">
                            <span className="font-bold text-slate-900">Fecha:</span>
                            <span className="text-slate-600 leading-tight">{record.date || '-'}</span>
                        </div>
                        <div className="grid grid-cols-[85px_1fr] gap-x-2 items-start text-[0.8rem]">
                            <span className="font-bold text-slate-900">Vet:</span>
                            <span className="text-slate-600 leading-tight line-clamp-1">{record.doctor || '-'}</span>
                        </div>
                        <div className="grid grid-cols-[85px_1fr] gap-x-2 items-start text-[0.8rem]">
                            <span className="font-bold text-slate-900">Procedimiento:</span>
                            <span className="text-slate-600 leading-tight line-clamp-1 uppercase text-[0.7rem] mt-[1px]">{record.type || '-'}</span>
                        </div>
                    </div>

                    {/* Footer Button */}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                        <button
                            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-blue-50/50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-sm font-bold transition-all duration-300 group/btn"
                            onClick={() => {
                                const formKey = getFormKey(record.type);
                                navigate(`/forms?form=${formKey}&animalName=${encodeURIComponent(record.name)}&origin=history`);
                            }}
                        >
                            Ver Detalles
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles['records-container']}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className={styles['records-title']} style={{ margin: 0 }}>Registros Encontrados</h3>
                    <span className={styles['records-count-badge']}>{records.length} RESULTADOS</span>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className={gridStyles['medical-history-grid']}>
                    {currentItems.length > 0 ? (
                        currentItems.map(renderCard)
                    ) : (
                        <div className={`${gridStyles['no-results']} col-span-full`}>
                            No se encontraron registros que coincidan con tu búsqueda.
                        </div>
                    )}
                </div>
            ) : (
                <table className={styles['records-table']}>
                    <thead>
                        <tr>
                            <th>ID Expediente</th>
                            <th>Nombre Común</th>
                            <th>Especie</th>
                            <th>Ubicación</th>
                            <th>Fecha que atendió</th>
                            <th>Veterinario</th>
                            <th>Procedimiento</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((record) => (
                                <tr key={record.id}>
                                    <td><span className={styles['record-id']}>{record.id}</span></td>
                                    <td>
                                        <div className={styles['species-info']}>
                                            <div className={styles['common-name']}>{record.commonName || 'Sin Nombre Común'}</div>
                                        </div>
                                    </td>
                                    <td className={styles['scientific-name']}>{record.scientificName}</td>
                                    <td><span className={styles['record-location']}>{record.location}</span></td>
                                    <td>{record.date}</td>
                                    <td>
                                        <div className={styles['doctor-name']}>{record.doctor}</div>
                                    </td>
                                    <td>
                                        <div className={styles['procedure-info']}>
                                            {getProcedureIcon(record.type)}
                                            {record.type}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={`${styles['view-record-btn']} flex items-center justify-center gap-1.5 px-3 py-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-lg transition-colors font-semibold group w-full`}
                                            onClick={() => {
                                                const formKey = getFormKey(record.type);
                                                // Passing data via URL search params
                                                navigate(`/forms?form=${formKey}&animalName=${encodeURIComponent(record.name)}&origin=history`);
                                            }}
                                        >
                                            Ver Detalles
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className={styles['empty-state']}>
                                    No se encontraron registros que coincidan con tu búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {totalPages > 1 && (
                <div className={gridStyles.pagination}>
                    <div className={gridStyles['pagination-controls']}>
                        <button
                            className={gridStyles['page-btn-nav']}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <FaChevronLeft style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                            Anterior
                        </button>

                        <div className={gridStyles['pagination-numbers']}>
                            {getPageNumbers(currentPage, totalPages).map((pageNumber, index) => (
                                <button
                                    key={index}
                                    className={`${gridStyles['page-btn']} ${pageNumber === currentPage ? gridStyles.active : ''} ${pageNumber === '...' ? gridStyles.dots : ''}`}
                                    disabled={pageNumber === '...'}
                                    onClick={() => pageNumber !== '...' && handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>

                        <button
                            className={gridStyles['page-btn-nav']}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Siguiente
                            <FaChevronRight style={{ marginLeft: '6px', fontSize: '0.8rem' }} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordsTable;
