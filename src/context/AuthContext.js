import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// Mock Users Database
const MOCK_USERS = [
    {
        email: 'admin@balamya.org',
        password: 'admin',
        name: 'Administrador Principal',
        role: 'admin',
        specialty: 'all', // Can see everything
        avatar: 'admin-avatar.jpg'
    },
    {
        email: 'aves@balamya.org',
        password: 'aves',
        name: 'Dr. Ornitólogo',
        role: 'veterinarian',
        specialty: 'aves',
        avatar: 'vet-aves.jpg'
    },
    {
        email: 'mamiferos@balamya.org',
        password: 'mamiferos',
        name: 'Dr. Mastozoológo',
        role: 'veterinarian',
        specialty: 'mamiferos',
        avatar: 'vet-mamiferos.jpg'
    },
    {
        email: 'reptiles@balamya.org',
        password: 'reptiles',
        name: 'Dr. Herpetólogo (Reptiles)',
        role: 'veterinarian',
        specialty: 'reptiles',
        avatar: 'vet-reptiles.jpg'
    },
    {
        email: 'anfibios@balamya.org',
        password: 'anfibios',
        name: 'Dr. Herpetólogo (Anfibios)',
        role: 'veterinarian',
        specialty: 'anfibios',
        avatar: 'vet-anfibios.jpg'
    },
    {
        email: 'asistente@balamya.org',
        password: 'assist',
        name: 'Asistente General',
        role: 'assistant',
        specialty: 'all', // Can see all lists but maybe restricted actions (in future)
        avatar: 'assistant.jpg'
    }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved session on load
        const savedUser = localStorage.getItem('balamya_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

                if (foundUser) {
                    // Remove password from state for security (even if mock)
                    const { password, ...userWithoutPass } = foundUser;
                    setUser(userWithoutPass);
                    localStorage.setItem('balamya_user', JSON.stringify(userWithoutPass));
                    resolve(userWithoutPass);
                } else {
                    reject('Credenciales inválidas. Por favor verifique.');
                }
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('balamya_user');
    };

    const hasAccessToCategory = (category) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        if (user.specialty === 'all') return true;
        return user.specialty === category;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        hasAccessToCategory
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
