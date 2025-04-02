import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";

export const Login = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(error => {
            console.error("Login failed:", error);
        });
    };

    return (
        <div className="login-container">
            <h2>Welcome to the App</h2>
            <button onClick={handleLogin}>
                Sign in with Microsoft
            </button>
        </div>
    );
}; 