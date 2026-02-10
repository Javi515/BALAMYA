import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light min-h-screen flex font-sans antialiased overflow-x-hidden">
            <div className="hidden lg:flex w-[35%] organic-bg flex-col justify-between p-14 text-white relative shadow-2xl z-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0 0 C 20 40 40 60 60 20 C 80 -20 100 20 100 100 L 0 100 Z" fill="white" fillOpacity="0.1"></path>
                        <path d="M0 100 C 30 70 50 80 70 40 C 90 0 100 50 100 0 L 0 0 Z" fill="white" fillOpacity="0.05"></path>
                    </svg>
                </div>
                <div className="absolute -right-24 top-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="material-symbols-outlined text-4xl">pets</span>
                        <span className="text-xl font-bold tracking-[0.2em] uppercase opacity-90">Balamya</span>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-5xl font-light leading-tight tracking-tight">
                            Control de la <br />
                            <span className="font-bold">Colección Animal</span>
                        </h1>
                        <p className="text-blue-50 text-lg font-light leading-relaxed max-w-[260px] opacity-80">
                            Gestión clínica veterinaria de precisión para instituciones zoológicas de alto nivel.
                        </p>
                    </div>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 p-4 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 w-full max-w-sm">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/20 shadow-inner">
                                <span className="material-symbols-outlined text-white text-[24px]">verified_user</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-[15px] tracking-wide leading-tight">Acceso Seguro</span>
                            <span className="text-blue-100/70 text-[10px] uppercase tracking-widest font-medium mt-0.5">CIFRADO DE GRADO MÉDICO</span>
                        </div>
                    </div>
                    <div className="mt-12 flex items-center gap-3 text-[10px] text-blue-200 uppercase tracking-widest opacity-60">
                        <span>© 2024 Balamya Systems</span>
                        <span className="w-1 h-1 rounded-full bg-blue-200"></span>
                        <span>Portal Institucional</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center p-8 right-pattern relative min-h-screen">
                <div className="absolute inset-0 animal-watermark opacity-40 pointer-events-none"></div>
                <div className="lg:hidden w-full flex justify-start items-center gap-2 text-primary mb-6 z-20">
                    <span className="material-symbols-outlined text-3xl">pets</span>
                    <span className="font-bold tracking-widest text-lg">BALAMYA</span>
                </div>
                <div className="w-full max-w-lg bg-white p-14 rounded-3xl shadow-card-enterprise border border-gray-100 relative z-10 my-auto">
                    <div className="flex justify-center mb-6">
                        <div className="h-14 w-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-200/50">
                            <span className="material-symbols-outlined text-3xl">medical_services</span>
                        </div>
                    </div>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Bienvenido</h2>
                        <p className="text-gray-500 text-sm font-medium tracking-wide">Ingrese sus credenciales para acceder al panel clínico.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-fade-in flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl">error</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-7">
                        <div className="space-y-2 group">
                            <label className="block text-sm font-semibold text-gray-700 ml-1 group-focus-within:text-primary transition-colors uppercase tracking-wider text-[11px]" htmlFor="email">Correo Institucional</label>
                            <div className="relative transition-all duration-300 transform group-focus-within:-translate-y-0.5">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors text-[22px]">mail</span>
                                </div>
                                <input
                                    autoComplete="email"
                                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 text-gray-900 rounded-xl shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white transition-all duration-300 sm:text-sm font-medium"
                                    id="email"
                                    name="email"
                                    placeholder="nombre@balamya.org"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 group">
                            <div className="flex items-center justify-between ml-1">
                                <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-primary transition-colors uppercase tracking-wider text-[11px]" htmlFor="password">Contraseña</label>
                            </div>
                            <div className="relative transition-all duration-300 transform group-focus-within:-translate-y-0.5">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors text-[22px]">lock</span>
                                </div>
                                <input
                                    autoComplete="current-password"
                                    className="block w-full pl-12 pr-12 py-4 bg-gray-50 border-0 text-gray-900 rounded-xl shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white transition-all duration-300 sm:text-sm font-medium"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer outline-none" type="button">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center">
                                <input className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer transition-colors" id="remember-me" name="remember-me" type="checkbox" />
                                <label className="ml-2 block text-sm text-gray-600 cursor-pointer select-none font-medium" htmlFor="remember-me">Recordar dispositivo</label>
                            </div>
                            <div className="text-sm">
                                <button type="button" className="font-medium text-primary hover:text-blue-700 transition-colors bg-transparent border-0 p-0 cursor-pointer">Recuperar clave</button>
                            </div>
                        </div>
                        <div className="pt-4">
                            <button
                                className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold tracking-wide rounded-xl text-white bg-blue-600 hover:bg-blue-700 hover:shadow-btn-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden uppercase cursor-pointer ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                <span className="relative z-10">{isLoading ? 'Iniciando...' : 'Iniciar Sesión'}</span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full px-12 z-10 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400 border-t border-gray-200/60 pt-6 max-w-4xl mx-auto">
                        <div className="flex gap-6 tracking-wide">
                            <button type="button" className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">Centro de Ayuda</button>
                            <button type="button" className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">Preguntas Frecuentes</button>
                            <button type="button" className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">Privacidad</button>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider">System Operational</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <span className="opacity-60">v4.2.0-Ent</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
