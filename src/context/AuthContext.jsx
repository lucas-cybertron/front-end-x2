import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';
import client from '../api/client';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('UseAuth pode ser usado apenas dentro do AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const normalizeUser = (u) => {
        if (!u) return null;
        return { ...u, type: (u.type || '').toString().toLowerCase() };
    };

    useEffect(() => {
        const init = async () => {
            const access = localStorage.getItem('access_token');
            const refresh = localStorage.getItem('refresh_token');
            if (access) {
                try {
                    // tenta obter dados do usuário a partir do backend
                    const res = await client.get('/auth/me');
                    const normalized = normalizeUser(res.data);
                    setUser(normalized);
                    localStorage.setItem('user', JSON.stringify(normalized));
                } catch (error) {
                    // se falhar, tenta refresh se houver

                    if (refresh) {
                        try {
                            const refreshed = await authApi.refresh(refresh);
                            localStorage.setItem('access_token', refreshed.access_token);
                            const me = await client.get('/auth/me');
                            const normalized = normalizeUser(me.data);
                            setUser(normalized);
                            localStorage.setItem('user', JSON.stringify(normalized));
                        } catch (error) {
                            // não foi possível restaurar sessão
                            console.log("Não foi possivel restaurar a sessão", error)
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            setUser(null);
                        }
                    } else {
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };
        init();
    }, []);

    const login = async (credentials) => {
        const data = await authApi.login(credentials);
        // data: { access_token, refresh_token, token_type, user }
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        const normalized = normalizeUser(data.user);
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
        return normalized;
    };

    const register = async (values) => {
        const data = await authApi.register(values);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        const normalized = normalizeUser(data.user);
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
        return normalized;
    };

    const logout = () => {
        authApi.logout();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};