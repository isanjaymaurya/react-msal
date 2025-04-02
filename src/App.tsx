import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";
import { Login } from "./pages/Login";
import { Protected } from "./pages/Protected";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeMsal = async () => {
            try {
                // Initialize MSAL
                await msalInstance.initialize();
                
                // Handle redirect promise
                await msalInstance.handleRedirectPromise();
                
                // Set active account if exists
                const accounts = msalInstance.getAllAccounts();
                if (accounts.length > 0) {
                    msalInstance.setActiveAccount(accounts[0]);
                }

                // Add event callback for login success
                msalInstance.addEventCallback((event) => {
                    if (event.eventType === EventType.LOGIN_SUCCESS) {
                        const result = event.payload as AuthenticationResult;
                        msalInstance.setActiveAccount(result.account);
                    }
                });

                setIsInitialized(true);
            } catch (error) {
                console.error("MSAL initialization failed:", error);
            }
        };

        initializeMsal();
    }, []);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <MsalProvider instance={msalInstance}>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/protected" element={<Protected />} />
                        </Route>
                        <Route path="/" element={<Navigate to="/protected" replace />} />
                    </Routes>
                </AuthProvider>
            </MsalProvider>
        </Router>
    );
}

export default App;
