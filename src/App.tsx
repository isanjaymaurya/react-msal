import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";
import { Login } from "./pages/Login";
import { Protected } from "./pages/Protected";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Handle redirect promise
msalInstance.handleRedirectPromise().catch(error => {
    console.error("Redirect error:", error);
});

// Default to using the first account if available
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        const result = event.payload as AuthenticationResult;
        msalInstance.setActiveAccount(result.account);
    }
});

function App() {
    return (
        <Router>
            <MsalProvider instance={msalInstance}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/protected" element={<Protected />} />
                    </Route>
                    <Route path="/" element={<Navigate to="/protected" replace />} />
                </Routes>
            </MsalProvider>
        </Router>
    );
}

export default App;
