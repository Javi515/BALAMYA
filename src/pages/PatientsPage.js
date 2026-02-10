import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaTree, FaDove, FaFrog, FaUsers, FaUser, FaClinicMedical, FaSlidersH, FaMapMarkerAlt } from 'react-icons/fa';
import { GiLion, GiTortoise } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext';
import PatientGrid from '../components/dashboard/PatientGrid';
import { patients as mockPatients } from '../data/mockData';
import '../styles/PatientsPage.css';

const PatientsPage = () => {
  const { user, hasAccessToCategory } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false); // New state for toggling filters
  const [selectedLocation, setSelectedLocation] = useState('Todas');
  const [selectedSpecies, setSelectedSpecies] = useState('Todos');
  const [selectedGroup, setSelectedGroup] = useState('Todos');
  const location = useLocation();
  const navigate = useNavigate();

  // Get category from URL
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    if (user && user.specialty !== 'all') {
      if (category !== user.specialty) {
        navigate(`/patients?category=${user.specialty}`, { replace: true });
      }
    }
  }, [category, user, navigate]);

  let pageTitle = 'TODOS LOS EJEMPLARES';
  const isAllAnimalsView = !category || category === 'todos';

  if (!isAllAnimalsView) {
    if (category === 'mamiferos') pageTitle = 'MAMÍFEROS';
    else if (category === 'aves') pageTitle = 'AVES';
    else if (category === 'reptiles') pageTitle = 'REPTILES';
    else if (category === 'anfibios') pageTitle = 'ANFIBIOS';
  }

  const handleSpeciesClick = (species) => {
    setSelectedSpecies(species);
  };

  const isCasualtiesPage = location.pathname.startsWith('/casualties');

  return (
    <div className="patients-page-container">
      {!isCasualtiesPage && (
        <>
          <h1 className="patients-page-title">{pageTitle}</h1>

          {/* Filters Card */}
          <div className="filters-card">
            {/* Search Row & Toggle Button */}
            <div className="search-bar-row">
              <button
                className={`advanced-filters-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaSlidersH /> Filtros Avanzados
              </button>

              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por ID, nombre común o nombre científico..."
                  className="search-input-ios"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Collapsible Filters Section */}
            {showFilters && (
              <div className="advanced-filters-content">
                {/* Especie Row - ONLY visible in All Animals View */}
                {isAllAnimalsView && (
                  <div className="filter-row">
                    <span className="filter-label">ESPECIE:</span>
                    <div className="filter-options">
                      <button
                        className={`filter-chip ${selectedSpecies === 'Todos' ? 'active' : ''}`}
                        onClick={() => handleSpeciesClick('Todos')}
                      >
                        Todos
                      </button>
                      <button
                        className={`filter-chip ${selectedSpecies === 'Mamíferos' ? 'active' : ''}`}
                        onClick={() => handleSpeciesClick('Mamíferos')}
                      >
                        <GiLion className="filter-icon icon-mammal" />
                        Mamíferos
                      </button>
                      <button
                        className={`filter-chip ${selectedSpecies === 'Aves' ? 'active' : ''}`}
                        onClick={() => handleSpeciesClick('Aves')}
                      >
                        <FaDove className="filter-icon icon-bird" />
                        Aves
                      </button>
                      <button
                        className={`filter-chip ${selectedSpecies === 'Reptiles' ? 'active' : ''}`}
                        onClick={() => handleSpeciesClick('Reptiles')}
                      >
                        <GiTortoise className="filter-icon icon-reptile" />
                        Reptiles
                      </button>
                      <button
                        className={`filter-chip ${selectedSpecies === 'Anfibios' ? 'active' : ''}`}
                        onClick={() => handleSpeciesClick('Anfibios')}
                      >
                        <FaFrog className="filter-icon icon-amphibian" />
                        Anfibios
                      </button>
                    </div>
                  </div>
                )}

                {/* Ubicación Row */}
                <div className="filter-row">
                  <span className="filter-label">UBICACIÓN:</span>
                  <div className="filter-options">
                    <button
                      className={`filter-chip dropdown-trigger ${selectedLocation === 'Todas' ? '' : ''}`}
                      onClick={() => setSelectedLocation('Todas')}
                    >
                      Todas las Ubicaciones ▼
                    </button>
                    <button
                      className={`filter-chip ${selectedLocation === 'Cuarentena' ? 'active' : ''}`}
                      onClick={() => setSelectedLocation('Cuarentena')}
                    >
                      <FaClinicMedical className="filter-icon icon-quarantine" />
                      Cuarentena
                    </button>
                    <button
                      className={`filter-chip ${selectedLocation === 'Al aire libre' ? 'active' : ''}`}
                      onClick={() => setSelectedLocation('Al aire libre')}
                    >
                      <FaTree className="filter-icon" />
                      Al aire libre
                    </button>
                  </div>
                </div>

                {/* Grupo Row */}
                <div className="filter-row">
                  <span className="filter-label">AGRUPACIÓN:</span>
                  <div className="filter-options">
                    <button
                      className={`filter-chip ${selectedGroup === 'Todos' ? 'active' : ''}`}
                      onClick={() => setSelectedGroup('Todos')}
                    >
                      Todos
                    </button>
                    <button
                      className={`filter-chip ${selectedGroup === 'Grupal' ? 'active' : ''}`}
                      onClick={() => setSelectedGroup('Grupal')}
                    >
                      <FaUsers className="filter-icon" />
                      Grupal
                    </button>
                    <button
                      className={`filter-chip ${selectedGroup === 'Individual' ? 'active' : ''}`}
                      onClick={() => setSelectedGroup('Individual')}
                    >
                      <FaUser className="filter-icon" />
                      Individual
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Patient Grid */}
          <PatientGrid
            patients={mockPatients}
            searchTerm={searchTerm}
            category={category || selectedSpecies} // Pass URL category or filter selection
            location={selectedLocation}
            group={selectedGroup}
          />
        </>
      )}
    </div>
  );
};

export default PatientsPage;
