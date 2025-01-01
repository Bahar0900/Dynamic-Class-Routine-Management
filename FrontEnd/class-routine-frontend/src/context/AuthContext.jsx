import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await fetch('/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user');
                    }
                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    logout(); // Logout if token is invalid
                }
            };
            fetchUser();
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem('token', jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
