import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { FaPaw, FaHome, FaSkull, FaFileMedical, FaClipboardList, FaChartBar, FaBell, FaUserMd, FaSignOutAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../common/Modal';
import '../../styles/Sidebar.css';

import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, toggle }) => {
  const { user, logout, hasAccessToCategory } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPatientsOpen, setIsPatientsOpen] = useState(false);
  const [isCasualtiesOpen, setIsCasualtiesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileClose = () => {
    // Coincidir con el breakpoint del CSS para ocultar en clic
    if (window.innerWidth <= 1100 && isOpen) {
      toggle();
    }
  };

  const handleLinkClick = () => {
    setIsPatientsOpen(false); // Cierra el menú de pacientes al ir a otra sección
    setIsCasualtiesOpen(false); // Cierra el menú de bajas al ir a otra sección
    handleMobileClose();
  };

  const handleSubMenuClick = () => {
    handleMobileClose();
    // No cerramos el menú de pacientes/bajas aquí para mantener el contexto
  };

  const isPatientsSectionActive = location.pathname.startsWith('/patients');
  const isCasualtiesSectionActive = location.pathname.startsWith('/casualties');

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    // Trigger transition
    const overlay = document.createElement('div');
    overlay.className = 'logout-overlay';
    document.body.appendChild(overlay);

    // Force reflow
    void overlay.offsetWidth;

    overlay.classList.add('active');

    setTimeout(() => {
      logout(); // Call auth logout
      navigate('/');
      // Cleanup happens on navigation (page unmount/remount), but good to be safe if SPA remains mounted
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 100);
    }, 500); // Wait for transition
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-icon-wrapper">
              <FaPaw className="icon-brand" />
            </span>
            <span>BALAMYA</span>
          </div>
          <button className="close-btn" onClick={toggle}>&times;</button>
        </div>
        <div className="sidebar-body">
          <nav className="sidebar-nav">
            <ul>
              <li>
                <NavLink to="/dashboard" onClick={handleLinkClick} className={({ isActive }) => isActive ? "active" : ""}>
                  <FaHome className="menu-icon icon-home" />
                  Inicio
                </NavLink>
              </li>
              <li>
                <div className={`menu-item-with-submenu ${isPatientsOpen ? 'open' : ''} ${isPatientsSectionActive ? 'active-section' : ''}`} onClick={() => setIsPatientsOpen(!isPatientsOpen)}>
                  <div className="menu-link">
                    <FaPaw className="menu-icon icon-patients" />
                    Pacientes
                  </div>
                  <span className="chevron">{isPatientsOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                </div>
                <ul className={`submenu ${isPatientsOpen ? 'open' : ''}`}>
                  {hasAccessToCategory('all') && (
                    <li>
                      <NavLink to="/patients" end onClick={handleSubMenuClick} className={({ isActive }) => isActive && !window.location.search.includes('category=') ? "active" : ""}>
                        Todos los animales
                      </NavLink>
                    </li>
                  )}
                  {hasAccessToCategory('aves') && (
                    <li>
                      <NavLink to="/patients?category=aves" onClick={handleSubMenuClick} className={({ isActive }) => isActive && window.location.search.includes('aves') ? "active" : ""}>
                        Aves
                      </NavLink>
                    </li>
                  )}
                  {hasAccessToCategory('mamiferos') && (
                    <li>
                      <NavLink to="/patients?category=mamiferos" onClick={handleSubMenuClick} className={({ isActive }) => isActive && window.location.search.includes('mamiferos') ? "active" : ""}>
                        Mamíferos
                      </NavLink>
                    </li>
                  )}
                  {hasAccessToCategory('reptiles') && (
                    <li>
                      <NavLink to="/patients?category=reptiles" onClick={handleSubMenuClick} className={({ isActive }) => isActive && window.location.search.includes('reptiles') ? "active" : ""}>
                        Reptiles
                      </NavLink>
                    </li>
                  )}
                  {hasAccessToCategory('anfibios') && (
                    <li>
                      <NavLink to="/patients?category=anfibios" onClick={handleSubMenuClick} className={({ isActive }) => isActive && window.location.search.includes('anfibios') ? "active" : ""}>
                        Anfibios
                      </NavLink>
                    </li>
                  )}
                </ul>
              </li>
              <li>
                <div className={`menu-item-with-submenu ${isCasualtiesOpen ? 'open' : ''} ${isCasualtiesSectionActive ? 'active-section' : ''}`} onClick={() => setIsCasualtiesOpen(!isCasualtiesOpen)}>
                  <div className="menu-link">
                    <FaSkull className="menu-icon icon-casualties" />
                    Bajas
                  </div>
                  <span className="chevron">{isCasualtiesOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                </div>
                <ul className={`submenu ${isCasualtiesOpen ? 'open' : ''}`}>
                  <li>
                    <NavLink to="/casualties?reason=1" onClick={handleSubMenuClick} className={({ isActive }) => isActive && window.location.search.includes('reason=1') ? "active" : ""}>
                      Razón 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/casualties?reason=2" onClick={handleSubMenuClick} className={({ isActive }) => isActive && window.location.search.includes('reason=2') ? "active" : ""}>
                      Razón 2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/casualties?reason=3" onClick={handleSubMenuClick} className={({ isActive }) => isActive && window.location.search.includes('reason=3') ? "active" : ""}>
                      Razón 3
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/medical-history" onClick={handleLinkClick} className={({ isActive }) => isActive ? "active" : ""}>
                  <FaFileMedical className="menu-icon icon-history" />
                  Historial Clínico
                </NavLink>
              </li>
              <li>
                <NavLink to="/forms" onClick={handleLinkClick} className={({ isActive }) => isActive ? "active" : ""}>
                  <FaClipboardList className="menu-icon icon-forms" />
                  Herramientas
                </NavLink>
              </li>

              <li>
                <NavLink to="/reports" onClick={handleLinkClick} className={({ isActive }) => isActive ? "active" : ""}>
                  <FaChartBar className="menu-icon icon-reports" />
                  Reportes
                </NavLink>
              </li>
              <li>
                <NavLink to="/alerts" onClick={handleLinkClick} className={({ isActive }) => isActive ? "active" : ""}>
                  <FaBell className="menu-icon icon-notifications" />
                  Notificaciones
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" onClick={handleLinkClick} className={({ isActive }) => isActive ? "active" : ""}>
                  <FaUserMd className="menu-icon icon-profile" />
                  Mi Perfil
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => setIsLogoutModalOpen(true)}>
            <FaSignOutAlt className="menu-icon icon-logout" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirmar Cierre de Sesión"
        footer={
          <>
            <button className="btn-modal btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>
              Cancelar
            </button>
            <button className="btn-modal btn-confirm" onClick={confirmLogout}>
              Cerrar Sesión
            </button>
          </>
        }
      >
        <p>¿Está seguro de que desea salir del sistema?</p>
      </Modal>
    </>
  );
};

export default Sidebar;