import React from 'react';
import {
    FaBell,
    FaCamera,
    FaShare,
    FaEdit,
    FaEnvelope,
    FaPhone,
    FaCertificate,
    FaGraduationCap,
    FaCalendarAlt,
    FaLock,
    FaGlobe,
    FaChevronRight,
    FaNotesMedical,
    FaExclamationTriangle,
    FaCog,
    FaHistory,
    FaStickyNote,
    FaPenNib
} from 'react-icons/fa';
import { MdPlace, MdBadge, MdTrendingUp } from 'react-icons/md';
import '../styles/ProfilePage.css';
import '../styles/ProfileHeader.css';
import '../styles/ProfileHero.css';
import '../styles/ProfileStats.css';
import '../styles/ProfileSettings.css';

const ProfilePage = () => {
    return (
        <div className="profile-page-container">
            {/* Main Profile Content */}
            <main className="profile-main">
                <h2 className="profile-page-title" style={{ marginBottom: '20px' }}>Perfil de Usuario</h2>
                <div className="profile-content-wrapper">

                    {/* Hero Card */}
                    <div className="profile-hero-card">
                        <div className="hero-banner"></div>
                        <div className="hero-content">
                            <div className="profile-avatar-container">
                                <div className="profile-avatar-large">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjfRZ3q9uYGH-kgN8cgEX9FC3N2lKsw19D3gKe-cirCL8TLeYtqMW0s_ZKLo2PMQT4-ktj3SYJmxoiIwuzWS9SO1NExx6cFBUfqmz7Baf4hcP-OiKDdZ2seuAV9Z1m6Yo-XC9VxGmNPWfPbhpH7aVeNQrlvuQ_rwKF-Cki5dlwgEnlBvyqP_g1cZN3Gk-Buy64WDQ9e03Zjjmy47RYdv__X_9VvdHGOOW63Yc_Ep6roe_1hyp7ygvsnG_jHyu_GW0zouD_lcB12_Q" alt="Dr. Alejandro Vera" />
                                </div>
                                <button className="camera-btn" title="Cambiar Foto">
                                    <FaCamera size={14} />
                                </button>
                            </div>

                            <div className="hero-text">
                                <h1 className="hero-name">Dr. Alejandro Vera</h1>
                                <p className="hero-role">Médico Veterinario Jefe</p>
                                <div className="hero-badges">
                                    <span className="badge-item"><MdBadge /> ID: VET-0042</span>
                                    <span>•</span>
                                    <span className="badge-item"><MdPlace /> Clínica Principal - Sector A</span>
                                </div>
                            </div>

                            <div className="hero-actions">
                                <button className="btn-share"><FaShare /> Compartir</button>
                                <button className="btn-edit"><FaEdit /> Editar Perfil</button>
                            </div>
                        </div>
                    </div>

                    {/* Grid Layout - Two Independent Columns */}
                    <div className="profile-grid">

                        {/* Left Column Stack */}
                        <div className="profile-column">
                            {/* Personal Info */}
                            <div className="info-card">
                                <h3 className="card-title">Información Personal</h3>
                                <div className="info-group">
                                    <div className="info-item">
                                        <label>Correo Electrónico</label>
                                        <div className="info-value">
                                            <FaEnvelope className="info-icon" /> a.vera@balamya.zoo
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <label>Teléfono</label>
                                        <div className="info-value">
                                            <FaPhone className="info-icon" /> +52 55 1234 5678
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <label>Cédula Profesional</label>
                                        <div className="info-value">
                                            <FaCertificate className="info-icon" /> 987654321
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <label>Especialidad</label>
                                        <div className="info-value">
                                            <FaGraduationCap className="info-icon" /> Fauna Silvestre y Exótica
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <label>Fecha de Ingreso</label>
                                        <div className="info-value">
                                            <FaCalendarAlt className="info-icon" /> 15 de Marzo, 2018
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Notes */}
                            <div className="info-card notes-card-wrapper">
                                <div className="card-header-simple">
                                    <FaStickyNote size={20} className="text-yellow-note" />
                                    <h4>Notas Rápidas</h4>
                                </div>
                                <textarea
                                    className="notes-area"
                                    placeholder="Escribe una nota rápida aquí..."
                                    defaultValue="Recordar revisar expediente de Leo mañana a primera hora."
                                ></textarea>
                            </div>
                        </div>

                        {/* Right Column Stack */}
                        <div className="profile-column">
                            {/* Settings Card */}
                            <div className="info-card">
                                <h3 className="card-title">Configuración de Cuenta</h3>
                                <div className="settings-list">

                                    <div className="setting-item group">
                                        <div className="setting-left">
                                            <div className="setting-icon-box"><FaLock /></div>
                                            <div className="setting-text">
                                                <h4>Seguridad y Contraseña</h4>
                                                <p>Actualizar contraseña y 2FA</p>
                                            </div>
                                        </div>
                                        <FaChevronRight className="setting-arrow" />
                                    </div>

                                    <div className="setting-item group">
                                        <div className="setting-left">
                                            <div className="setting-icon-box"><FaBell /></div>
                                            <div className="setting-text">
                                                <h4>Notificaciones</h4>
                                                <p>Alertas de pacientes y turnos</p>
                                            </div>
                                        </div>
                                        <div className="toggle-wrapper">
                                            <input type="checkbox" id="toggle" className="toggle-checkbox" />
                                            <label htmlFor="toggle" className="toggle-label"></label>
                                        </div>
                                    </div>

                                    <div className="setting-item group">
                                        <div className="setting-left">
                                            <div className="setting-icon-box"><FaGlobe /></div>
                                            <div className="setting-text">
                                                <h4>Idioma y Región</h4>
                                                <p>Español (México) / GMT-6</p>
                                            </div>
                                        </div>
                                        <FaChevronRight className="setting-arrow" />
                                    </div>

                                </div>
                            </div>

                            {/* Split Row: Signature & Activity */}
                            <div className="split-row">

                                {/* Signature Zone (Left) */}
                                <div className="info-card" style={{ padding: '0px', overflow: 'hidden' }}>
                                    <div className="signature-zone">
                                        <FaPenNib size={32} color="#d1d5db" />
                                        <span className="signature-text">Agregar Firma Digital</span>
                                    </div>
                                </div>

                                {/* Activity Card (Right - Compact) */}
                                <div className="info-card">
                                    <div className="card-header-simple">
                                        <FaHistory size={20} className="text-blue-500" />
                                        <h4>Actividad</h4>
                                    </div>
                                    <div className="activity-list">
                                        <div className="activity-item">
                                            <div className="activity-dot dot-blue"></div>
                                            <div className="activity-content">
                                                <h5>Ingreso P003</h5>
                                                <p className="activity-meta">Hace 2h</p>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-dot dot-green"></div>
                                            <div className="activity-content">
                                                <h5>Alta Luna</h5>
                                                <p className="activity-meta">Ayer</p>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-dot dot-yellow"></div>
                                            <div className="activity-content">
                                                <h5>Pass Updated</h5>
                                                <p className="activity-meta">20 Oct</p>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" className="view-all-link">Ver historial</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
