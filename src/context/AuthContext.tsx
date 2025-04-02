import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { AccountInfo, AuthenticationResult, EventType } from '@azure/msal-browser';
import { loginRequest } from '../config/authConfig';

interface AuthContextType {
    isAuthenticated: boolean;
    account: AccountInfo | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState<AccountInfo | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Set active account if exists
                const currentAccounts = instance.getAllAccounts();
                if (currentAccounts.length > 0) {
                    setAccount(currentAccounts[0]);
                }

                // Add event callback for login success
                instance.addEventCallback((event) => {
                    if (event.eventType === EventType.LOGIN_SUCCESS) {
                        const result = event.payload as AuthenticationResult;
                        setAccount(result.account);
                    }
                });
            } catch (error) {
                console.error('Auth initialization failed:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [instance]);

    const login = async () => {
        try {
            await instance.loginRedirect(loginRequest);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await instance.logoutRedirect();
            setAccount(null);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                account,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}; 